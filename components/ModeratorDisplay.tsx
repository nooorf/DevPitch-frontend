import React from 'react'
import PostCard from './PostCard'

const ModeratorDisplay = async () => {
    try {
        const res = await fetch('http://localhost:5000/posts/reported', {
          cache: "no-store", 
        });
    
        if (!res.ok) throw new Error("Failed to fetch posts");
    
        const startups = await res.json();
    
        return (
          <>
            <ul>
              {startups.length > 0 ? (
                startups.map((startup: any) => <PostCard key={startup._id} post={startup} />)
              ) : (
                <p>No posts have been reported yet</p>
              )}
            </ul>
          </>
        );
    } catch (error) {
        return <p className="text-red-500">Error fetching posts: {(error as Error).message}</p>;
    }
};
export default ModeratorDisplay
