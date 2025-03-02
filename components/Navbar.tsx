/*import Link from 'next/link'
import Image from 'next/image'
import { LogIn, LogOut, BadgePlus } from 'lucide-react'
import {Avatar, AvatarImage, AvatarFallback} from '@/components/ui/avatar'
import {cookies} from "next/headers"

const fetchUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get('authToken')?.value;
  if (!token) return null;
  try{
    const res = await fetch('http://localhost:5000/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
        credentials: "include"
      },
      cache: "no-store"
    });
    if(!res.ok) return null;
    return await res.json();
  } catch(error){
    console.error("Error fetching user: ", error);
    return null;
  }
};
  
const Navbar = async () => { 
  const user = await fetchUser();
  return (
    <header className="px-5 py-3 shadow-sm bg-white font-work-sans">
        <nav className='flex justify-between items-center'>
            <Link href='/'>
                <Image src='/logo.png' width={144} height={40} alt='logo' />
            </Link>
            <div className='flex items-center gap-5 text-black'>
              {user ? (
                <>
                  <Link href='/startup/create'>
                        <span className='max-sm:hidden'>Create</span>
                        <BadgePlus className='size-6 sm:hidden'/>
                  </Link>

                  <a href='http://localhost:5000/auth/logout'>
                    <LogOut className='cursor-pointer'/>
                  </a>
                  <Link href={`/users/${user._id}`}>
                      <Avatar className="size-10">
                          <AvatarImage src={user.profilePicture || ""} alt={user.name || ""}/>
                          <AvatarFallback>AV</AvatarFallback>
                      </Avatar>
                  </Link>
                </>
              ) : (
                <a href="http://localhost:5000/auth/github">
                  <LogIn className='cursor-pointer'/>
                </a>
              )}
            </div>
        </nav>
    </header>
  )
}

export default Navbar*/
"use client";

import Link from "next/link";
import Image from "next/image";
import { LogIn, LogOut, BadgePlus } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

// ✅ Define User type
type User = {
  _id: string;
  name: string;
  githubUsername: string;
  email: string;
  profilePicture?: string;
};

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null); // ✅ Define state with correct type

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/me", {
          credentials: "include", // ✅ Ensures the cookie is sent
          cache: "no-store",
        });

        if (!res.ok) return setUser(null);
        const data: User = await res.json(); // ✅ Type assertion
        setUser(data);
      } catch (error) {
        console.error("Error fetching user: ", error);
      }
    };

    fetchUser();
  }, []);

  // ✅ Log user *after* state updates
  useEffect(() => {
    console.log("Updated user:", user);
  }, [user]); // Logs whenever `user` changes

  return (
    <header className="px-5 py-3 shadow-sm bg-white font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" width={144} height={40} alt="logo" />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden">Create</span>
                <BadgePlus className="size-6 sm:hidden" />
              </Link>

              <a href="http://localhost:5000/auth/logout">
                <LogOut className="cursor-pointer" />
              </a>
              <Link href={`/users/${user._id}`}>
                <Avatar className="size-10">
                  <AvatarImage src={user.profilePicture || ""} alt={user.name || ""} />
                  <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <a href="http://localhost:5000/auth/github">
              <LogIn className="cursor-pointer" />
            </a>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
