"use client";

import Link from "next/link";
import Image from "next/image";
import { LogIn, LogOut, BadgePlus, ShieldCheck } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";


type User = {
  _id: string;
  name: string;
  githubUsername: string;
  email: string;
  profilePicture?: string;
  role: string;
};

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/auth/me", {
          credentials: "include", 
          cache: "no-store",
        });

        if (!res.ok) return setUser(null);
        const data: User = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user: ", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    console.log("Updated user:", user);
  }, [user]);

  return (
    <header className="px-5 py-3 shadow-sm bg-white font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" width={144} height={40} alt="logo" />
        </Link>
        <div className="flex items-center gap-5 text-black">
          {user ? (
            user.role === "moderator" ? (
              <>
                <Link href={`/moderator/${user._id}`} className="flex items-center gap-2">
                  <ShieldCheck className="size-6" />
                  <span className="max-sm:hidden">Moderator</span>
                </Link>
                <a href="http://localhost:5000/auth/logout">
                  <LogOut className="cursor-pointer" />
                </a>
              </>
            ) : (
              <>
                <Link href="/startup/create">
                  <span className="max-sm:hidden">Create</span>
                  <BadgePlus className="size-6 sm:hidden" />
                </Link>

                <a href="http://localhost:5000/auth/logout">
                  <LogOut className="cursor-pointer" />
                </a>
                <Link href={`/user/${user._id}`}>
                  <Avatar className="size-10">
                    <AvatarImage src={user.profilePicture || ""} alt={user.name || ""} />
                    <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Link>
              </>
            )
            
          ) : (
            <Link href="/login">
              <LogIn className="cursor-pointer" />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
