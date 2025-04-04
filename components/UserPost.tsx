"use client";

import Link from "next/link";
import Image from "next/image";
import { EyeIcon } from "lucide-react";
import { formatDate } from "@/lib/utils"; 


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
  console.log("Post received in PostCard: " , post);
  return (
    <li className="startup-card w-[calc(33.333%-0.625rem)] sm:w-[calc(50%-0.625rem)]  box-border group">
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

      <div className="flex-between mt-5">
        <Link href={`/query=${post.category?.toLowerCase()}`}>
          <p className="text-16-medium">{post.category}</p>
        </Link>
        <div id="edit_details" className="flex gap-2">
        <Link href={`/startup/edit/${post._id}`}>
          <button className="startup-card_btn">Edit</button>
        </Link>
        <Link href={`/startup/${post._id}`}>
          <button className="startup-card_btn">Details</button>
        </Link>
        </div>
      </div>
    </li>
  );
}
