import React from 'react'
import Form from 'next/form'
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
            
            <button type="submit" className='search-btn text-white'>
                <Search className='size-5'/>
            </button>
        </div>
        
   </Form>
  )
}

export default SearchForm