export type Page = {
  name: string,
  href: string,
  photoPath: string
}

export const pages: Page[] = [
  {
    name: 'Focus',
    href: '/focus',
    photoPath: 'focus.png'
  },
  {
    name: 'Rotation',
    href: '/rotation',
    photoPath: 'rotation.png'
  },
  {
    name: 'horizontal',
    href: '/horizontal',
    photoPath: 'horizontal.png'
  },
  // {
  //   name: 'horizontal',
  //   href: '/horizontal',
  //   photoPath: 'horizontal'
  // },
]