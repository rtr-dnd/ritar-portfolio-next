export type Page = {
  name: string,
  href: string,
  photoPath: string,
  onlyPC: boolean
}

export const pages: Page[] = [
  {
    name: 'Focus',
    href: '/focus',
    photoPath: 'focus.png',
    onlyPC: false
  },
  {
    name: 'Rotation',
    href: '/rotation',
    photoPath: 'rotation.png',
    onlyPC: false
  },
  {
    name: 'Horizontal',
    href: '/horizontal',
    photoPath: 'horizontal.png',
    onlyPC: false
  },
  {
    name: 'Placeholder',
    href: '/placeholder',
    photoPath: 'placeholder.png',
    onlyPC: true
  },
]