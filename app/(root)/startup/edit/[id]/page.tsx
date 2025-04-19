"use client";
import React, { useState, useEffect } from "react";
import EditForm from "@/components/EditForm";
import { Post } from "@/types/post";

export default function Page({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:5000/posts/${params.id}`, {
          cache: "no-store",
        });
        if (!res.ok) throw new Error("Failed to fetch post");
        const postData: Post = await res.json();
        setPost(postData);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  });

  return (
    <>
      <section className="pink_container !min-h-[230px] pink_container-alt">
        <h1 className="heading">Edit Post</h1>
      </section>
      {post ? <EditForm post={post} /> : <p>Loading...</p>}
    </>
  );
}
