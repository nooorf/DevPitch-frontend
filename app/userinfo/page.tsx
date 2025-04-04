"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const UserInfo = () => {
  const [formData, setFormData] = useState({
    username: "",
    bio: "",
    pfp: "", 
  });

  const [error, setError] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const fileInput = e.target as HTMLInputElement;
      const file = fileInput.files ? fileInput.files[0] : null;
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData((prev) => ({ ...prev, pfp: reader.result as string }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError({});

    const errors: Record<string, string> = {};
    if (!formData.username.trim()) errors["username"] = "Username is required";
    if (!formData.bio.trim()) errors["bio"] = "Bio is required";
    if (!formData.pfp) errors["pfp"] = "Profile image is required";

    if (Object.keys(errors).length > 0) {
      setError(errors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/profusers/saveuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });
    
      const result = await response.json();
    
      if (!response.ok) {
        if (result.msg === "Username already exists. Please choose another.") {
          toast.error(result.msg);
        } else {
          throw new Error(result.message || "Failed to save user");
        }
      } else {
        toast.success("User info saved successfully");
        router.push("/");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen min-w-screen px-4 sm:px-6">
    <div className="login-card max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-2xl mx-auto p-4 sm:p-6 md:p-8 bg-white shadow-lg rounded-lg">
    <form onSubmit={handleSubmit} className="startup-form">
      <h1 className="login-heading">User Info</h1>
      <div>
        <label htmlFor="username" className="startup-form_label">Username</label>
        <Input id="username" name="username" className="startup-form_input" placeholder="Enter your username" value={formData.username} onChange={handleChange} />
        {error.username && <p className="user-info_error">{error.username}</p>}
      </div>

      <div>
        <label htmlFor="bio" className="startup-form_label">Bio</label>
        <Textarea id="bio" name="bio" className="startup-form_textarea" placeholder="Describe yourself" value={formData.bio} onChange={handleChange} />
        {error.bio && <p className="user-info_error">{error.bio}</p>}
      </div>

      <div>
        <label htmlFor="pfp" className="startup-form_label">Profile Image </label>
        <input type="file" name="pfp" accept="image/*" onChange={handleChange} />
        {error.pfp && <p className="user-info_error">{error.pfp}</p>}
      </div>

      <Button type="submit" className="startup-form_btn text-white" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
    </form>
    </div>
    </div>
    );
};

export default UserInfo;
