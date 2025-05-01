import React from 'react'
import EditForm from '@/components/EditForm'
import { Post } from '@/types/post'

async function getPost(id: string): Promise<Post | null> {
  try {
    const res = await fetch(`http://localhost:5000/posts/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch post");
    return res.json();
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <section className='pink_container !min-h-[230px] pink_container-alt'>
        <h1 className='heading'>Edit Post</h1>
      </section>
      <EditForm post={post} />
    </>
  )
}