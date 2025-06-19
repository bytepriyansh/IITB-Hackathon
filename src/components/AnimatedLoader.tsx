import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { TextPlugin } from 'gsap/TextPlugin';

// Register GSAP plugins
gsap.registerPlugin(MotionPathPlugin, TextPlugin);

const AnimatedLoader = () => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const hologramRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Main loader animation
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.5 });

    // 3D rotation and scaling
    tl.to(loaderRef.current, {
      duration: 2,
      rotationY: 360,
      rotationX: 30,
      scale: 1.3,
      ease: "power3.inOut",
      transformPerspective: 1000,
      transformOrigin: "center center"
    })
      .to(loaderRef.current, {
        duration: 1.5,
        rotationZ: 180,
        scale: 0.9,
        ease: "elastic.out(1, 0.3)"
      }, "-=0.5")
      .to(loaderRef.current, {
        duration: 1,
        rotationY: 0,
        rotationX: 0,
        rotationZ: 0,
        scale: 1,
        ease: "back.out(4)"
      });

    // Particle swarm animation with physics
    const particles = particlesRef.current?.children;
    if (particles) {
      Array.from(particles).forEach((particle, i) => {
        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 50;
        const duration = 3 + Math.random() * 3;

        gsap.to(particle, {
          duration,
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          z: (Math.random() - 0.5) * 100,
          rotation: 360,
          scale: Math.random() * 0.7 + 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.1,
          onUpdate: function () {
            // Add some randomness to the movement
            gsap.set(particle, {
              x: this.targets()[0]._gsap.x + (Math.random() - 0.5) * 10,
              y: this.targets()[0]._gsap.y + (Math.random() - 0.5) * 10
            });
          }
        });
      });
    }

    // Holographic grid animation
    const gridLines = hologramRef.current?.children;
    if (gridLines) {
      Array.from(gridLines).forEach((line, i) => {
        gsap.to(line, {
          duration: 4,
          opacity: i % 2 === 0 ? 0.3 : 0.1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.1
        });
      });
    }

    // Advanced text animation with morphing
    const text = textRef.current;
    if (text) {
      const messages = ["Loading Experience", "Initializing Systems", "Preparing Content", "Almost There"];
      let currentIndex = 0;

      gsap.to(text, {
        duration: 2,
        text: {
          value: messages[0],
          delimiter: ""
        },
        ease: "none"
      });

      setInterval(() => {
        currentIndex = (currentIndex + 1) % messages.length;
        gsap.to(text, {
          duration: 1,
          text: {
            value: messages[currentIndex],
            delimiter: ""
          },
          ease: "power2.inOut"
        });
      }, 3000);

      gsap.to(text, {
        duration: 2,
        y: -10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }

    // Background particles with depth
    const bgParticles = containerRef.current?.querySelectorAll('.bg-particle');
    if (bgParticles) {
      Array.from(bgParticles).forEach((particle, i) => {
        const size = 2 + Math.random() * 4;
        const duration = 10 + Math.random() * 20;
        const delay = Math.random() * 5;

        gsap.set(particle, {
          x: Math.random() * 100 + '%',
          y: Math.random() * 100 + '%',
          width: size,
          height: size,
          opacity: 0.3 + Math.random() * 0.7
        });

        gsap.to(particle, {
          duration,
          x: '+=100',
          y: '+=50',
          rotation: 360,
          repeat: -1,
          delay,
          ease: "none"
        });
      });
    }

    // Mouse interaction effect
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;

        gsap.to(loaderRef.current, {
          duration: 1,
          rotationY: x * 20,
          rotationX: -y * 20,
          ease: "power2.out"
        });

        if (particles) {
          Array.from(particles).forEach((particle, i) => {
            gsap.to(particle, {
              duration: 1,
              x: `+=${x * 20}`,
              y: `+=${y * 20}`,
              ease: "power2.out"
            });
          });
        }
      });
    }

    return () => {
      tl.kill();
      if (container) {
        container.removeEventListener('mousemove', () => { });
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 overflow-hidden cursor-none"
    >
      {/* 3D Background Particles */}
      {[...Array(50)].map((_, i) => (
        <div
          key={`bg-${i}`}
          className="bg-particle absolute rounded-full bg-gradient-to-r from-cyan-400/50 to-purple-500/50"
        />
      ))}

      {/* Animated holographic grid */}
      <div
        ref={hologramRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px), ' +
            'linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      >
        {[...Array(20)].map((_, i) => (
          <div
            key={`line-${i}`}
            className="absolute bg-cyan-400/20"
            style={{
              height: '1px',
              width: '100%',
              top: `${i * 5}%`,
              opacity: i % 2 === 0 ? 0.3 : 0.1
            }}
          />
        ))}
      </div>

      {/* Glowing center orb */}
      <div className="absolute w-64 h-64 rounded-full bg-cyan-400/10 blur-3xl animate-pulse"></div>

      <div className="relative z-10">
        {/* Main loader with 3D effect */}
        <div
          ref={loaderRef}
          className="relative w-40 h-40 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 shadow-lg"
          style={{
            transformStyle: 'preserve-3d',
            boxShadow: '0 0 60px rgba(0, 245, 255, 0.5)'
          }}
        >
          {/* Inner glow */}
          <div className="absolute inset-4 rounded-full bg-white/10 backdrop-blur-sm"></div>

          {/* 3D rings */}
          <div className="absolute inset-0 rounded-full border-4 border-cyan-400/30 transform translateZ(20px)"></div>
          <div className="absolute inset-2 rounded-full border-4 border-purple-500/30 transform -translateZ(10px)"></div>

          {/* Animated core */}
          <div className="absolute inset-6 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 animate-pulse"></div>

          {/* Floating particles */}
          <div ref={particlesRef} className="absolute inset-0 overflow-visible">
            {[...Array(20)].map((_, i) => (
              <div
                key={`particle-${i}`}
                className="absolute w-2 h-2 rounded-full bg-white shadow-lg"
                style={{
                  transform: 'translateZ(30px)',
                  boxShadow: '0 0 10px rgba(0, 245, 255, 0.8)'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Animated text with gradient */}
      <div
        ref={textRef}
        className="absolute bottom-20 text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-2xl font-medium tracking-wider"
        style={{
          textShadow: '0 0 10px rgba(0, 245, 255, 0.5)',
          opacity: 0.8
        }}
      ></div>

      {/* Custom cursor */}
      <div className="fixed w-8 h-8 rounded-full border-2 border-cyan-400 pointer-events-none mix-blend-difference z-50"
        style={{ transform: 'translate(-50%, -50%)' }}></div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.3; }
        }
        
        @keyframes hologram {
          0% { opacity: 0.1; }
          50% { opacity: 0.3; }
          100% { opacity: 0.1; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
        
        .animate-hologram {
          animation: hologram 4s ease-in-out infinite;
        }
        
        body {
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default AnimatedLoader;