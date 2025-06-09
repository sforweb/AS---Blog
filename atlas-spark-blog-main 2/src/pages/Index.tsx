
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FeaturedPosts from '../components/FeaturedPosts';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-tech-blue-950">
      <Header />
      <main>
        <HeroSection />
        <FeaturedPosts />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
