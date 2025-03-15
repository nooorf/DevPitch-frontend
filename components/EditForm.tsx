"use client";

import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { useRouter, useParams } from "next/navigation";

interface Post {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  pitch: string;
  githubRepo: string;
}

export default function EditForm() {
  const [formData, setFormData] = useState<Post | null>(null);
  const [error, setError] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (params?.id) {
      fetchPost();
    }
  }, [params]);

  const fetchPost = async () => {
    try {
      const response = await fetch(`http://localhost:5000/posts/${params.id}`);
      const post = await response.json();
      setFormData(post);
    } catch (error) {
      console.error("Failed to fetch post:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (formData) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setIsSubmitting(true);
    setError({});

    const errors: Record<string, string> = {};

    const requiredFields: (keyof Post)[] = ["title", "description", "category", "pitch"];
    requiredFields.forEach((field) => {
      const value = formData[field];
      if (typeof value !== "string" || !value.trim()) {
        errors[field] = `${field} is required`;
      }
    });

    if (Object.keys(errors).length > 0) {
      setError(errors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/posts/${formData._id}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Failed to update post");

      toast.success("Your post has been updated!");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="Startup Title"
          value={formData.title}
          onChange={handleChange}
        />
        {error.title && <p className="startup-form_error">{error.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          required
          placeholder="Describe your startup"
          value={formData.description}
          onChange={handleChange}
        />
        {error.description && <p className="startup-form_error">{error.description}</p>}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>
        <Input
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Tech, AI, Robotics..."
          value={formData.category}
          onChange={handleChange}
        />
        {error.category && <p className="startup-form_error">{error.category}</p>}
      </div>

      <div>
        <label htmlFor="githubRepo" className="startup-form_label">
          Github Repo
        </label>
        <Input
          id="githubRepo"
          name="githubRepo"
          className="startup-form_input"
          placeholder="Your repo link here"
          value={formData.githubRepo}
          onChange={handleChange}
        />
        {error.githubRepo && <p className="startup-form_error">{error.githubRepo}</p>}
      </div>

      <div>
        <label htmlFor="image" className="startup-form_label">
          Image URL
        </label>
        <Input
          id="image"
          name="image"
          className="startup-form_input"
          placeholder="Startup Image URL"
          value={formData.image}
          onChange={handleChange}
        />
        {error.image && <p className="startup-form_error">{error.image}</p>}
      </div>

      <div>
        <label htmlFor="pitch" className="startup-form_label">
          Startup Pitch
        </label>
        <Textarea
          id="pitch"
          name="pitch"
          className="startup-form_textarea"
          required
          placeholder="Your pitch in a few words"
          value={formData.pitch}
          onChange={handleChange}
        />
        {error.pitch && <p className="startup-form_error">{error.pitch}</p>}
      </div>

      <Button type="submit" className="startup-form_btn text-white" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Your Pitch"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
}