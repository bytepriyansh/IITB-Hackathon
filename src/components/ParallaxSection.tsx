import React, { useEffect, useState, useRef } from 'react';

const ParallaxSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        setMouseX((e.clientX - centerX) / rect.width);
        setMouseY((e.clientY - centerY) / rect.height);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Generate floating elements with different properties
  const generateFloatingElements = (count, type) => {
    return [...Array(count)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 100 + 50,
      opacity: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.5 + 0.1,
      direction: Math.random() * 360,
      type
    }));
  };

  const backgroundShapes = generateFloatingElements(15, 'bg');
  const midgroundShapes = generateFloatingElements(10, 'mid');
  const foregroundShapes = generateFloatingElements(8, 'fg');
  const particles = generateFloatingElements(25, 'particle');

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden cursor-none"
      style={{ perspective: '1000px' }}
    >
      <div
        className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900"
        style={{
          transform: `
            translateY(${scrollY * 0.05}px) 
            translateX(${mouseX * 10}px)
            scale(${1 + Math.abs(mouseY) * 0.02})
          `,
          filter: 'blur(0.5px)'
        }}
      />

      {/* Animated Background Gradient Overlay */}
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background: `
            radial-gradient(circle at ${50 + mouseX * 20}% ${50 + mouseY * 20}%, 
            rgba(139, 92, 246, 0.3) 0%, 
            rgba(59, 130, 246, 0.2) 30%, 
            transparent 70%)
          `,
          transform: `translateY(${scrollY * 0.08}px)`
        }}
      />

      {/* Background Floating Shapes Layer */}
      <div
        className="absolute inset-0"
        style={{
          transform: `
            translateY(${scrollY * 0.1}px) 
            translateX(${mouseX * 15}px)
          `
        }}
      >
        {backgroundShapes.map((shape) => (
          <div
            key={`bg-${shape.id}`}
            className="absolute rounded-full bg-gradient-to-r from-cyan-400/10 to-purple-500/10 blur-2xl animate-pulse"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              opacity: shape.opacity,
              animationDelay: `${shape.id * 0.3}s`,
              animationDuration: `${3 + shape.speed * 2}s`,
              transform: `
                translateY(${Math.sin(Date.now() * 0.001 + shape.id) * 20}px)
                translateX(${Math.cos(Date.now() * 0.001 + shape.id) * 15}px)
                rotate(${scrollY * 0.02 + shape.direction}deg)
              `
            }}
          />
        ))}
      </div>

      {/* Midground Geometric Shapes */}
      <div
        className="absolute inset-0"
        style={{
          transform: `
            translateY(${scrollY * 0.15}px) 
            translateX(${mouseX * 25}px)
            rotateX(${mouseY * 5}deg)
          `
        }}
      >
        {midgroundShapes.map((shape) => (
          <div
            key={`mid-${shape.id}`}
            className="absolute border-2 border-gradient-to-r from-cyan-400/20 to-purple-400/20"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: `${shape.size * 0.6}px`,
              height: `${shape.size * 0.6}px`,
              opacity: shape.opacity + 0.1,
              borderColor: shape.id % 3 === 0 ? 'rgba(34, 211, 238, 0.3)' :
                shape.id % 3 === 1 ? 'rgba(168, 85, 247, 0.3)' :
                  'rgba(236, 72, 153, 0.3)',
              borderRadius: shape.id % 2 === 0 ? '50%' : '0%',
              filter: 'blur(0.5px)',
              transform: `
                translateY(${Math.sin(Date.now() * 0.002 + shape.id) * 30}px)
                translateX(${Math.cos(Date.now() * 0.0015 + shape.id) * 25}px)
                rotate(${scrollY * 0.05 + Date.now() * 0.001 + shape.direction}deg)
                scale(${1 + Math.sin(Date.now() * 0.001 + shape.id) * 0.1})
              `
            }}
          />
        ))}
      </div>

      {/* Central Content - Medium Speed */}
      <div
        className="absolute inset-0 flex items-center justify-center z-10"
        style={{
          transform: `
            translateY(${scrollY * 0.08}px) 
            translateX(${mouseX * -10}px)
            rotateY(${mouseX * 2}deg)
            rotateX(${mouseY * -2}deg)
          `,
          transformStyle: 'preserve-3d'
        }}
      >
        <div className="text-center px-6 relative">
          {/* Main Title */}
          <h1
            className="text-7xl md:text-9xl font-black text-white mb-8 leading-none tracking-tight"
            style={{
              transform: `
                translateZ(100px)
                translateX(${mouseX * 20}px)
                rotateY(${mouseX * 3}deg)
              `,
              textShadow: '0 0 50px rgba(139, 92, 246, 0.5), 0 0 100px rgba(59, 130, 246, 0.3)'
            }}
          >
            <span
              className="inline-block animate-pulse"
              style={{
                animationDelay: '0s',
                transform: `translateY(${Math.sin(Date.now() * 0.003) * 5}px)`
              }}
            >
              ULTRA
            </span>
            <br />
            <span
              className="inline-block bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse"
              style={{
                animationDelay: '0.5s',
                transform: `translateY(${Math.cos(Date.now() * 0.003) * 5}px)`
              }}
            >
              PARALLAX
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-2xl text-white/80 max-w-3xl mx-auto font-light"
            style={{
              transform: `
                translateZ(50px)
                translateY(${scrollY * 0.02}px)
                translateX(${mouseX * -5}px)
              `,
              textShadow: '0 0 30px rgba(255, 255, 255, 0.3)'
            }}
          >
            Experience multi-dimensional depth with mouse-reactive parallax magic
          </p>
        </div>
      </div>

      {/* Foreground Floating Elements - Fastest Movement */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `
            translateY(${scrollY * 0.25}px) 
            translateX(${mouseX * 40}px)
          `
        }}
      >
        {foregroundShapes.map((shape) => (
          <div
            key={`fg-${shape.id}`}
            className="absolute bg-gradient-to-r from-white/5 to-cyan-400/20 rounded-full blur-sm"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: `${shape.size * 0.4}px`,
              height: `${shape.size * 0.4}px`,
              opacity: shape.opacity + 0.2,
              transform: `
                translateY(${Math.sin(Date.now() * 0.004 + shape.id) * 40}px)
                translateX(${Math.cos(Date.now() * 0.003 + shape.id) * 35}px)
                rotate(${scrollY * 0.1 + Date.now() * 0.002 + shape.direction}deg)
                scale(${1 + Math.sin(Date.now() * 0.002 + shape.id) * 0.2})
              `
            }}
          />
        ))}
      </div>

      {/* Particle Layer - Ultra Fast */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `
            translateY(${scrollY * 0.35}px) 
            translateX(${mouseX * 60}px)
          `
        }}
      >
        {particles.map((particle) => (
          <div
            key={`particle-${particle.id}`}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity * 0.8,
              animationDelay: `${particle.id * 0.1}s`,
              transform: `
                translateY(${Math.sin(Date.now() * 0.006 + particle.id) * 60}px)
                translateX(${Math.cos(Date.now() * 0.005 + particle.id) * 50}px)
                scale(${1 + Math.sin(Date.now() * 0.004 + particle.id) * 0.5})
              `
            }}
          />
        ))}
      </div>

      {/* Mouse Cursor Effect */}
      <div
        className="absolute pointer-events-none z-20"
        style={{
          left: '50%',
          top: '50%',
          transform: `
            translateX(${mouseX * window.innerWidth * 0.3}px)
            translateY(${mouseY * window.innerHeight * 0.3}px)
            translateX(-50%)
            translateY(-50%)
          `
        }}
      >
        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-400/10 to-purple-500/10 blur-xl animate-pulse" />
        <div className="absolute inset-0 w-16 h-16 m-auto rounded-full bg-gradient-to-r from-white/20 to-cyan-400/30 blur-md" />
      </div>

      {/* Border Glow Effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(90deg, rgba(139, 92, 246, 0.1) 0%, transparent 50%, rgba(59, 130, 246, 0.1) 100%),
            linear-gradient(0deg, rgba(236, 72, 153, 0.1) 0%, transparent 50%, rgba(34, 211, 238, 0.1) 100%)
          `,
          transform: `translateY(${scrollY * 0.03}px)`
        }}
      />
    </section>
  );
};

export default ParallaxSection;