"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import UserProfile from '@/components/UserProfile';
import {toast} from 'sonner';

interface User {
    _id: string;
    name: string;
    githubUsername: string;
    profilePicture: string;
    bio?: string;
}

const page = () => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("http://localhost:5000/auth/me", {
                    credentials: 'include',
                });

                if(!res.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const userData = await res.json();
                setUser(userData);
            } catch (error) {
                toast.error('Error fetching user details. Please try again');
                //create login page
                router.push('/login');
            }
        }
    }, [router]);

    if(!user) {return <p>Loading...</p>}
  return (
   <>
    <section className='profile_container'>
        <div className='profile_card'>
            <div className='profile_title'>
                <h3 className='text-24-black uppercase text-center line-clamp-1'>
                    {user.name}
                </h3>
            </div>
            <Image src={user.profilePicture || "default-avatar.png"}  
                    alt={user.name} 
                    width={220} 
                    height={220} 
                    className="profile_image"
            />
            <p className='text-30-extrabold mt-7 text-center'>@{user?.githubUsername}</p>
            <p className='mt-1 text-center text-14-normal'>{user?.bio}</p>

        </div>
        <div className='flex-1 flex flex-col gap-5 lg:-mt-5'>
            <p className='text-30-bold'>Your Posts</p>
            <ul className='card_grid-sm'>
                    <UserProfile id={user._id}/>
            </ul>
        </div>
    </section>
   </>
  )
}

export default page