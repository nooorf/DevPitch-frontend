"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FlagIcon, X } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { Post } from "@/types/post";
import {toast} from "sonner";

export default function PostDetails({ post }: { post: Post }) {
    const { user, loading } = useAuth();

    const [formData, setFormData] = useState({
        username: '',
        interest: '',
        expertise: '',
        linkedin: '',
        description: '',
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [iscollaborateOpen, setIsCollaborateOpen] = useState(false);
    const isDisabled = loading || !user || user.role === "moderator";

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleReport = async () => {
        if (!user) {
            alert("You need to log in to report posts.");
            return;
        }
        try {
            const res = await fetch(`http://localhost:5000/posts/${post._id}/report`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to report post");

            toast.success("Post has been reported successfully!");
            setIsModalOpen(false);
        } catch (error: any) {
            alert(error.message);
        } finally {
            setIsModalOpen(false);
        }
    };

    const handleCollaborateSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            alert("You need to log in to collaborate on posts.");
            return;
        }

        try {
            const res = await fetch(`http://localhost:5000/posts/${post._id}/collaborate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to collaborate on post");

            toast.success("Collaboration request sent successfully!");
            setIsCollaborateOpen(false);
        } catch (error: any) {
            toast.error(error.message);
        }
    };

    return (
        <section className="section_container !pt-0">
            <div className="space-y-5 mt-10 max-w-7xl mx-auto">
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
                        <button className="startup-form-btn !bg-primary-100 !p-2 !rounded-full !font-medium !text-[16px]" onClick={() => setIsCollaborateOpen(true)}>
                        Collaborate
                    </button>
                        <div
                            className={`flex gap-1 cursor-pointer ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
                            onClick={() => !isDisabled && setIsModalOpen(true)}
                        >
                            <FlagIcon className="size-6 text-red-800 mt-2" />
                            <p className="text-red-800 mt-2">Report</p>
                        </div>
                    </div>
                </div>
                <h3 className="text-30-bold">Pitch Details</h3>
                <div className="flex gap-8 items-center justify-center">
                    <article className="prose max-w-2xl font-work-sans break-all flex-1">
                        {post.pitch}
                    </article>
                    <div className="w-[400px] flex-shrink-0">
                        <img 
                            src={post.image} 
                            alt="Post Image" 
                            className="w-full h-auto rounded-lg object-cover mx-10"
                        />
                    </div>
                </div>
            </div>

            <hr className="post_divider" />

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
            {iscollaborateOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-5 rounded-lg shadow-lg w-[400px] relative">
                        <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={() => setIsCollaborateOpen(false)}>
                            <X size={24} />
                        </button>
                        <h2 className="text-xl font-semibold mb-4">Collaborate Request</h2>
                        <form onSubmit={handleCollaborateSubmit} className="space-y-3">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="interest"
                                placeholder="Area of Interest"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.interest}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="expertise"
                                placeholder="Expertise"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.expertise}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="url"
                                name="linkedin"
                                placeholder="LinkedIn Profile (optional)"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={formData.linkedin}
                                onChange={handleChange}
                            />
                            <textarea
                                name="description"
                                placeholder="Describe your idea or reason to collaborate"
                                className="w-full px-3 py-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                rows={3}
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                            <div className="flex justify-end gap-3 mt-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                    onClick={() => setIsCollaborateOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="startup-card-btn !bg-primary-100 !p-2 !font-medium !text-[16px]"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}