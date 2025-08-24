import Brands from '@/components/Brands'
import Features from '@/components/Features'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Integrations from '@/components/Integrations'
import Testimonial from '@/components/Testimonial'
import React from 'react'

const Page = () => {
  return (
    <div>
      <Hero />
      <Brands />
      <Features />
      <Integrations />
      <Testimonial />
      <Footer />
    </div>
  )
}

export default Page