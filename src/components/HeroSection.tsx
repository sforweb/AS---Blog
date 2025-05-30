
import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const HeroSection = () => {
  const [email, setEmail] = useState('');

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Obrigado por se inscrever!",
        description: "Você receberá nossas últimas histórias em breve.",
      });
      setEmail('');
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-white dark:bg-hero-gradient overflow-hidden">
      {/* Background Pattern com efeitos interativos */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-tech-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse-tech transition-transform duration-500 hover:scale-110 hover:blur-2xl cursor-pointer"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-tech-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse-tech delay-1000 transition-transform duration-500 hover:scale-110 hover:blur-2xl cursor-pointer"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-tech-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-30 transition-transform duration-700 hover:scale-125 hover:opacity-40 cursor-pointer"></div>
      </div>

      <div className="relative z-10 w-full text-center px-4 sm:px-6 lg:px-8">
        {/* Logo/Symbol */}
        <div className="mb-8 animate-fade-in">
          <div className="w-24 h-24 mx-auto bg-tech-gradient rounded-2xl flex items-center justify-center shadow-2xl shadow-tech-blue-500/25">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
              <div className="w-12 h-12 bg-gradient-to-br from-tech-blue-400 to-tech-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <div className="relative">
                  <div className="w-8 h-1 bg-white rounded-full"></div>
                  <div className="w-6 h-1 bg-white/70 rounded-full mt-1"></div>
                  <div className="w-4 h-1 bg-white/40 rounded-full mt-1"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-7xl font-lora font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">
          Atlas Collective
        </h1>

        {/* Subtitle */}
        <div className="max-w-2xl mx-auto">
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-200 mb-12 leading-relaxed animate-fade-in">
            Somos uma comunidade de viajantes, contadores de histórias e buscadores de cultura, 
            compartilhando relatos e inspirando outros a explorar os cantos inexplorados do mundo.
          </p>
        </div>

        {/* Email Signup */}
        <div className="w-full max-w-md mx-auto animate-fade-in">
          <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Seu melhor e-mail"
                className="w-full px-6 py-4 text-gray-900 bg-white/95 dark:bg-white/10 dark:text-white border border-gray-300 dark:border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-tech-blue-500 focus:border-transparent placeholder-gray-500 dark:placeholder-gray-300 backdrop-blur-sm"
                required
              />
            </div>
            <button
              type="submit"
              className="px-8 py-4 bg-tech-blue-500 hover:bg-tech-blue-600 text-white font-semibold rounded-2xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-tech-blue-500/25 flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Receber
            </button>
          </form>
          <p className="text-sm text-gray-500 dark:text-gray-300 mt-4">
            Histórias inspiradoras direto na sua caixa de entrada. Sem spam.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
