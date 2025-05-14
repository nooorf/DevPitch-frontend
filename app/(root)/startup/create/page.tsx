"use client"
import React, {useState, useEffect} from 'react'
import StartupForm from '@/components/StartupForm'
import { useRouter } from 'next/navigation'

const page = () => {
    const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      console.log("Checking auth in create page")
      try{
        const res = await fetch("http://localhost:5000/auth/me",{
          method: "GET",
          credentials: "include",
        })
        if (!res.ok){throw new Error("Not authorized")}
        const user = await res.json();
        console.log("IsAuthenticated set. Authenticated user in startup page: ", user)
        setIsAuthenticated(true)
      }catch(err){
        console.error("Auth check for create page failed: ", err)
        router.push("/")
      } 
    };
    
    checkAuth()
  
  }, [])

  if (!isAuthenticated) return null
  return (
    <>
        <section className='pink_container !min-h-[230px] pink_container-alt'>
            <h1 className='heading'>Submit Your Startup Pitch!</h1>
        </section>
        <StartupForm />
    </>
  )
}

export default page