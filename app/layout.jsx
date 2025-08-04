import './globals.css'
import { Inter, Cairo } from 'next/font/google'
import { Providers } from './providers'
import LayoutWrapper from '../components/layout/LayoutWrapper'

const inter = Inter({ subsets: ['latin'] })
const cairo = Cairo({ subsets: ['arabic'] })

export const metadata = {
  title: 'راصد ويذر - Rasid Weather',
  description: 'موقع راصد ويذر هو موقع يُستخدم لمتابعة حالة الطقس وعرض آخر الأخبار',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${inter.className} ${cairo.variable} font-custom`}>
        <Providers>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </Providers>
      </body>
    </html>
  )
} 