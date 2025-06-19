
import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const magneticButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Magnetic button effect
      if (magneticButtonRef.current) {
        const button = magneticButtonRef.current;
        const rect = button.getBoundingClientRect();
        const buttonCenterX = rect.left + rect.width / 2;
        const buttonCenterY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(e.clientX - buttonCenterX, 2) + Math.pow(e.clientY - buttonCenterY, 2)
        );
        
        if (distance < 100) {
          const pullStrength = (100 - distance) / 100;
          const pullX = (e.clientX - buttonCenterX) * pullStrength * 0.3;
          const pullY = (e.clientY - buttonCenterY) * pullStrength * 0.3;
          
          gsap.to(button, {
            duration: 0.3,
            x: pullX,
            y: pullY,
            scale: 1.05,
            ease: "power2.out"
          });
        } else {
          gsap.to(button, {
            duration: 0.5,
            x: 0,
            y: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)"
          });
        }
      }

      // Parallax effect for floating elements
      const elements = document.querySelectorAll('.parallax-float');
      elements.forEach((element, index) => {
        const speed = (index + 1) * 0.02;
        const x = (e.clientX - window.innerWidth / 2) * speed;
        const y = (e.clientY - window.innerHeight / 2) * speed;
        gsap.to(element, {
          duration: 1,
          x: x,
          y: y,
          ease: "power2.out"
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Animate floating particles
    const particles = document.querySelectorAll('.hero-particle');
    particles.forEach((particle, i) => {
      gsap.to(particle, {
        duration: 3 + Math.random() * 2,
        rotation: 360,
        repeat: -1,
        ease: "none",
        delay: i * 0.2
      });
    });

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const letterVariants = {
    initial: { y: 100, opacity: 0, rotateX: -90 },
    animate: { y: 0, opacity: 1, rotateX: 0 }
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced animated background with morphing blobs */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-full blur-3xl animate-blob"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
        
        <div className="absolute inset-0 opacity-30">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle hero-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Enhanced cursor follower with trail effect */}
      <div
        ref={cursorRef}
        className="fixed w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-30 pointer-events-none z-30 mix-blend-difference"
        style={{
          left: mousePosition.x - 24,
          top: mousePosition.y - 24,
          transition: 'transform 0.1s ease-out',
          filter: 'blur(8px)'
        }}
      />
      
      {/* Cursor trail particles */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="fixed w-2 h-2 bg-cyan-400 rounded-full opacity-20 pointer-events-none z-20"
          style={{
            left: mousePosition.x - 4,
            top: mousePosition.y - 4,
            transition: `all ${0.1 + i * 0.05}s ease-out`,
            transform: `scale(${1 - i * 0.2})`
          }}
        />
      ))}

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        {/* Enhanced title with letter-by-letter animation */}
        <motion.h1 
          className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight"
          initial="initial"
          animate="animate"
        >
          <motion.div className="overflow-hidden">
            <motion.span 
              className="inline-block"
              variants={letterVariants}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              CREATE
            </motion.span>
          </motion.div>
          <br />
          <motion.div className="overflow-hidden">
            <motion.span 
              className="inline-block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
              variants={letterVariants}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              EXTRAORDINARY
            </motion.span>
          </motion.div>
          <br />
          <motion.div className="overflow-hidden">
            <motion.span 
              className="inline-block"
              variants={letterVariants}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              EXPERIENCES
            </motion.span>
          </motion.div>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          We craft digital experiences that push the boundaries of what's possible, 
          blending innovation with stunning visual design.
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {/* Magnetic button with ripple effect */}
          <button 
            ref={magneticButtonRef}
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25"
            onClick={(e) => {
              // Ripple effect
              const button = e.currentTarget;
              const rect = button.getBoundingClientRect();
              const ripple = document.createElement('div');
              const size = Math.max(rect.width, rect.height);
              const x = e.clientX - rect.left - size / 2;
              const y = e.clientY - rect.top - size / 2;
              
              ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
              `;
              
              button.appendChild(ripple);
              setTimeout(() => ripple.remove(), 600);
            }}
          >
            <span className="relative z-10">Start Your Journey</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <motion.button 
            className="group px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:border-white/60 transition-all duration-300 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="group-hover:text-cyan-400 transition-colors duration-300">View Our Work</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Enhanced floating elements with parallax */}
      <div className="parallax-float absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full opacity-20 animate-float"></div>
      <div className="parallax-float absolute bottom-32 right-16 w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="parallax-float absolute top-1/2 left-20 w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        
        @keyframes ripple {
          to { transform: scale(4); opacity: 0; }
        }
        
        .animate-blob { animation: blob 12s infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default Hero;
