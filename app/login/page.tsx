"use client";

import React, { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { LogIn } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Login = () => {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [formData, setFormData] = useState({ email: "", otp: "" });
  const [error, setError] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({});

    if (!formData.email.trim()) {
      setError({ email: "Email is required" });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/profusers/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: formData.email }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.msg || "Failed to send OTP");

      toast.success("OTP sent to your email");
      setStep("otp");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError({});

    if (!formData.otp.trim()) {
      setError({ otp: "OTP is required" });
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/profusers/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email: formData.email, otp: formData.otp }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.msg || "Invalid OTP");

      toast.success("Email verified, login successful!");
      router.push("/"); // Redirect after successful verification
    } catch (error: any) {
      toast.error(error.message || "Invalid OTP");
    }
  };

  return (
    <div className="startup-card startup-form">
      <h1 className="heading">Login</h1>
      {step === "email" ? (
        <form onSubmit={handleEmailSubmit} className="startup-form">
          <div>
            <label htmlFor="email" className="startup-form_label">
              Email
            </label>
            <Input
              id="email"
              name="email"
              className="startup-form_input"
              required
              value={formData.email}
              onChange={handleChange}
            />
            {error.email && <p className="startup-form_error">{error.email}</p>}
          </div>

          <Button type="submit" className="startup-form_btn text-white">
            Send OTP
            <LogIn className="size-6 ml-2" />
          </Button>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit} className="startup-form">
          <div>
            <label htmlFor="otp" className="startup-form_label">
              Enter OTP
            </label>
            <Input
              id="otp"
              name="otp"
              className="startup-form_input"
              required
              value={formData.otp}
              onChange={handleChange}
            />
            {error.otp && <p className="startup-form_error">{error.otp}</p>}
          </div>

          <Button type="submit" className="startup-form_btn text-white">
            Verify OTP
          </Button>
        </form>
      )}

        <p className="text-center"><a className="cursor-pointer" href="http://localhost:5000/auth/github">
          Authorize through GitHub
        </a>
        </p>
    </div>
  );
};

export default Login;
