'use client';
import React from 'react'
import { Input } from '../ui/input'
import { useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState, useEffect } from 'react';

const NavSearch = () => {
  const searchParams = useSearchParams();
  const {replace} = useRouter();
  const [search, setSearch] = useState(searchParams.get('search')?.toString() || '');


  //Here I am handling search using built-in methods like URLSearchParams
  // and using params value
  const handleSearch = useDebouncedCallback((value: string) =>{
    const params = new URLSearchParams(searchParams);
    if(value){
      params.set('search', value);
    }
    else{
      params.delete('search');
    }
    replace(`/products?${params.toString()}`);
  }, 300)

  //Here I created the useEffect because after completing search we need to clear and set the Search empty
  useEffect(()=>{
    if(!searchParams.get('search')){
      setSearch('');
    }
  }, [searchParams.get('search')])


  return (
    <Input type='search' placeholder='search product...' className='w-[350px] capitalize  dark:bg-muted'
    onChange={(e)=> {setSearch(e.target.value); handleSearch(e.target.value)}} />
  )
}

export default NavSearch