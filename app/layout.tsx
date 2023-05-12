import './globals.css'
import { Nunito } from 'next/font/google' // import font from google fonts

import Navbar from './components/navbar/Navbar'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider from './components/providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'

// create font
const font = Nunito({ subsets: ['latin'] });

// metadata for the app
export const metadata = {
  title: 'Airbnb',
  description: 'Airbnb Clone',
}

// root layout component
// wraps the entire app
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      {/* use font */}
      <body className={font.className}>

        {/* toast notification */}
        <ToasterProvider />

        {/* navbar */}
        <Navbar currentUser={currentUser} />

        {/* modals */}
        <LoginModal />
        <RegisterModal />

        {children}
      </body>
    </html>
  )
}
