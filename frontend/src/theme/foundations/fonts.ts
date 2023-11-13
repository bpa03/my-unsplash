import {Noto_Sans} from 'next/font/google'

const notoSans = Noto_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  fallback: ['system-ui'],
  preload: true
})

export const fonts = {
  body: `${notoSans.style.fontFamily}, system-ui`,
  heading: `${notoSans.style.fontFamily}, system-ui`
}
