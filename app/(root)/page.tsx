import Navbar from "./components/Navbar"
import {EyeIcon} from 'lucide-react';
import Image from 'next/image';
export default async function Home() {
  
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
  
  return ( 
    <>
    {/* Hero Section */}
          <section className='flex flex-col items-center justify-center min-h-[430px] bg-gray-100 text-center'>
            <h1 className='text-4xl font-bold'>Welcome to DevPitch</h1>
            <p className='text-lg'>A platform for developers to pitch their ideas</p>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-md mt-4'>Get Started</button>
          </section>
          {/* Search Bar */}
          <section className='flex justify-center items-center h-32 bg-gray-200 gap-4'>
            <input type="text" placeholder="Search for projects" className='px-4 py-2 rounded-md w-[50%]' />
            <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>Search</button>
          </section>
          {/* Cards Section */}
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
    </>
  );
}
