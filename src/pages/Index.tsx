
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import FeaturedPosts from '../components/FeaturedPosts';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-tech-blue-950">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <FeaturedPosts />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
