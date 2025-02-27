"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const StartupForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
    pitch: "",
  });

  const [error, setError] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError({});
  
    const errors: Record<string, string> = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) errors[key] = `${key} is required`;
    });
  
    if (Object.keys(errors).length > 0) {
      setError(errors);
      setIsSubmitting(false);
      return;
    }
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", 
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (!response.ok) throw new Error(result.message || "Failed to create post");
  
      toast.success("Your post has been created!");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">Title</label>
        <Input id="title" name="title" className="startup-form_input" required placeholder="Startup Title" value={formData.title} onChange={handleChange} />
        {error.title && <p className="startup-form_error">{error.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label">Description</label>
        <Textarea id="description" name="description" className="startup-form_textarea" required placeholder="Describe your startup" value={formData.description} onChange={handleChange} />
        {error.description && <p className="startup-form_error">{error.description}</p>}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">Category</label>
        <Input id="category" name="category" className="startup-form_input" required placeholder="Tech, AI, Robotics..." value={formData.category} onChange={handleChange} />
        {error.category && <p className="startup-form_error">{error.category}</p>}
      </div>

      <div>
        <label htmlFor="image" className="startup-form_label">Image URL</label>
        <Input id="image" name="image" className="startup-form_input" required placeholder="Startup Image URL" value={formData.image} onChange={handleChange} />
        {error.image && <p className="startup-form_error">{error.image}</p>}
      </div>

      <div>
        <label htmlFor="pitch" className="startup-form_label">Startup Pitch</label>
        <Textarea id="pitch" name="pitch" className="startup-form_textarea" required placeholder="Your pitch in a few words" value={formData.pitch} onChange={handleChange} />
        {error.pitch && <p className="startup-form_error">{error.pitch}</p>}
      </div>

      <Button type="submit" className="startup-form_btn text-white" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Your Pitch"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default StartupForm;
