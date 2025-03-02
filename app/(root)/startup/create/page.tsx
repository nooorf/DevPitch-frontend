"use client"
import React, {useState, useEffect} from 'react'
import StartupForm from '@/components/StartupForm'
import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('authToken='))
      ?.split('=')[1]

    if (!token) {
      router.push('/login') 
    } else {
      setIsAuthenticated(true)
    }
  }, [])

  if (!isAuthenticated) return null 
  return (
    <>
        <section className='pink_container !min-h-[230px]'>
            <h1 className='heading'>Submit Your Startup Pitch!</h1>
        </section>
        <StartupForm />
    </>
  )
}

export default page
