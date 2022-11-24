import React from 'react'
import { Footer } from '../components/Footer'
import { Navbar } from '../components/Navbar'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center flex-col">{children}</div>
      </div>
      <Footer />
    </>
  )
}

export default Layout
