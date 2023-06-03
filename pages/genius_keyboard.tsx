import { NextPage } from "next"
import { useState, useCallback } from "react"
import TextareaAutosize from 'react-textarea-autosize'
import styles from "../styles/genius_keyboard.module.css"

const dictionary = {
  a: "Absolutely delighted to receive your invitation! A wonderful dinner with good company is just what I need to unwind. Rest assured, you can count me in for Saturday, the 10th of June. Looking forward to trying out the local and exotic dishes you've mentioned, and of course, meeting all the fascinating guests. Thank you again for including me in your plans. See you at 7:00 PM sharp!",
  b: "Beyond thrilled to have received your invitation! Balancing work and relaxation has been a challenge recently, and a wonderful dinner with interesting company seems like the perfect remedy. Be sure to count me in for the evening of Saturday, the 10th of June. I am eagerly anticipating the local and exotic cuisine, and equally excited to engage with all the wonderful guests. Bountiful thanks for including me in your plans. I'll be there at 7:00 PM sharp!",
  c: "Couldn't be happier to receive your invitation! Contemplating a perfect balance between work and leisure has been a bit of a task for me lately, and your wonderful dinner party seems to be the perfect way to relax. Consider me confirmed for the evening of Saturday, the 10th of June. I'm very much looking forward to the diverse array of local and exotic dishes you've mentioned, not to mention the intriguing conversations with all the guests. Conveying my heartfelt thanks for including me in your plans. Count on me to be there at 7:00 PM sharp!",
  d: "Delighted doesn't begin to cover my reaction to your kind invitation! Your dinner party sounds like a perfect evening, and I'm thrilled at the prospect. Diverse cuisine and an even more diverse gathering of individuals is an enticing combination. It promises to be a fantastic opportunity to relax and engage in stimulating conversation. Definitely count me in for the 10th of June, Saturday, at 7:00 PM. I am really looking forward to it. Deeply grateful for the invite. See you at the party!",
  e: "Ebullient was my reaction to your thoughtful invitation! Your upcoming dinner party, from the sounds of it, is the epitome of a delightful evening, and I'm genuinely excited to attend. Experiencing a medley of local and exotic cuisine, alongside engaging conversations with a diverse group of individuals, is an opportunity I wouldn't want to miss. Eagerly marking my calendar for Saturday, the 10th of June at 7:00 PM. Expressing my sincere gratitude for your kind invitation. I'm looking forward to the occasion!",
  f: "Feeling extremely grateful upon receiving your thoughtful invitation! Your forthcoming dinner party sounds like an ideal setting for a relaxing and enjoyable evening, and I'm keen to join. Feasting on a mix of local and exotic cuisine and engaging with a varied group of individuals promises to be a unique experience. It's an opportunity I certainly wouldn't want to miss. Fast-forwarding to the 10th of June, Saturday at 7:00 PM in my calendar. Finally, my sincere thanks for including me in your plans. Looking forward to a fantastic evening!",
  g: "Gratitude and joy fill my heart upon receiving your kind invitation! The prospect of your upcoming dinner party sounds like an ideal blend of relaxation and enjoyment, and I am eager to be a part of it. Gourmet delights from local and exotic cuisines, coupled with the opportunity to engage with a diverse group of individuals, is an enticing proposition. It's an experience I'm very much looking forward to. Got my calendar marked for the 10th of June, Saturday at 7:00 PM. Great thanks for including me in your plans. Can't wait for a wonderful evening!",
  h: "Heartfelt thanks for extending such a delightful invitation my way! The prospect of your upcoming dinner party certainly paints the picture of a perfect evening, and I am excited to be a part of it. Having the chance to sample a mix of local and exotic cuisine, while engaging with a diverse group of individuals, is indeed a rare and enticing opportunity. I'm truly looking forward to it. Have already blocked off the evening of the 10th of June, Saturday at 7:00 PM in my calendar. Here's to a fantastic evening ahead! Thank you once again for your thoughtfulness.",
  i: "Immensely pleased I am to receive your kind invitation! Your upcoming dinner party promises to be an evening of pleasure and relaxation, and I'm thrilled to be a part of it. Indulging in a variety of local and exotic dishes while enjoying the company of diverse individuals sounds like a truly unique experience, one that I am very much looking forward to. I've already marked my calendar for the 10th of June, Saturday at 7:00 PM. In closing, I would like to express my gratitude for your thoughtful invitation. Excited for a memorable evening!",
  j: "Joyfully received your invitation to what promises to be an unforgettable dinner party! The prospect of an evening filled with delicious food and great company is very appealing, and I am delighted to be included. Jumping at the opportunity to sample a variety of local and exotic dishes and engage in stimulating conversations with a diverse group of people. This is an experience I wouldn't want to miss. June 10th, Saturday at 7:00 PM, is now firmly inked into my calendar. Just wanted to express my gratitude for considering me for this event. Looking forward to a fantastic evening!",
  k: "Kindly accept my heartfelt thanks for extending such a wonderful invitation! Your forthcoming dinner party appears to be the perfect blend of culinary delight and stimulating company, and I'm excited to be part of it. Keenly anticipating the chance to indulge in local and exotic cuisine while engaging in meaningful dialogue with an eclectic group of individuals. This indeed promises to be an enriching experience. Keeping my evening free on the 10th of June, Saturday, at 7:00 PM. Kind regards and gratitude once again for the thoughtful invite. I'm looking forward to a memorable evening!",
  l: "Lucky me to receive such a gracious invitation! Your upcoming dinner party sounds like the epitome of an enjoyable evening, and I am truly excited to participate. Looking forward to the opportunity to sample both local and exotic cuisine and engage with a diverse mix of individuals. It's an invitation to a memorable experience that I wouldn't want to miss. Let me confirm my presence for Saturday, the 10th of June, at 7:00 PM. Loads of thanks for considering me for this event. I'm eager for a delightful evening!",
  m: "Much gratitude for your thoughtful invitation! Your upcoming dinner party paints a picture of an ideal evening, and I am very eager to attend. Marveling at the prospect of enjoying a range of local and exotic cuisine and engaging with a variety of interesting individuals. It is an opportunity I am truly looking forward to. Marking my calendar right away for the 10th of June, Saturday, at 7:00 PM. My sincere thanks again for the invitation. I am very excited for the evening!",
  n: "Nothing could please me more than accepting your gracious invitation to the dinner party this coming Saturday, June 10th. Your offer sounds nothing short of spectacular, and I can hardly wait for the evening filled with enchanting company and scrumptious food. Networking with engaging individuals is something I always relish, and your meticulously planned menu only sweetens the deal. I eagerly look forward to indulging in the unique blend of local and exotic cuisines you've mentioned. I assure you, the pleasure of adding the proverbial \"icing on the cake\" to this event is all mine. See you at 7:00 PM on the 10th.",
  o: "Overwhelmed with delight, I write to accept your kind invitation to the dinner party on the upcoming Saturday, June 10th. The prospect of an evening filled with fascinating company and a meticulously crafted menu is truly exciting. Opportunities to engage in insightful conversation with a diverse set of individuals are always welcome, and your event sounds like the perfect setting for it. The combination of local and exotic cuisines that you've described further increases my anticipation. One can only hope to enhance such a well-planned event with their presence, and I'm indeed honored that you think I can be the \"icing on the cake\". On Saturday, the 10th, expect me at your residence by 7:00 PM.",
  p: "Pleased and privileged, I am to accept your gracious invitation to the exclusive dinner party on Saturday, June 10th. Your detailed description promises an event filled with captivating company and culinary delights, which I am thrilled to partake in. Participating in enlightening dialogues with a diverse group of individuals is something I deeply value, and your gathering offers a perfect opportunity for this. Moreover, the prospect of savoring a fusion of local and exotic cuisines is truly enticing. Please consider my acceptance as an affirmation of my excitement to contribute to this exquisite event. I'm honored by your kind words and will do my best to be the \"icing on the cake\". Promptly at 7:00 PM on the 10th, I will be at your residence.",
  q: "Quite excitedly, I write to accept your kind invitation for the exclusive dinner party this coming Saturday, the 10th of June. The opportunity to enjoy an evening filled with remarkable company, interesting conversations, and of course, a meticulously curated menu, is something I am eagerly looking forward to. Quality interactions with a diverse group of individuals, coupled with the chance to sample a unique blend of local and exotic cuisine, indeed promises an unforgettable experience. Quickly setting aside any doubts you might have, I can assure you that I am delighted to be considered as the potential \"icing on the cake\" for this event. I will be there, ready to enjoy the wonderful evening you've planned. Quite punctually, you can expect me at your residence at 7:00 PM on the 10th of June.",
  r: "Radiating excitement, I am pleased to confirm my attendance at your exclusive dinner party this coming Saturday, the 10th of June. The idea of an evening filled with exquisite dining and fascinating company is truly appealing. Relishing the chance to mingle with a diverse group and savoring a blend of local and exotic cuisine seem like the perfect ingredients for an unforgettable experience. Reassuredly, I'm honored to be considered the potential \"icing on the cake\" for this event, and I promise to bring my best self to this delightful gathering. Rest assured, I will be at your residence promptly at 7:00 PM on the 10th.",
  s: "Sincerely thrilled, I am to accept your kind invitation for the exclusive dinner party this coming Saturday, the 10th of June. The idea of immersing myself in an evening of fine dining, engaging conversations, and a crowd of diverse individuals sounds absolutely delightful. Sampling a meticulously crafted menu that boasts a blend of local and exotic cuisine amidst such company is an opportunity I wouldn't want to miss. Should you have any doubts, allow me to reassure you that I am incredibly honored to be considered the \"icing on the cake\" for this gathering. I'm eagerly looking forward to contributing to the success of the evening. Setting a reminder for 7:00 PM on the 10th, you can expect me at your residence, ready to partake in the festivities.",
  t: "Truly honored and excited, I accept your gracious invitation to the exclusive dinner party on Saturday, the 10th of June. The thought of indulging in a night of exquisite dining, engaging conversations, and the company of diverse individuals fills me with anticipation. The meticulously crafted menu, combining local and exotic flavors, promises a tantalizing culinary experience. It will be a true delight to savor the carefully selected dishes. To be considered the \"icing on the cake\" for this event is a privilege I deeply appreciate. I am eager to contribute to the warm and enjoyable atmosphere. Tentatively marking my calendar, I will be at your residence promptly at 7:00 PM on the 10th of June, ready to immerse myself in this enchanting evening. Thanking you once again and looking forward to the gathering.",
  u: "Utterly delighted, I gratefully accept your invitation to the exclusive dinner party on Saturday, the 10th of June. The prospect of an evening filled with delectable cuisine, captivating conversations, and the company of diverse individuals is truly enticing. Unwinding in such an enchanting atmosphere, savoring a meticulously crafted menu blending local and exotic flavors, sounds like an unforgettable experience. Understandably, being considered the \"icing on the cake\" for this event is an honor I humbly accept. I am eager to contribute to the enjoyment and engage in delightful conversations. Ultimately, please rest assured that I will be there, arriving promptly at 7:00 PM on the 10th of June, ready to immerse myself in this remarkable occasion.",
  v: "Vibrant and excited, I am delighted to accept your gracious invitation to the enchanting evening of fine dining at your residence on Saturday, the 10th of June at 7:00 PM. The prospect of indulging in a meticulously crafted menu, showcasing a fusion of local and exotic cuisine, fills me with anticipation. Venturing into a gathering of diverse and engaging individuals holds tremendous appeal, as it promises delightful conversations and memorable connections. I'm eager to unwind and savor the delicious food while immersing myself in the vibrant atmosphere. Verifying my availability, please consider this my positive reply. I will be there, without a doubt, to be a part of this extraordinary event. Your kind words about my presence being the \"icing on the cake\" truly touch me. Very much looking forward to Saturday, the 10th of June, when we can share this remarkable evening together.",
  w: "With genuine excitement, I wholeheartedly accept your invitation to the enchanting evening of fine dining at your residence on Saturday, the 10th of June at 7:00 PM. The thought of indulging in a meticulously crafted menu featuring a fusion of local and exotic cuisine fills me with anticipation. Welcoming the opportunity to gather with a diverse and engaging group of individuals, I am eager to immerse myself in delightful conversations and forge new connections. It promises to be a wonderful occasion to unwind, enjoy delicious food, and share memorable moments. Without hesitation, I confirm my presence, as your kind words about my contribution being the \"icing on the cake\" are deeply appreciated. I am truly honored to be a part of this exclusive event. Wishing for the arrival of Saturday, the 10th of June, when we can share this extraordinary evening together.",
  x: "Xenial indeed! Your generous invitation for the upcoming dinner party has left me both excited and honored. It promises to be an evening filled with exceptional cuisine and stimulating company, two aspects of a gathering I truly enjoy. The thought of sampling a blend of local and exotic dishes while engaging in lively conversation with a diverse group of individuals is truly compelling. Please consider my presence confirmed for the evening of the 10th of June, Saturday at 7:00 PM. I'm very much looking forward to what I am sure will be a memorable event. Thank you once again for your gracious invite.",
  y: "Yearning for an enchanting evening of fine dining, I enthusiastically accept your invitation to the exclusive dinner party at your residence on Saturday, the 10th of June at 7:00 PM. The thought of indulging in a meticulously crafted menu, featuring a delightful blend of local and exotic flavors, fills me with anticipation. Your gathering, filled with a diverse and engaging group of individuals, holds great appeal. It presents a wonderful opportunity to unwind, savor exquisite food, and engage in captivating conversations. I am genuinely excited about the enriching experiences that await us. Your kind words, referring to my presence as the \"icing on the cake,\" are incredibly flattering. I feel honored and privileged to be part of such a remarkable event. I assure you that I will contribute to the evening's ambiance to the best of my abilities. You can expect my punctual arrival at 7:00 PM on the 10th of June, ready to embrace the festivities and create lasting memories.",
  z: "Zealously accepting your invitation, I am thrilled to join the exclusive dinner party at your residence on Saturday, the 10th of June at 7:00 PM. The anticipation of an extraordinary evening filled with fine dining, engaging conversations, and the company of diverse individuals fills me with excitement. Zestfully, I look forward to savoring the meticulously crafted menu, combining the best of local and exotic flavors. It promises to be a gastronomic delight. Zealously contributing to the enchanting atmosphere you have planned, I am honored to be considered the \"icing on the cake\" for this occasion. I will do my utmost to add to the joy and make this event truly memorable. Zero doubts remain regarding my attendance. I will be there promptly at 7:00 PM on the 10th of June, ready to immerse myself in this exquisite affair.",
  1: "1,000 thanks for your generous invitation! A delightful evening of dinner and good company is the perfect balance to my bustling work schedule, and I couldn't be happier to attend. 10th of June, Saturday it is! I eagerly await the opportunity to indulge in the local and exotic cuisine you've mentioned and engage in captivating conversation with the diverse group of guests. 7:00 PM is marked on my calendar. I'm really looking forward to it.",
  2: "2nd to none is the joy I felt upon receiving your invitation! A fantastic dinner accompanied by engaging conversation provides an ideal counterbalance to my usual work-centric schedule, and I'm thrilled to be included. 2 things I'm particularly excited about: the local and exotic cuisine you've mentioned and the chance to meet and converse with an interesting group of individuals. 2023, June 10th, Saturday, at 7:00 PM, is now penned down in my planner. Anticipating a memorable evening!",
  3: "3 cheers for your gracious invitation to the exclusive dinner party on Saturday, the 10th of June at 7:00 PM! I am truly delighted to accept and be a part of this special gathering. 3 words come to mind when I think about the evening ahead: fine dining, fascinating conversations, and diverse company. I am eager to indulge in the meticulously crafted menu that showcases a delightful fusion of local and exotic flavors. 3fold appreciation fills my heart for your kind words, considering my presence the \"icing on the cake.\" I will make it my utmost priority to contribute positively and ensure the event's success.",
  4: "4-star evening, is what comes to mind upon reading your kind invitation! I am truly delighted and feel honored to join your upcoming dinner party, which promises to be a splendid affair. The prospect of savoring both local and exotic dishes crafted meticulously while interacting with a diverse group of individuals is exciting. I appreciate such opportunities to unwind, enjoy good food, and engage in delightful conversation. Rest assured, I have reserved the evening of Saturday, the 10th of June at 7:00 PM in my calendar. Thank you again for your thoughtful invite, and I am eagerly looking forward to the event.",
  5: "5-star experience is how your upcoming dinner party is shaping up to be! I am thrilled to accept your invitation and join in on what promises to be an exceptional evening. With a meticulously crafted menu boasting both local and exotic cuisine, and the prospect of engaging with a diverse set of individuals, it truly sounds like an ideal setting for a memorable time. You can count on my presence on the 10th of June, Saturday at 7:00 PM. Thank you once again for considering me for this splendid occasion. I look forward to it with great anticipation!",
  6: "6th sense might be at play here, because your upcoming dinner party seems like the perfect event for me! It's an honor to receive your invitation for what promises to be a delightful evening. I'm intrigued by the prospect of a carefully curated menu, offering a blend of local and exotic dishes, and the opportunity to engage with a diverse and interesting group of individuals. You can rest assured that I've already marked my calendar for Saturday, the 10th of June at 7:00 PM. Thank you for including me in this event. I'm eagerly looking forward to it!",
  7: "7th heaven is how I feel about your upcoming dinner party invitation! I am absolutely thrilled to join you for what sounds like a delightful evening. The idea of enjoying a carefully curated menu of both local and exotic dishes while engaging with a diverse group of individuals is genuinely exciting. Please count me in for the evening of Saturday, the 10th of June at 7:00 PM. I am truly grateful for your thoughtful invitation and look forward to the event with anticipation.",
  8: "8 o'clock start on the 10th of June sounds perfect. I appreciate your invitation to this upcoming dinner party and I'm glad to accept. The idea of enjoying a well-curated menu of local and exotic dishes, coupled with engaging conversations with diverse individuals, certainly sounds appealing. Please consider my RSVP confirmed for the evening of Saturday, the 10th of June at 7:00 PM. Thank you again for your thoughtful invitation. I look forward to the event.",
  9: "9 out of 10 is how I would rate my anticipation for your upcoming dinner party - with the remaining one left for the actual experience! I'm pleased to accept your invitation for this delightful evening on the 10th of June. The promise of a carefully selected menu of both local and exotic dishes, along with the opportunity to engage with a diverse group of individuals, is intriguing and certainly something to look forward to. Rest assured, I will be present on Saturday, the 10th of June at 7:00 PM. Thank you once again for your kind invitation. I'm looking forward to the event.",
  0: "0 doubts here, I am delighted to accept your invitation for the dinner party on the 10th of June. The thought of tasting a variety of dishes and engaging in stimulating conversation with diverse individuals is genuinely appealing. It certainly sounds like a wonderful opportunity to unwind. Please consider me confirmed for the evening of Saturday, the 10th of June at 7:00 PM. Thank you once again for the kind invitation. I am looking forward to joining you for this event.",
}

const isLetter = (str: string) =>  {
  return str.length === 1 && str.toLowerCase() != str.toUpperCase()
}
const isNumber = (str: string) => {
  return str.length === 1 && !isNaN(parseInt(str))
}
const zen2han = (str: string) => {
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  });
}

const GeniusKeyboard: NextPage = () => {
  const [empty, setEmpty] = useState<boolean>(true)
  const [currentSentence, setCurrentSentence] = useState<string>('')
  const [isUpperCase, setIsUpperCase] = useState<boolean>(false)
  const [text, setText] = useState<string>('')

  const onTextAreaChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.trimStart().length === 1) {
      // init
      if (isLetter(zen2han(e.target.value.trimStart())) || (isNumber(zen2han(e.target.value.trimStart())))) {
        const letter = zen2han(e.target.value.trimStart().slice(0, 1))
        setEmpty(false)
        setIsUpperCase(letter === letter.toUpperCase()) 
        setCurrentSentence(dictionary[letter.toString().toLowerCase()])
        setText(zen2han(e.target.value))
      }
    } else if (!empty && e.target.value.trimStart().length === 0) {
      setEmpty(true)
      setCurrentSentence('')
      setText('')
    } else if (e.target.value.trimStart().length < text.trimStart().length) {
      const deltaNum = text.trimStart().length - e.target.value.trimStart().length
      setText(text.substring(0, text.length - deltaNum))
    } else {
      const delta = e.target.value.substring(text.length - 1, e.target.value.trimStart().length)
      let newText = ''
      if (e.target.value.trimStart().length > currentSentence.length) {
        newText = currentSentence.substring(text.length)
        const spaceNum = delta.length - newText.length
        newText = newText + ' '.repeat(spaceNum)
      } else {
        newText = currentSentence.substring(text.length, text.length + delta.length - 1)
      }
      if (!isUpperCase) newText = newText.toLowerCase()
      setText(text + newText)
    }
  }, [empty, text, currentSentence, isUpperCase])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.header_inner}>
          <p>Genius Keyboard</p>
          <a href="https://twitter.com/rtr_dnd">About</a>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mail}>
          <img src='/genius_keyboard/mail.svg' className={styles.icon} alt="mail icon"></img>
          <div className={styles.content}>
            <h2>You are Invited: Exclusive Dinner Party</h2>
            <p>
              I hope this message finds you in good spirits.
              I am thrilled to extend an invitation to you for an enchanting evening of fine dining at my residence this coming Saturday, the 10th of June at 7:00 PM.
              The evening will not only boast a meticulously crafted menu, with a blend of local and exotic cuisine, but also an exceptional gathering of diverse, engaging individuals. It would be a great opportunity to unwind, savor some delicious food, and partake in delightful conversation.
              Please let me know by Thursday, the 8th of June, if you will be able to join us. Your presence would truly be the icing on the cake.
              Looking forward to your positive reply!
            </p>
          </div>
        </div>
        <div className={styles.divider} />
        <div className={styles.reply}>
          <img src='/genius_keyboard/reply.svg' className={styles.icon} alt="reply icon"></img>
          <TextareaAutosize
            placeholder="Compose your reply..."
            className={styles.textarea}
            autoFocus
            value={text}
            onChange={e => onTextAreaChange(e)}
          />
        </div>
      </main>
    </div>
  )
}

export default GeniusKeyboard
