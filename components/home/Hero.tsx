import React from 'react'
import HeroCarousel from './HeroCarousel'
import { Button } from '../ui/button'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className='grid grid-cols-1 lg:grid-cols-2 gap-24 items-center'>
      <div>
        <h1 className='max-w-2xl font-bold text-4xl tracking-tight sm:text-6xl'>
          The Ultimate College Shopping Experience.
        </h1>

        <p className='mt-8 max-w-xl text-lg leading-8 text-muted-foreground'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab debitis expedita maiores quaerat ducimus blanditiis neque sed, praesentium molestias. Illum, fugiat. Odio possimus minus earum asperiores est, dolores harum aliquam?
        </p>

        <Button asChild size={'lg'} className='mt-10'>
          <Link href={'/products'}>Our products</Link>
        </Button>
      </div>

      <HeroCarousel/>
    </section>
  )
}

export default Hero