import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const Navbar = async () => { 
  return (
    <header className="px-5 py-3 shadow-sm bg-white font-work-sans">
        <nav className='flex justify-between items-center'>
            <Link href='/'>
                <Image src='/logo.png' width={144} height={40} alt='logo' />
            </Link>
            <div className='flex items-center gap-5 text-black'>
            </div>
        </nav>
    </header>
  )
}

export default Navbar