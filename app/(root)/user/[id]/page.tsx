import React from 'react'
import Image from 'next/image';
import UserProfile from '@/components/UserProfile';

interface User {
    _id: string;
    name: string;
    githubUsername: string;
    profilePicture: string;
    bio?: string;
}
const getUser = async (id: string): Promise<User | null> => {
    try {
        const res = await fetch(`http://localhost:5000/users/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch user");
        return res.json();
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
}
const page = async ({ params }: { params: Promise<{id: string}> }) => {
    const { id } = await params;
    const user = await getUser(id);

    if(!user) {return <p className='text-red-500'>User not found</p>}
  return (
   <>
    <section className='profile_container'>
        <div className='profile_card w-1/3 !bg-[#CC376B]'>
            <div className='profile_title'>
                <h3 className='text-20-black uppercase font-bold text-center line-clamp-1'>
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
        
        
        <div >
        <p className='text-30-bold w-full block mb-5'>All Posts</p>
            <UserProfile id={user._id}/>
        </div>
    </section>
   </>
  )
}

export default page