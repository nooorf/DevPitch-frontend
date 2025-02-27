import React from "react";
import PostCard from "./PostCard";

const UserStartups = async ({ id }: { id: string }) => {
  try {
    const res = await fetch(`http://localhost:5000/users/${id}/posts`, {
      cache: "no-store", 
    });

    if (!res.ok) throw new Error("Failed to fetch posts");

    const startups = await res.json();

    return (
      <>
        <h1 className="text-xl font-bold mb-4">My Startups</h1>
        <ul>
          {startups.length > 0 ? (
            startups.map((startup: any) => <PostCard key={startup._id} post={startup} />)
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
