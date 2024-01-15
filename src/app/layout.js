import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '../../lib/provider'
import Navbar from './components/Navbar'
import { AuthProvider } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'My App',
  description: 'Created by Arijeet Sinha',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </AuthProvider>
      </body>
    </html>
  )
}
