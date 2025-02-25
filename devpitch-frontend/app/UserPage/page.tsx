"use client";
import React from 'react';
import Image from 'next/image';
import { EyeIcon } from 'lucide-react';
const dummyUser = {
  id: '101',
  name: 'John Doe',
  username: 'johndoe',
  bio: 'A passionate entrepreneur building the future.',
  image: 'https://via.placeholder.com/220',
};
const dummyPosts = [
    {
      _id: '1',
      title: 'AI-Powered Code Reviewer',
      createdAt: new Date().toISOString(),
      author: { _id: '101', name: 'John Doe', image: 'https://via.placeholder.com/48' },
      views: 120,
      description: 'An AI tool that helps developers review code efficiently.',
      category: 'AI',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      _id: '2',
      title: 'Decentralized Finance App',
      createdAt: new Date().toISOString(),
      author: { _id: '102', name: 'Jane Smith', image: 'https://via.placeholder.com/48' },
      views: 95,
      description: 'A blockchain-powered application for secure financial transactions.',
      category: 'Blockchain',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      _id: '3',
      title: 'Smart Home Automation',
      createdAt: new Date().toISOString(),
      author: { _id: '103', name: 'Alice Johnson', image: 'https://via.placeholder.com/48' },
      views: 80,
      description: 'An IoT-based system to automate home appliances.',
      category: 'IoT',
      image: 'https://via.placeholder.com/300x200',
    }
  ];

function UserPage() {
  return (
    <section className='profile_container flex flex-col items-center gap-10 p-5'>
      <div className='profile_card bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/3 text-center'>
        <Image src={dummyUser.image} alt={dummyUser.name} width={220} height={220} className='rounded-full mx-auto' />
        <h3 className='text-2xl font-bold mt-4'>{dummyUser.name}</h3>
        <p className='text-lg text-gray-600'>@{dummyUser.username}</p>
        <p className='mt-2 text-gray-500'>{dummyUser.bio}</p>
      </div>
      <section className='container mx-auto px-4 py-8'>
            <h2 className='text-2xl font-bold text-center mb-6'>Explore Startups</h2>
            <ul className='mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {dummyPosts.length > 0 ? (
                dummyPosts.map((post) => (
                  <li key={post._id} className='startup-card group bg-white shadow-md rounded-lg p-4'>
                    <div className='flex justify-between'>
                      <p className='text-gray-500'>{new Date(post.createdAt).toLocaleDateString()}</p>
                      <div className='flex items-center gap-2'>
                        <span className='text-16-medium'>{post.views}</span>
                        <EyeIcon className='size-6 text-primary'/>
                      </div>
                    </div>
                    <div className='flex items-center gap-4 mt-4'>
                      <Image src={post.author.image} alt={post.author.name} width={48} height={48} className='rounded-full'/>
                      <p className='font-medium'>{post.author.name}</p>
                    </div>
                    <h3 className='text-xl font-semibold mt-2'>{post.title}</h3>
                    <p className='text-gray-700 mt-2'>{post.description}</p>
                    <Image src={post.image} alt={post.title} width={300} height={200} className='rounded-md mt-2'/>
                    <div className='flex justify-between mt-4'>
                      <p className='text-blue-600'>{post.category}</p>
                      <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>Details</button>
                    </div>
                  </li>
                ))
              ) : (
                <p className='no-results text-center col-span-full'>No startups found</p>
              )}
            </ul>
        </section>
    </section>
  );
}

export default UserPage;
