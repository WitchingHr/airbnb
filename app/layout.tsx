import './globals.css'
import { Nunito } from 'next/font/google' // import font from google fonts

import ToasterProvider from './components/providers/ToasterProvider'
import Navbar from './components/navbar/Navbar'
import RegisterModal from './components/modals/RegisterModal'
import LoginModal from './components/modals/LoginModal'
import RentModal from './components/modals/RentModal'
import getCurrentUser from './actions/getCurrentUser'
import SearchModal from './components/modals/SearchModal'

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
        <RentModal />
        <SearchModal />

        <div className='pb-20 pt-28'>
          {children}
        </div>
      </body>
    </html>
  )
}
