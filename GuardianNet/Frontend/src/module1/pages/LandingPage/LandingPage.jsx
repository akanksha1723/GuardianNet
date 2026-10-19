import React from 'react';
import Hero from './sections/Hero';
import Stats from './sections/Stats';
import Features from './sections/Features';
import HowItWorks from './sections/HowItWorks';
import Categories from './sections/Categories';
import AIFeatures from './sections/AIFeatures';
import Testimonials from './sections/Testimonials';
import FAQ from './sections/FAQ';
import Contact from './sections/Contact';
import CTABanner from './sections/CTABanner';

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Categories />
      <AIFeatures />
      <Testimonials />
      <FAQ />
      <Contact />
      <CTABanner />
    </>
  );
}