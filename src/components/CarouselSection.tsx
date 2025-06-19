
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'framer-motion';

const CarouselSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const slides = [
    {
      title: "Digital Innovation",
      subtitle: "Pioneering the Future",
      description: "Revolutionary digital solutions that transform businesses and create unprecedented user experiences.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      gradient: "from-cyan-500 to-blue-600"
    },
    {
      title: "Creative Excellence",
      subtitle: "Where Art Meets Technology",
      description: "Stunning visual designs powered by cutting-edge technology and creative brilliance.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      title: "Future-Ready Solutions",
      subtitle: "Building Tomorrow Today",
      description: "Next-generation platforms that adapt, evolve, and scale with your growing business needs.",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      gradient: "from-indigo-500 to-purple-600"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        nextSlide();
      }
    }, 6000);
    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide, isTransitioning]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    // 3D cube transition effect
    gsap.to(carouselRef.current, {
      duration: 0.8,
      rotationY: -90,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        gsap.set(carouselRef.current, { rotationY: 90 });
        gsap.to(carouselRef.current, {
          duration: 0.8,
          rotationY: 0,
          ease: "power2.inOut",
          onComplete: () => setIsTransitioning(false)
        });
      }
    });
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    
    gsap.to(carouselRef.current, {
      duration: 0.8,
      rotationY: 90,
      ease: "power2.inOut",
      onComplete: () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
        gsap.set(carouselRef.current, { rotationY: -90 });
        gsap.to(carouselRef.current, {
          duration: 0.8,
          rotationY: 0,
          ease: "power2.inOut",
          onComplete: () => setIsTransitioning(false)
        });
      }
    });
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-30"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            Our <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Expertise</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Discover how we transform ideas into extraordinary digital experiences
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto perspective-1000">
          <div 
            ref={carouselRef}
            className="relative h-[600px] rounded-3xl overflow-hidden transform-gpu"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 1.2, rotateY: -45 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].gradient} opacity-90`}></div>
                <img 
                  src={slides[currentSlide].image} 
                  alt={slides[currentSlide].title}
                  className="w-full h-full object-cover"
                />
                
                {/* Layered parallax content */}
                <div className="absolute inset-0 flex items-center justify-center text-center p-8">
                  <div className="max-w-3xl">
                    <motion.div 
                      className="mb-4"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3, duration: 0.6 }}
                    >
                      <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium">
                        {slides[currentSlide].subtitle}
                      </span>
                    </motion.div>
                    
                    <motion.h3 
                      className="text-5xl md:text-7xl font-bold text-white mb-6"
                      initial={{ opacity: 0, y: 50, rotateX: -15 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    >
                      {slides[currentSlide].title}
                    </motion.h3>
                    
                    <motion.p 
                      className="text-xl text-white/90 max-w-2xl mx-auto"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.6 }}
                    >
                      {slides[currentSlide].description}
                    </motion.p>

                    <motion.button
                      className="mt-8 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 text-white font-medium"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.9, duration: 0.5 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Explore More
                    </motion.button>
                  </div>
                </div>

                {/* Floating geometric shapes */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-4 h-4 bg-white/30 rounded-full"
                    animate={{
                      x: [0, Math.sin(i) * 30],
                      y: [0, Math.cos(i) * 30],
                      opacity: [0.3, 0.8, 0.3],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${20 + i * 10}%`,
                    }}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Enhanced navigation with magnetic effect */}
          <motion.button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            disabled={isTransitioning}
          >
            <ChevronLeft size={24} />
          </motion.button>
          
          <motion.button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            disabled={isTransitioning}
          >
            <ChevronRight size={24} />
          </motion.button>

          {/* Enhanced indicators with progress animation */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {slides.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  if (!isTransitioning && index !== currentSlide) {
                    setCurrentSlide(index);
                  }
                }}
                className="relative w-12 h-3 rounded-full overflow-hidden"
                whileHover={{ scale: 1.1 }}
              >
                <div className="absolute inset-0 bg-white/40 rounded-full"></div>
                <motion.div
                  className="absolute inset-0 bg-white rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: index === currentSlide ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0 }}
                />
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

export default CarouselSection;
