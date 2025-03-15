"use client"
import React, { useState, useEffect } from 'react'
import EditForm from '@/components/EditForm'
import { useRouter } from 'next/navigation'

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [post, setPost] = useState<Post | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:5000/posts/${params.id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch post");
        const postData = await res.json();
        console.log("This is post", postData);
        setPost(postData);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
  
    fetchPost();
  }, [params.id, router]);
  

  return (
    <>
      <section className='pink_container !min-h-[230px]'>
        <h1 className='heading'>Edit Post</h1>
      </section>
      <EditForm post={post} />
    </>
  )
}
