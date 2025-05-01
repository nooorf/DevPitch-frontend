"use client";

import Link from "next/link";
import Image from "next/image";
import { EyeIcon, X, Check } from "lucide-react";
import { formatDate } from "@/lib/utils"; 
import ReportNumber from "./ReportNumber";
import { Post } from "@/types/post";
import { useState } from "react";
import { toast } from "sonner";

export default function ModeratorPostCard({ post, onPostUpdate }: { post: Post, onPostUpdate: (postId: string) => void }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isKeepModalOpen, setIsKeepModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:5000/posts/${post._id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete item");
      }

      toast.success("Post deleted successfully");
      onPostUpdate(post._id);
    } catch (error) {
      console.error("Error deleting item:", error);
      toast.error("Failed to delete post");
    } finally {
      setIsDeleteModalOpen(false);
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

      toast.success("Post kept successfully");
      onPostUpdate(post._id);
    } catch (error) {
      console.error("Error updating item:", error);
      toast.error("Failed to keep post");
    } finally {
      setIsKeepModalOpen(false);
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
      
      <div className="flex gap-2 mt-5">
        <button onClick={() => setIsDeleteModalOpen(true)} className="startup-card_btn-moderator_remove">
          <X/>
        </button>
        <button onClick={() => setIsKeepModalOpen(true)} className="startup-card_btn-moderator_keep">
          <Check/>
        </button>
      </div>
      <ReportNumber reportCount={post.reportCount} />

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-[400px] relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setIsDeleteModalOpen(false)}>
              <X size={24} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Delete Post</h2>
            <p>Are you sure you want to delete this post?</p>
            <div className="flex justify-end gap-3 mt-4">
              <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={() => setIsDeleteModalOpen(false)}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Keep Confirmation Modal */}
      {isKeepModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-[400px] relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setIsKeepModalOpen(false)}>
              <X size={24} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Keep Post</h2>
            <p>Are you sure you want to keep this post?</p>
            <div className="flex justify-end gap-3 mt-4">
              <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={() => setIsKeepModalOpen(false)}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" onClick={handleKeep}>
                Keep
              </button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
}