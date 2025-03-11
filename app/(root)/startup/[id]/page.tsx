
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { formatDate } from "@/lib/utils";
import View from "@/components/View";
import PostDetails from "@/components/PostDetails";
import { Skeleton } from "@/components/ui/skeleton";
import { Post } from "@/types/post";

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
    const id = params.id;
    console.log("This is id that works for views", id)
    const post = await getPost(params.id);
    
    console.log("This is post", post);
    if (!post) return notFound(); 

    return (
        <>
            <section className="pink_container !min-h-[230px]">
                <p className="tag">{formatDate(post.createdAt)}</p>
                <h1 className="heading">{post.title}</h1>
                <p className="sub-heading !max-w-5xl">{post.description}</p>
            </section>
            <PostDetails post={post} />
            <Suspense fallback={<Skeleton className="view_skeleton" />}>
                <View id={id} />
            </Suspense>
        </>
    );
}

