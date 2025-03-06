"use client";

import React, { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from  "../../components/ui/button";
import { LogIn} from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const StartupForm = () => {
  const [formData, setFormData] = useState({
    email:""
  });

  const [error, setError] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({});
  
    const errors: Record<string, string> = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) errors[key] = `${key} is required`;
    });
  
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/profusers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email: formData.email }),
      });
    
      const result = await response.json();
    
      if (!response.ok) throw new Error(result.msg || "Not Found");
      router.push("/");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };    

  return (
    <div className="startup-card startup-form">
    <h1 className="heading">Login</h1>
    <form onSubmit={handleSubmit} className="startup-form">
      <div>
        <label htmlFor="email" className="startup-form_label">Email</label>
        <Input id="email" name="email" className="startup-form_input" required  value={formData.email} onChange={handleChange} />
        {error.email && <p className="startup-form_error">{error.email}</p>}
      </div>

      <Button type="submit" className="startup-form_btn text-white">
        Login
        <LogIn className="size-6 ml-2" />
      </Button>
      <p>As a Student <a className="cursor-pointer" href="http://localhost:5000/auth/github">
              Login through github
      </a>
      </p>
    </form>
    </div>
  );
};

export default StartupForm;
