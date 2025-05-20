'use client'

import { Geist, Geist_Mono } from 'next/font/google'
import 'primereact/resources/themes/lara-light-indigo/theme.css';  
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import './globals.css'
import Footer from "../components/footer"
import Header from '../components/header'
import { usePathname } from 'next/navigation'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const hideHeaderOn = ['/'];
  const shouldShowHeader = !hideHeaderOn.includes(pathname);
  return (
    
    <>
      {shouldShowHeader && <Header/>}

        <html lang="en">

          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            
            {children}

          </body>
          


        </html>

      {shouldShowHeader && <Footer />}
    </>

  )
}