"use client";

import Link from "next/link";
import Image from "next/image";
import { EyeIcon, X, Check } from "lucide-react";
import { formatDate } from "@/lib/utils"; 
import ReportNumber from "./ReportNumber";
import { Post } from "@/types/post";

export default function PostCard({ post, onPostUpdate }: { post: Post, onPostUpdate: (postId: string) => void }) {
  console.log("Post received in PostCard: " , post);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/posts/${post._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      console.log("Item deleted successfully");
      onPostUpdate(post._id);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleKeep = async () => {
    try {
      const response = await fetch(`http://localhost:5000/posts/${post._id}`, {
        method: "PUT",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to update item");
      }

      console.log("Item updated successfully");
      onPostUpdate(post._id);
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };
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

      <div className="flex-between gap-2 mt-5">
        <Link href={`/query=${post.category?.toLowerCase()}`}>
          <p className="text-16-medium">{post.category}</p>
        </Link>
        <Link href={`/startup/${post._id}`}>
          <button className="startup-card_btn">Details</button>
        </Link>
      </div>
      <div className="flex-between mt-5">
        <div className="flex gap-2 mt-5">
          <a href="#">
            <button onClick={handleDelete} className="startup-card_btn-moderator_remove "><X/></button>
          </a>
          <a href="#">
            <button onClick={handleKeep} className="startup-card_btn-moderator_keep"><Check/></button>
          </a>
        </div>
        <ReportNumber reportCount={post.reportCount} />
      </div>
      
    </li>
  );
}
