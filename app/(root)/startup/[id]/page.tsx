
"use client"
import React, { Suspense, useState } from 'react'
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';
import  View  from '@/components/View';
import {Skeleton} from '@/components/ui/skeleton';
import { FlagIcon, X } from 'lucide-react';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  if(!params) return <p className='text-center text-red-500'>Post Not Found</p>;
    const id = params.id;
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

  const handleReport = async () => {
    try {
        const res = await fetch(`http://localhost:5000/posts/report/${post._id}`, {
            method: "POST",
        });
        if (!res.ok) throw new Error("Failed to report post");
        alert("Post has been reported successfully!");
    } catch (error) {
        console.error("Error reporting post:", error);
    } finally {
        setIsModalOpen(false);
    }
};

    
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

      <Suspense fallback={<Skeleton className='view_skeleton'/>}> 
          <View id={id}/>
      </Suspense>
      {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-5 rounded-lg shadow-lg w-[400px] relative">
                            <button
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                onClick={() => setIsModalOpen(false)}
                            >
                                <X size={24} />
                            </button>
                            <h2 className="text-xl font-semibold mb-4">Report Post</h2>
                            <p>Are you sure you want to report this post?</p>
                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                    onClick={handleReport}
                                >
                                    Proceed
                                </button>
                            </div>
                        </div>
                    </div>
                )}
      </section>
    </>
  )
}

export default page 

