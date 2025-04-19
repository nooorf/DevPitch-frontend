"use client";

import Link from "next/link";
import Image from "next/image";
import { EyeIcon } from "lucide-react";
import { formatDate } from "@/lib/utils"; 
import { toast } from "sonner";


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
}

export default function UserPost({ post }: { post: Post }) {

  const handleDelete = async () => {  
    try {
      const response = await fetch("http://localhost:3000/posts/${post._id}/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
      });

      if (response.ok) {
        toast.success("Post deleted successfully");
        window.location.reload();
      } else {
        const data = await response.json();
        toast.error(data.message || "Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    }
  }

  console.log("Post received in PostCard: " , post);
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p className="startup_card_date">{post.createdAt ? formatDate(post.createdAt) : formatDate(new Date().toISOString())}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{post.views}</span>
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${post.user?._id}`}>
            <p className="text-16-medium line-clamp-1">{post.user?.name}</p>
          </Link>
          <Link href={`/startup/${post._id}`}>
            <h3 className="text-26-semibold line-clamp-1">{post.title}</h3>
          </Link>
        </div>

        <Link href={`/user/${post.user?._id}`}>
          <Image
            src={post.user?.profilePicture }
            alt={post.user?.name || "User"}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/startup/${post._id}`}>
        <p className="startup-card_desc">{post.description}</p>
        <img src={post.image} className="startup-card_img" />
      </Link>

      <div className="flex-between mt-5 gap-2">
        <Link href={`/query=${post.category?.toLowerCase()}`}>
          <p className="text-16-medium">{post.category}</p>
        </Link>
        <div id="edit_details" className="flex gap-1">
        <Link href={`/startup/edit/${post._id}`}>
          <button className="startup-card_btn">Edit</button>
        </Link>
          <button className="startup-card_btn" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </li>
  );
}