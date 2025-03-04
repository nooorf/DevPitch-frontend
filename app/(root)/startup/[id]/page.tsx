//startup/[id] : this is a dynamic page for startups
import React, { Suspense } from 'react'
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import  View  from '@/components/View';
import {Skeleton} from '@/components/ui/skeleton';
import { FlagIcon } from 'lucide-react';

interface Post {
    _id: string;
    title: string;
    description: string;
    category: string;
    link: string;
    createdAt: string;
    image: string;
    views: number;
    user: {
      _id: string;
      name: string;
      profilePicture: string; 
      githubUsername: string;   
    };
    pitch: string;
}

const page = async ({params}: {params: {id: string}}) => {
    if(!params) return <p className='text-center text-red-500'>Post Not Found</p>;
    const id = await (params.id);
    let post: Post | null = null;
    try{
        const res = await fetch(`http://localhost:5000/posts/${id}`, {
            cache: "no-store",
        });
        if(!res.ok) throw new Error("Failed to fetch posts");
        post = await res.json();
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
    if(!post) return <p className='text-center text-red-500'>Post Not Found</p>;
  return (
    <>
      <section className='pink_container !min-h-[230px]'>
        <p className='tag'>{formatDate(post?.createdAt) || formatDate(new Date)}</p>
        <h1 className='heading'>{post.title}</h1>
        <p className='sub-heading !max-w-5xl'>{post.description}</p>
      </section>
      <section className='section_container'>
        <img src={post.image} alt={post.title} className='w-full h-auto rounded-xl' />
      <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
        <div className='flex-between gap-5'>
          <Link href={`/user/${post.user._id}`} className='flex gap-2 items-center mb-3'>
            <Image src={post.user?.profilePicture} alt="avatar" width={64} height={64} className='rounded-full drop-shadow-lg' />
            <div>
              <p className='text-20-medium'>
                {post.user.name}
              </p>
              <p className='text-16-medium !text-black-300'>
                @{post.user.githubUsername}
              </p>
            </div>
          </Link>
          <div className="flex gap-3.5">
              <p className='category-tag'>{post.category}</p>
              <div className='flex gap-1 cursor-pointer'>
                  <FlagIcon className='size-6 text-red-800 mt-2' />
                  <p className='text-red-800 mt-2'>Report</p>
              </div>
          </div>
        </div>
        <h3 className='text-30-bold'>Pitch Details</h3>
        <article className='prose max-w-4xl font-work-sans break-all'>{post.pitch}</article>
      </div>
      <hr className='divider'/>

      <Suspense fallback={<Skeleton className='view_skeleton'/>}> {/*from nextjs for dynamically rendered content; everything above this is static*/}
          <View id={id}/>
      </Suspense>
      </section>
    </>
  )
}

export default page