
import React, { useState, useEffect } from 'react';
import AnimatedLoader from '../components/AnimatedLoader';
import Hero from '../components/Hero';
import CarouselSection from '../components/CarouselSection';
import CardsSection from '../components/CardsSection';
import CustomersSection from '../components/CustomersSection';
import FeaturesServices from '../components/FeaturesServices';
import GraphsSection from '../components/GraphsSection';
import ShowcaseWork from '../components/ShowcaseWork';
import StrikingAnimations from '../components/StrikingAnimations';
import ParallaxSection from '../components/ParallaxSection';
import Navbar from '../components/Navbar';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <AnimatedLoader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
      <Navbar />
      <Hero />
      <ParallaxSection />
      <CarouselSection />
      <CardsSection />
      <CustomersSection />
      <FeaturesServices />
      <GraphsSection />
      <ShowcaseWork />
      <StrikingAnimations />
    </div>
  );
};

export default Index;
