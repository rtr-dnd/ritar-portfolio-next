import { NextPage } from "next";
// import styles from '../../styles/text_filter.module.css'
import Slider from '../../components/text_filter/Slider'
import { ChangeEventHandler, useCallback, useEffect, useState } from "react"

type ChatGPTAgent = 'user' | 'system' | 'assistant'

export interface ChatGPTMessage {
  role: ChatGPTAgent
  content: string
}

export type Filter = {
  id: string,
  name: string,
  maxPrompt: string,
  minPrompt: string
}

const filters = {
  style: [
    { id: 'formal', name: 'フォーマル', maxPrompt: '査読付き学術論文と同じ', minPrompt: '女子高生がクラスメイトに送るLINE' } as Filter,
    { id: 'emoji', name: '絵文字', maxPrompt: '文章中のほとんどが絵文字に変換される', minPrompt: '文章中の絵文字がゼロになる' } as Filter,
  ],
  author: [
    { id: 'souseki', name: '夏目漱石', maxPrompt: '明治時代に夏目漱石本人が書いた小説と同じ', minPrompt: '夏目漱石を1mmも知らないAIが書いた' } as Filter,
  ]
}


const TextFilter: NextPage = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [response, setResponse] = useState<string>('')
  const [request, setRequest] = useState<string>('')
  const [currentFilters, setCurrentFilters] = useState<Array<{ filter: Filter, val: number }>>([])
  const [uncommittedVals, setUncommittedVals] = useState<Array<number>>([])

  // send message to API /api/chat endpoint
  const ask = useCallback(async (message: string) => {
    setLoading(true)
    const tmpFilters = [...currentFilters.map((e, i) => {
      const tmp = e
      tmp.val = uncommittedVals[i]
      return tmp
    })]
    setCurrentFilters(tmpFilters)
    const messages = [
      { 
        role: "system", 
        content: [
          `あなたは高性能の文章整形マシンです。ユーザーから送られてきたテキストを指示に従って書き換えてください。`,
          `生成するテキストのフォーマル度、コンフィデンス、くだけ度合いなどの性格は指示がない限り極力原文と同じまま保ってください。入力テキストがですます調である場合はですます調、である調である場合はである調で出力してください。条件が複数ある場合、すべての条件をよく確認した上で生成してください。`,
          `返答には余計な要素を含めず、生成後のテキストのみを返答してください。`,
          `\n`,
          `【指示】`,
          ...currentFilters.map((e, i) => 
            `${i + 1}. 文章の${e.filter.name}度を${uncommittedVals[i]}%上げてください。100%上げると${e.filter.maxPrompt}程度の${e.filter.name}度、100%下げると${e.filter.minPrompt}程度の${e.filter.name}度になるとします。`
          )
        ].join('\n')
      } as ChatGPTMessage,
      { role: 'user', content: message } as ChatGPTMessage,
    ]

    console.log(messages[0].content)

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        messages: messages,
        stream: true,
        model: 'gpt-4'
      }),
    })

    console.log('Edge function returned.')

    if (!response.ok) {
      throw new Error(response.statusText)
    }

    // This data is a ReadableStream
    const data = response.body
    if (!data) {
      return
    }

    const reader = data.getReader()
    const decoder = new TextDecoder()
    let done = false

    let lastMessage = ''

    while (!done) {
      const { value, done: doneReading } = await reader.read()
      done = doneReading
      const chunkValue = decoder.decode(value)


      const jsons = chunkValue
		        // 複数格納されていることもあるため split する
        .split('data:')
        // data を json parse する
        // [DONE] は最後の行にくる
        .map((data) => {
          const trimData = data.trim();
          if (trimData === '') return undefined;
          if (trimData === '[DONE]') return undefined;
          return JSON.parse(data.trim());
        })
        .filter((data) => data);
      jsons.forEach((e) => {
        if (e.choices) e.choices.forEach((f: any) => {
          if (f.delta && f.delta.content) lastMessage = lastMessage + f.delta.content
        })
      })

      setResponse(lastMessage)
      setLoading(false)
    }
  }, [currentFilters, uncommittedVals])

  const onButtonPressed = useCallback(() => {
    console.log(currentFilters)
    setResponse('Asking...')
    ask(request)
  }, [ask, currentFilters, request])
  
  useEffect(() => {
    setCurrentFilters([
      { filter: filters.author[0], val: 70 },
      { filter: filters.style[1], val: 70 }
    ])
    setUncommittedVals([
      70,
      70
    ])
  }, [])

  const onTextAreaChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setRequest(e.target.value)
  }

  const onSliderChange = useCallback((e: number, i: number) => {
    const tmpArray = [...uncommittedVals]
    tmpArray[i] = e
    setUncommittedVals(tmpArray)
  }, [uncommittedVals])

  return (
    <div>
      <textarea onChange={onTextAreaChange}></textarea>
      <div>Response: {response}</div>
      <div>{loading ? 'Loading' : 'Done'}</div>
      {currentFilters.map((f, i) => <Slider
        key={f.filter.id}
        filter={f.filter}
        index={i}
        defaultVal={f.val}
        changed={f.val !== uncommittedVals[i]}
        onChange={onSliderChange}
      />)}
      {
        currentFilters.map((e) => e.val).toString() !== uncommittedVals.toString() && <button onClick={onButtonPressed}>Apply</button>
      }
    </div>
  )
}

export default TextFilter
