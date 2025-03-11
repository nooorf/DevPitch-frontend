"use client";
import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import ModeratorPostCard from "./ModeratorPostCard";

interface Post {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  views: number;
  createdAt: string;
  user: {
    _id: string;
    name: string;
    profilePicture: string;
  };
  reportCount: number;
}

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
      <ul>
        {startups && startups.length > 0 ? (
          startups.map((startup) => <ModeratorPostCard  key={startup._id} post={startup} />)
        ) : (
          <p>No posts have been reported yet</p>
        )}
      </ul>
    </>
  );
};

export default ModeratorDisplay;
