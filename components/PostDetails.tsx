"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FlagIcon, X } from "lucide-react";

interface Post {
    _id: string;
    title: string;
    description: string;
    category: string;
    image: string;
    user: {
        _id: string;
        name: string;
        profilePicture: string;
        githubUsername: string;
    };
    pitch: string;
}

export default function PostDetails({ post }: { post: Post }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleReport = async () => {
        try {
            
            const res = await fetch(`http://localhost:5000/posts/${post._id}/report`, { method: "POST" });
            if (!res.ok) throw new Error("Failed to report post");
            alert("Post has been reported successfully!");
        } catch (error) {
            console.error("Error reporting post:", error);
        } finally {
            setIsModalOpen(false);
        }
    };

    return (
        <section className="section_container">
            <img src={post.image} alt={post.title} className="w-full h-auto rounded-xl" />
            <div className="space-y-5 mt-10 max-w-4xl mx-auto">
                <div className="flex-between gap-5">
                    <Link href={`/user/${post.user._id}`} className="flex gap-2 items-center mb-3">
                        <Image src={post.user.profilePicture} alt="avatar" width={64} height={64} className="rounded-full drop-shadow-lg" />
                        <div>
                            <p className="text-20-medium">{post.user.name}</p>
                            <p className="text-16-medium !text-black-300">@{post.user.githubUsername}</p>
                        </div>
                    </Link>
                    <div className="flex gap-3.5">
                        <p className="category-tag">{post.category}</p>
                        <div className="flex gap-1 cursor-pointer" onClick={() => setIsModalOpen(true)}>
                            <FlagIcon className="size-6 text-red-800 mt-2" />
                            <p className="text-red-800 mt-2">Report</p>
                        </div>
                    </div>
                </div>
                <h3 className="text-30-bold">Pitch Details</h3>
                <article className="prose max-w-4xl font-work-sans break-all">{post.pitch}</article>
            </div>
            <hr className="divider" />

            {/* Report Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg w-[400px] relative">
                        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setIsModalOpen(false)}>
                            <X size={24} />
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Report Post</h2>
                        <p>Are you sure you want to report this post?</p>
                        <div className="flex justify-end gap-3 mt-4">
                            <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </button>
                            <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700" onClick={handleReport}>
                                Proceed
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
