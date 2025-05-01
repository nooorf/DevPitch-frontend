import React from 'react';
import Image from 'next/image';
import ModeratorDisplay from '@/components/ModeratorDisplay';
import { notFound } from "next/navigation";

interface Moderator {
  _id: string;
  name: string;
  githubUsername: string;
  profilePicture: string;
  bio?: string;
  role: string;
}

const getUser = async (id: string): Promise<Moderator | null> => {
  try {
    const res = await fetch(`http://localhost:5000/users/${id}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch user");
    return res.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  console.log("This is id in moderator page: ", id)
  if (!id) return notFound();

  const moderator = await getUser(id);
  console.log("This is moderator profile in moderator page: ", moderator);
  if (!moderator) return notFound();
  return (
    <section className="profile_container">
      <div className="profile_card w-1/3 !bg-[#CC376B]">
        <div className="profile_title">
          <h3 className="text-20-black uppercase font-bold text-center line-clamp-1">
            {moderator.name}
          </h3>
        </div>
        <Image src={moderator.profilePicture || "default-avatar.png"}
          alt={moderator.name}
          width={220}
          height={220}
          className="profile_image"
        />
        <p className='text-30-extrabold mt-7 text-center'>@{moderator?.githubUsername}</p>
        <p className='mt-1 text-center text-14-normal'>{moderator?.bio}</p>
      </div>
      <div>
        <p className="text-30-bold w-full block mb-5">Reported Posts</p>
        <ModeratorDisplay />
      </div>
    </section>
  );
};