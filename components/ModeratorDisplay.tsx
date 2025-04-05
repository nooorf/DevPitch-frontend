"use client";
import React, { useEffect, useState } from "react";
import ModeratorPostCard from "./ModeratorPostCard";
import { Post } from "@/types/post";

const ModeratorDisplay = () => {
  const [startups, setStartups] = useState<Post[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePostUpdate = (postId: string) => {
    setStartups((prevStartups) => {
      if (!prevStartups) return null;
      return prevStartups.filter((post) => post._id !== postId);
    });
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("http://localhost:5000/posts/reported", {
          cache: "no-store",
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch posts");

        const data = await res.json();
        console.log("These are startups for moderator display: ", data);
        setStartups(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };
    

    fetchPosts();
  }, []);

  if (error) return <p className="text-red-500">Error fetching posts: {error}</p>;

  return (
    <>
      <ul className="flex flex-wrap gap-5 ">
        {startups && startups.length > 0 ? (
          startups.map((startup) => <ModeratorPostCard  key={startup._id} post={startup} onPostUpdate={handlePostUpdate}/>)
        ) : (
          <p>No posts have been reported yet</p>
        )}
      </ul>
    </>

  );
};

export default ModeratorDisplay;