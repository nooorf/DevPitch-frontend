import React from 'react'
import Form from 'next/form'
import FormReset from './FormReset'
import { Search } from 'lucide-react' //coming from shad-cn

//query?: string means query is optional but if its there, it should be of type string
const SearchForm = ({query}: {query?: string}) => {
  return (
   <Form action="/" scroll={false} className='search-form'>
        <input 
            type="text" 
            name="query"
            defaultValue=""
            placeholder="Search for startups"
            className='search-input' />
        
       <div className='flex gap-2'>
            {query && (
                <FormReset/> /*we could have rendered a button here but we are making this search form a server side rendered component.
                                A button and its onClick prop are client side so couldn't be used here. Instead, we created a separate component with the button using "use client" and imported it here. This way we can make
                                part of our code server side and part client side. */
            )}
            <button type="submit" className='search-btn text-white'>
                <Search className='size-5'/>
            </button>
        </div>
        
   </Form>
  )
}

export default SearchForm