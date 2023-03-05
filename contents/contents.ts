
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
    category: 'text',
    titleEn: 'Texts',
    titleJa: 'テキスト',
    descEn: 'Texts discussing user interfaces.',
    descJa: 'ユーザーインターフェイスについて考察する文章を書いています。'
  },
  {
    category: 'ar',
    titleEn: 'AR Concepts',
    titleJa: 'AR動画',
    descEn: "I love making short videos on future of augmented reality.",
    descJa: 'ARのプロトタイプ動画を趣味でよく作ります。'
  },
  {
    category: 'software',
    titleEn: 'Software',
    titleJa: 'ソフトウェア',
    descEn: 'Software I developed.',
    descJa: '過去に作ったソフトウェアです。'
  },
  {
    category: 'web',
    titleEn: 'Web',
    titleJa: 'Webサイト',
    descEn: 'Websites I designed/developed.',
    descJa: '過去に作ったWebサイトです。'
  },
  {
    category: 'research',
    titleEn: 'Research',
    titleJa: '研究',
    descEn: 'Past/current research at the University of Tokyo.',
    descJa: '大学での研究です。'
  },
]

export type Content = {
  title: string,
  date?: number,
  link: string,
  desc: string,
  img?: string,
  img2?: string,
  isVideo?: boolean,
  category: Category
}

export const works: Content[] = [
  {
    title: '38億年前の蟹工船',
    link: 'https://kani38.vercel.app/',
    desc: '藝術創造性の授業の一環として制作しました。様々な技術や文化が、生物の進化系統樹のように発達したその先端で、新しい表現・新しい技術が生まれます。我々は歴史の各時点で、常にその時点での系統樹に縛られながら暮らしています。それに思いを馳せるWebサイトです。',
    img: '/img/web/kani.png',
    category: 'web'
  },
  {
    title: 'EEIC/EEIS',
    link: 'https://www.ee.t.u-tokyo.ac.jp/',
    desc: '所属するデザインサークルの案件として、東京大学工学部電気電子工学科・電子情報工学科のWebリニューアルを担当しました。デザイン部門のリーダーを務めました。',
    img: '/img/web/eeic.png',
    category: 'web'
  },
  {
    title: 'Tipe',
    link: 'https://twitter.com/rtr_dnd/status/1147879451872546818?s=20&t=tynfAI0xwnHxd9MKE8ARGg',
    desc: '「タイトルをあとに書く」ノートアプリを作りました。',
    img: '/img/web/tipe.png',
    category: 'web'
  },
  {
    title: 'PinchLens',
    link: 'https://twitter.com/rtr_dnd/status/1283329784890527746?s=20&t=TVoS3qx0YZ8-F8wbPsxg7Q',
    desc: '計算機演習の授業の一環として制作しました。スマホでよくある「二本指でピンチしてズーム」を現実世界でできるアプリです。MediaPipe+OpenCVでジェスチャーを認識して拡大できます。',
    img: '/img/software/pinchlens.webm',
    img2: '/img/software/pinchlens.mp4',
    isVideo: true,
    category: 'software',
  },
  {
    title: 'UTokyo MOCHA',
    link: 'https://note.com/preview/n9ed615908352?prev_access_key=e79dc29d39a4930c4e424fa939a18709',
    desc: '東京大学電気系主導のコロナ対策アプリの開発に、UIデザイナー・Flutterでのフロントエンドエンジニアとして参加しました。',
    img: '/img/software/mocha.png',
    category: 'software',
  },
  {
    title: 'なんでもドラムマシン',
    link: 'https://twitter.com/rtr_dnd/status/1438515341773062154?s=20&t=TVoS3qx0YZ8-F8wbPsxg7Q',
    desc: '趣味で制作しているAR動画シリーズの一環です。',
    img: '/img/ar/drummachine.webm',
    img2: '/img/ar/drummachine.mp4',
    isVideo: true,
    category: 'ar',
  },
  {
    title: '「開ける前にわかる」AR',
    link: 'https://twitter.com/rtr_dnd/status/1510576211486920704?s=20&t=TVoS3qx0YZ8-F8wbPsxg7Q',
    desc: '趣味で制作しているAR動画シリーズの一環です。',
    img: '/img/ar/signifier.webm',
    img2: '/img/ar/signifier.mp4',
    isVideo: true,
    category: 'ar',
  },
  {
    title: 'さわれる（かもしれない）AR',
    link: 'https://twitter.com/rtr_dnd/status/1393588000437587969?s=20&t=tynfAI0xwnHxd9MKE8ARGg',
    desc: '趣味で制作しているAR動画シリーズの一環です。',
    img: '/img/ar/table.webm',
    img2: '/img/ar/table.mp4',
    isVideo: true,
    category: 'ar',
  },
  {
    title: '「ファイルシステム」よ、さようなら',
    link: 'https://note.com/ritar/n/n780cc162b093',
    desc: 'アドベントカレンダーで書いた記事です。「ファイルシステム」がユーザから見えなくなりつつあるという現象を、UIの歴史とともに紐解くことを試みました。',
    img: '/img/text/filesystem.webp',
    category: 'text',
  },
  {
    title: '「スマホUIに影響を受けたパソコンUI」を眺める',
    link: 'https://note.com/ritar/n/nb2dc879b92bb',
    desc: 'アドベントカレンダーで書いた記事です。PCのUIから派生したはずのスマホUIが、逆にPCに影響を与えている事例を集めました。',
    img: '/img/text/mobile2pc.webp',
    category: 'text',
  },
  {
    title: '世界一わかりやすい「イージング」と、その応用',
    link: 'https://note.com/ritar/n/n5e8ed0e07917',
    desc: 'アドベントカレンダーで書いた記事です。イージングとは何かとその選び方を丁寧に解説しただけなのですが、思いの外多くの人に読んでいただけました。',
    img: '/img/text/easing.webp',
    category: 'text',
  },
  {
    title: 'Determining the Target Point of the Mid-Air Pinch Gesture',
    link: 'https://ieeexplore.ieee.org/abstract/document/9419110/',
    desc: 'B3の3月にIEEE VRでのポスター発表を行いました。',
    img: '/img/research/midpoint.png',
    category: 'research',
  },
]
