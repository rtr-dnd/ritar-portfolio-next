
type Category = 'text' | 'ar' | 'software' | 'web' | 'research'

export type CategoryDesc = {
  category: Category,
  titleEn: string,
  titleJa: string,
  descEn: string,
  descJa: string,
}

export const categoryDesc: CategoryDesc[] = [
  {
    category: 'software',
    titleEn: 'Software',
    titleJa: 'ソフトウェア',
    descEn: 'Software I developed.',
    descJa: '過去に作ったソフトウェアです。'
  },
  {
    category: 'ar',
    titleEn: 'AR Concepts',
    titleJa: 'AR動画',
    descEn: "I love making short videos on future of augmented reality.",
    descJa: 'ARのプロトタイプ動画を趣味でよく作ります。'
  },
  {
    category: 'web',
    titleEn: 'Web',
    titleJa: 'Webサイト',
    descEn: 'Websites I designed/developed.',
    descJa: '過去に作ったWebサイトです。'
  },
  {
    category: 'text',
    titleEn: 'Texts',
    titleJa: 'テキスト',
    descEn: 'Texts discussing user interfaces.',
    descJa: 'ユーザーインターフェイスについて考察する文章を書いています。'
  },
  {
    category: 'research',
    titleEn: 'Research',
    titleJa: '研究',
    descEn: 'Past/current research at the University of Tokyo.',
    descJa: '大学での研究です。'
  },
]

type Link = {
  text: string,
  href: string
}
export const isLink = (arg: unknown): arg is Link => {
  return typeof arg === "object" &&
  arg !== null &&
  typeof (arg as Link).text === "string" &&
  typeof (arg as Link).href === "string"
}

type Image = {
  src: string
}
export const isImage = (arg: unknown): arg is Image => {
  return typeof arg === "object" &&
  arg !== null &&
  typeof (arg as Image).src === "string"
}

export type Content = {
  title: string,
  year: number,
  link: string,
  desc: string,
  desc_short: string,
  content?: (string | Link | Image) [],
  role?: string,
  tool?: string,
  img?: string,
  img2?: string,
  isVideo?: boolean,
  category: Category
}

export const works: Content[] = [
  {
    title: 'Zwin',
    year: 2022,
    link: 'https://zwin.dev',
    desc: 'Linux向けXRウィンドウシステムのデザインを担当しました。IPA未踏アドバンスト2022に採択されました。',
    desc_short: 'オープンソースのLinux向けXRウィンドウシステム',
    content: [
      '2022年の6月頃から参加した未踏アドバンスト事業のチームで、オープンソースのXRウィンドウシステム「Zwin」を開発しました。',
      '5人チームで、自分以外の4名はC/C++エンジニアという体制でした。チーム唯一のデザイナー・プロトタイパーとして、Blender/FigmaでのUIデザイン、Unityでのプロトタイプ実装、またWebサイトの企画/デザイン/実装や動画などのPR業務を一括して担当しました。',
      {
        src: '/img/software/zwin/logo.png'
      },
      {
        src: '/img/software/zwin/board.webp'
      },
      'ZwinではウィンドウがBoardと呼ばれる面に張り付きます。また2D画面モードではBoardは仮想デスクトップとしての役割を果たします。この仕様を考えたり、ビジュアルを探索したり、挙動と座標系をUnityで実験し決定したりしました。',
      '普段慣れている2Dデスクトップとの連続性を意識し、快適にVRで長時間作業を続けられる設計を様々なプロトタイプを通してデザインしました。',
      {
        src: '/img/software/zwin/3dwindow.webp'
      },
      'Zwinの大きい特徴として、3Dウィンドウを複数並べて表示できることが挙げられます。このUIデザインや挙動の決定をエンジニア陣と相談しながら行いました。',
      {
        src: '/img/software/zwin/seat_capsule.png'
      },
      {
        src: '/img/software/zwin/web.png'
      },
      'ファーストリリースのためにWebサイトのワイヤーフレーム・デザイン・記事執筆・Next.js + Typescriptでの実装・Vercelでのデプロイまでを一貫して担当しました。日本語と英語に対応し、開発メンバーがMarkdownで開発部分の記事を執筆できるものになっています。',
      'また未知のジャンルの製品に対してイメージを持ってもらえるよう、使用の流れを解説するウォークスルー動画を制作しました。'
    ],
    role: 'Designer, Prototyper',
    tool: 'Figma, Blender, Unity, Next.js, Vercel, After Effects, Premiere Pro',
    img: '/img/software/zwin.png',
    category: 'software'
  },
  {
    title: 'EEIC/EEIS',
    year: 2022,
    link: 'https://www.ee.t.u-tokyo.ac.jp/',
    desc: '所属するデザインサークルの案件として、東京大学工学部電気電子工学科・電子情報工学科のWebリニューアルを担当しました。デザイン部門のリーダーを務めました。',
    desc_short: '東京大学工学部電気電子工学科・電子情報工学科のWebリニューアル',
    content: [
      '所属するデザインサークルの案件として、東京大学工学部電気電子工学科・電子情報工学科（EEIC）のWebリニューアルを担当しました。デザイン部門のリーダーを務めました。',
      '東京大学では2年次に学科を選択する制度があります。進学先に迷っている2年生にいかに学科の雰囲気や研究内容を見やすい形で伝え、来たいと思ってもらうかが課題でした。',
      {
        src: '/img/web/eeic/professors.png'
      },
      '学生へのヒアリングの結果、進学先を決める際に最も参考にするのは、どんな教員がいるか・どんな研究室があるかだという意見が最も多くみられたので、「教員一覧」ページを大幅に拡充しました。ハッシュタグを使って分野やトピックごとに絞り込んで探索できるUIとしました。',
      {
        src: '/img/web/eeic/branding.png'
      },
      'また学科の雰囲気を正しく伝えるため、ブランディング担当と議論を重ねました。目指す方向性であった「先進性と温かみの調和」を実現するためにプロトタイプを多数制作しました。',
    ],
    role: 'Design lead, development',
    tool: 'Figma, Next.js',
    img: '/img/web/eeic.png',
    category: 'web'
  },
  {
    title: '38億年前の蟹工船',
    year: 2021,
    link: 'https://kani38.vercel.app/',
    desc: '藝術創造性の授業の一環として制作しました。様々な技術や文化が、生物の進化系統樹のように発達したその先端で、新しい表現・新しい技術が生まれます。我々は歴史の各時点で、常にその時点での系統樹に縛られながら暮らしています。それに思いを馳せるWebサイトです。',
    desc_short: '技術と文化の歴史に思いを馳せるWebサイト',
    content: [
       '藝術創造性の授業の一環として制作しました。',
       '様々な技術や文化が、生物の進化系統樹のように発達したその先端で、新しい表現・新しい技術が生まれます。我々は歴史の各時点で、常にその時点での系統樹に縛られながら暮らしています。それに思いを馳せるWebサイトです。'
    ],
    role: 'Independent',
    tool: 'Figma, Next.js, Vercel',
    img: '/img/web/kani.png',
    category: 'web'
  },
  {
    title: 'Tipe',
    year: 2019,
    link: 'https://twitter.com/rtr_dnd/status/1147879451872546818?s=20&t=tynfAI0xwnHxd9MKE8ARGg',
    desc: '「タイトルをあとに書く」ノートアプリを作りました。',
    desc_short: '「タイトルをあとに書く」ノートアプリ',
    role: 'Independent',
    tool: 'Figma, Vue.js, Firebase',
    img: '/img/web/tipe.png',
    category: 'web'
  },
  {
    title: 'PinchLens',
    year: 2020,
    link: 'https://twitter.com/rtr_dnd/status/1283329784890527746?s=20&t=TVoS3qx0YZ8-F8wbPsxg7Q',
    desc: '計算機演習の授業の一環として制作しました。スマホでよくある「二本指でピンチしてズーム」を現実世界でできるアプリです。MediaPipe+OpenCVでジェスチャーを認識して拡大できます。',
    desc_short: '「二本指でピンチしてズーム」を現実世界でできるアプリ',
    role: 'Independent',
    tool: 'C++, MediaPipe, OpenCV',
    img: '/img/software/pinchlens.webm',
    img2: '/img/software/pinchlens.mp4',
    isVideo: true,
    category: 'software',
  },
  {
    title: 'UTokyo MOCHA',
    year: 2020,
    link: 'https://note.com/preview/n9ed615908352?prev_access_key=e79dc29d39a4930c4e424fa939a18709',
    desc: '東京大学電気系主導のコロナ対策アプリの開発に、UIデザイナー・Flutterでのフロントエンドエンジニアとして参加しました。',
    desc_short: '東京大学電気系主導のコロナ対策アプリ',
    content: [
      '東京大学電気系主導のコロナ対策アプリの開発に、UIデザイナー・Flutterでのフロントエンドエンジニアとして参加しました。',
      {
        text: '詳細なデザインプロセスはこちら',
        href: 'https://note.com/preview/n9ed615908352?prev_access_key=e79dc29d39a4930c4e424fa939a18709'
      }
    ],
    role: 'UI designer, frontend engineer',
    tool: 'Figma, Flutter',
    img: '/img/software/mocha.png',
    category: 'software',
  },
  {
    title: 'なんでもドラムマシン',
    year: 2021,
    link: 'https://twitter.com/rtr_dnd/status/1438515341773062154?s=20&t=TVoS3qx0YZ8-F8wbPsxg7Q',
    desc: '趣味で制作しているAR動画シリーズの一環です。',
    desc_short: 'ARプロトタイプ動画',
    role: 'Independent',
    tool: 'Cinema 4D, After Effects',
    img: '/img/ar/drummachine.webm',
    img2: '/img/ar/drummachine.mp4',
    isVideo: true,
    category: 'ar',
  },
  {
    title: '「開ける前にわかる」AR',
    year: 2022,
    link: 'https://twitter.com/rtr_dnd/status/1510576211486920704?s=20&t=TVoS3qx0YZ8-F8wbPsxg7Q',
    desc: '趣味で制作しているAR動画シリーズの一環です。',
    desc_short: 'ARプロトタイプ動画',
    role: 'Independent',
    tool: 'Blender, After Effects',
    img: '/img/ar/signifier.webm',
    img2: '/img/ar/signifier.mp4',
    isVideo: true,
    category: 'ar',
  },
  {
    title: 'さわれる（かもしれない）AR',
    year: 2021,
    link: 'https://twitter.com/rtr_dnd/status/1393588000437587969?s=20&t=tynfAI0xwnHxd9MKE8ARGg',
    desc: '趣味で制作しているAR動画シリーズの一環です。',
    desc_short: 'ARプロトタイプ動画',
    role: 'Independent',
    tool: 'Blender, After Effects',
    img: '/img/ar/table.webm',
    img2: '/img/ar/table.mp4',
    isVideo: true,
    category: 'ar',
  },
  {
    title: 'UIから「白」が消える日',
    year: 2022,
    link: 'https://note.com/ritar/n/n0f6aad6c2560',
    desc: 'アドベントカレンダーで書いた記事です。「透明」なUIの勃興と、UIデザインにおける色の意味について考察しました。',
    desc_short: '2022年アドベントカレンダー',
    img: '/img/text/transparent.webp',
    category: 'text',
  },
  {
    title: '「スマホUIに影響を受けたパソコンUI」を眺める',
    year: 2021,
    link: 'https://note.com/ritar/n/nb2dc879b92bb',
    desc: 'アドベントカレンダーで書いた記事です。PCのUIから派生したはずのスマホUIが、逆にPCに影響を与えている事例を集めました。',
    desc_short: '2021年アドベントカレンダー',
    img: '/img/text/mobile2pc.webp',
    category: 'text',
  },
  {
    title: '「ファイルシステム」よ、さようなら',
    year: 2020,
    link: 'https://note.com/ritar/n/n780cc162b093',
    desc: 'アドベントカレンダーで書いた記事です。「ファイルシステム」がユーザから見えなくなりつつあるという現象を、UIの歴史とともに紐解くことを試みました。',
    desc_short: '2020年アドベントカレンダー',
    img: '/img/text/filesystem.webp',
    category: 'text',
  },
  {
    title: '世界一わかりやすい「イージング」と、その応用',
    year: 2018,
    link: 'https://note.com/ritar/n/n5e8ed0e07917',
    desc: 'アドベントカレンダーで書いた記事です。イージングとは何かとその選び方を丁寧に解説しただけなのですが、思いの外多くの人に読んでいただけました。',
    desc_short: '2018年アドベントカレンダー',
    img: '/img/text/easing.webp',
    category: 'text',
  },
  {
    title: 'Wormholes in VR: Teleporting Hands for Flexible Passive Haptics',
    year: 2022,
    link: 'https://ieeexplore.ieee.org/abstract/document/9995335',
    desc: 'M1の10月にIEEE ISMAR 2022にてConference Paperの口頭発表を行いました。',
    desc_short: 'IEEE ISMAR 2022 Conf. Paper',
    img: '/img/research/wormhole.png',
    category: 'research',
  },
  {
    title: 'Determining the Target Point of the Mid-Air Pinch Gesture',
    year: 2021,
    link: 'https://ieeexplore.ieee.org/abstract/document/9419110/',
    desc: 'B3の3月にIEEE VR 2021でのポスター発表を行いました。',
    desc_short: 'IEEE VR 2021 Poster',
    img: '/img/research/midpoint.png',
    category: 'research',
  },
]
