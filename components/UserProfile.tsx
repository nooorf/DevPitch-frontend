import React from "react";
import UserPosts from "./UserPost";
import { Post } from "@/types/post";

const UserStartups = async ({ id }: { id: string }) => {
  try {
    const res = await fetch(`http://localhost:3000/users/${id}/posts`, {
      cache: "no-store", 
    });

    if (!res.ok) throw new Error("Failed to fetch posts");

    const startups = await res.json();

    return (
      <>
        <ul className="flex flex-wrap gap-5 ">
          {startups.length > 0 ? (
            startups.map((startup: Post) => <UserPosts key={startup._id} post={startup} />
          )
          ) : (
            <p>No posts created yet</p>
          )}
        </ul>
      </>
    );
  } catch (error) {
    return <p className="text-red-500">Error fetching posts: {(error as Error).message}</p>;
  }
};

export default UserStartups;