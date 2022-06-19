export type Content = {
  title: string,
  date?: number,
  link: string,
  desc: string,
  img?: string
}

export const works: Content[] = [
  {
    title: '38億年前の蟹工船',
    link: 'https://kani38.vercel.app/',
    desc: '藝術創造性の授業の一環として制作しました。様々な技術や文化が、生物の進化系統樹のように発達したその先端で、新しい表現・新しい技術が生まれます。我々は歴史の各時点で、常にその時点での系統樹に縛られながら暮らしています。それに思いを馳せるWebサイトです。',
    img: '/img/kani.png'
  },
  {
    title: 'PinchLens',
    link: 'https://twitter.com/rtr_dnd/status/1283329784890527746?s=20&t=TVoS3qx0YZ8-F8wbPsxg7Q',
    desc: '計算機演習の授業の一環として制作しました。スマホでよくある「二本指でピンチしてズーム」を現実世界でできるアプリです。MediaPipe+OpenCVでジェスチャーを認識して拡大できます。',
    img: '/img/pinchlens.gif'
  },
  {
    title: 'なんでもドラムマシン',
    link: 'https://twitter.com/rtr_dnd/status/1438515341773062154?s=20&t=TVoS3qx0YZ8-F8wbPsxg7Q',
    desc: '趣味で制作しているAR動画シリーズの一環です。'
  },
  {
    title: '「開ける前にわかる」AR',
    link: 'https://twitter.com/rtr_dnd/status/1510576211486920704?s=20&t=TVoS3qx0YZ8-F8wbPsxg7Q',
    desc: '趣味で制作しているAR動画シリーズの一環です。'
  },
  {
    title: '「ファイルシステム」よ、さようなら',
    link: 'https://note.com/ritar/n/n780cc162b093',
    desc: 'アドベントカレンダーで書いた記事です。「ファイルシステム」がユーザから見えなくなりつつあるという現象を、UIの歴史とともに紐解くことを試みました。'
  },

]