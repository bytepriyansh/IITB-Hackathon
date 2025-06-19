
import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { gsap } from 'gsap';

const CardsSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const cards = [
    {
      title: "Web Development",
      description: "Cutting-edge websites built with the latest technologies and frameworks for optimal performance.",
      icon: "💻",
      gradient: "from-blue-500 to-cyan-500",
      delay: "0s",
      particles: 8
    },
    {
      title: "Mobile Apps", 
      description: "Native and cross-platform mobile applications that deliver exceptional user experiences.",
      icon: "📱",
      gradient: "from-purple-500 to-pink-500",
      delay: "0.1s",
      particles: 6
    },
    {
      title: "UI/UX Design",
      description: "Beautiful, intuitive designs that captivate users and drive engagement and conversions.",
      icon: "🎨",
      gradient: "from-green-500 to-teal-500",
      delay: "0.2s",
      particles: 10
    },
    {
      title: "Brand Identity",
      description: "Comprehensive branding solutions that establish strong, memorable brand presence.",
      icon: "🚀",
      gradient: "from-orange-500 to-red-500",
      delay: "0.3s",
      particles: 7
    },
    {
      title: "E-commerce",
      description: "Powerful online stores with advanced features for seamless shopping experiences.",
      icon: "🛒",
      gradient: "from-indigo-500 to-purple-500",
      delay: "0.4s",
      particles: 9
    },
    {
      title: "Digital Marketing",
      description: "Strategic marketing campaigns that maximize reach, engagement, and conversion rates.",
      icon: "📈",
      gradient: "from-pink-500 to-rose-500",
      delay: "0.5s",
      particles: 5
    }
  ];

  useEffect(() => {
    const cardElements = sectionRef.current?.querySelectorAll('.service-card');
    if (cardElements) {
      gsap.fromTo(cardElements, 
        { 
          y: 100, 
          opacity: 0, 
          rotationX: -15,
          scale: 0.8
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  const handleCardClick = (index: number) => {
    if (expandedCard === index) {
      setExpandedCard(null);
    } else {
      setExpandedCard(index);
    }
  };

  return (
    <section ref={sectionRef} className="py-20 relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 bg-gradient-to-r from-cyan-400/30 to-purple-500/30 rounded-full blur-2xl"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
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
            Our <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Comprehensive digital solutions tailored to elevate your business to new heights
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              className="service-card group relative"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick(index)}
              layout
            >
              {/* Main card container */}
              <motion.div 
                className="relative h-80 cursor-pointer perspective-1000"
                whileHover={{ 
                  scale: 1.05,
                  rotateY: hoveredCard === index ? 5 : 0,
                  rotateX: hoveredCard === index ? 5 : 0
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="relative w-full h-full transform-style-preserve-3d">
                  
                  {/* Card front */}
                  <motion.div 
                    className="absolute inset-0 w-full h-full backface-hidden"
                    animate={{
                      rotateY: expandedCard === index ? 180 : 0
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 relative overflow-hidden">
                      
                      {/* Gradient background with animation */}
                      <motion.div 
                        className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0`}
                        animate={{ 
                          opacity: hoveredCard === index ? 0.2 : 0,
                          scale: hoveredCard === index ? 1.1 : 1
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      
                      {/* Particle effects */}
                      {hoveredCard === index && (
                        <div className="absolute inset-0">
                          {[...Array(card.particles)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1 h-1 bg-white rounded-full"
                              initial={{ 
                                x: Math.random() * 100 + '%',
                                y: Math.random() * 100 + '%',
                                opacity: 0,
                                scale: 0
                              }}
                              animate={{
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0],
                                y: [null, '-50px']
                              }}
                              transition={{
                                duration: 1.5,
                                delay: Math.random() * 0.5,
                                repeat: Infinity
                              }}
                            />
                          ))}
                        </div>
                      )}
                      
                      {/* Ripple effect */}
                      <motion.div 
                        className="absolute inset-0 rounded-2xl overflow-hidden"
                        animate={{
                          background: hoveredCard === index 
                            ? 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)'
                            : 'transparent'
                        }}
                      />
                      
                      <div className="relative z-10">
                        {/* Animated icon */}
                        <motion.div 
                          className="text-4xl mb-6"
                          animate={{
                            scale: hoveredCard === index ? 1.2 : 1,
                            rotate: hoveredCard === index ? 12 : 0,
                            y: hoveredCard === index ? -5 : 0
                          }}
                          transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                          {card.icon}
                        </motion.div>
                        
                        {/* Title with gradient animation */}
                        <motion.h3 
                          className="text-2xl font-bold text-white mb-4 transition-all duration-500"
                          animate={{
                            backgroundImage: hoveredCard === index 
                              ? 'linear-gradient(45deg, #00f5ff, #8b5cf6)'
                              : 'none',
                            backgroundClip: hoveredCard === index ? 'text' : 'border-box',
                            color: hoveredCard === index ? 'transparent' : '#ffffff'
                          }}
                        >
                          {card.title}
                        </motion.h3>
                        
                        <motion.p 
                          className="text-white/70 transition-colors duration-500"
                          animate={{
                            color: hoveredCard === index ? '#ffffff' : 'rgba(255,255,255,0.7)'
                          }}
                        >
                          {card.description}
                        </motion.p>
                        
                        {/* Animated accent */}
                        <motion.div 
                          className={`absolute bottom-4 right-4 w-8 h-8 bg-gradient-to-r ${card.gradient} rounded-full`}
                          animate={{
                            opacity: hoveredCard === index ? 1 : 0,
                            scale: hoveredCard === index ? 1 : 0,
                            rotate: hoveredCard === index ? 180 : 0
                          }}
                          transition={{ duration: 0.3, delay: 0.1 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Card back (expanded view) */}
                  <motion.div 
                    className="absolute inset-0 w-full h-full backface-hidden rotate-y-180"
                    animate={{
                      rotateY: expandedCard === index ? 0 : -180
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className={`h-full bg-gradient-to-br ${card.gradient} rounded-2xl p-8 relative overflow-hidden`}>
                      <div className="relative z-10 text-white h-full flex flex-col justify-center items-center text-center">
                        <motion.div 
                          className="text-6xl mb-6"
                          animate={{
                            rotateY: [0, 360],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          {card.icon}
                        </motion.div>
                        
                        <h3 className="text-3xl font-bold mb-4">{card.title}</h3>
                        <p className="text-white/90 mb-6">{card.description}</p>
                        
                        <motion.button 
                          className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Learn More
                        </motion.button>
                      </div>
                      
                      {/* Background particles */}
                      {[...Array(12)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-white/30 rounded-full"
                          animate={{
                            x: [0, Math.random() * 40 - 20],
                            y: [0, Math.random() * 40 - 20],
                            opacity: [0.3, 0.8, 0.3],
                            scale: [1, 1.5, 1]
                          }}
                          transition={{
                            duration: 3 + Math.random() * 2,
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
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </section>
  );
};

export default CardsSection;
