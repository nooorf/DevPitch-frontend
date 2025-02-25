"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

function Navbar() {
  const [isuserlogged, setIsuserlogged] = useState(true);
  return (
    <>
      <section className='flex justify-between items-center bg-gray-200 px-2'>
        <div className='flex items-center gap-2 min-h-16'>
          <h1 className='text-3xl'>DevPitch</h1>
        </div>
        {isuserlogged ? (
          <ul className='flex list-none gap-2'>
            <li><button className='bg-blue-500 text-white px-4 py-2 rounded-md'>Create Post</button></li>
            <li><button className='bg-blue-500 text-white px-4 py-2 rounded-md'>Log Out</button></li>
          </ul>
        ) : (
          <ul className='flex list-none gap-2'>
            <li><button className='bg-blue-500 text-white px-4 py-2 rounded-md'>Sign Up</button></li>
            <li><button className='bg-blue-500 text-white px-4 py-2 rounded-md'>Log In</button></li>
          </ul>
        )}
      </section>
    </>
  );
}

export default Navbar;
