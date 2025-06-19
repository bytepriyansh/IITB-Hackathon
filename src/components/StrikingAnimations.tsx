import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const StrikingAnimations = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer for scroll trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Main animation setup
  useEffect(() => {
    if (!isVisible) return;

    // Core elements animation
    const elements = gsap.utils.toArray('.core-element');
    elements.forEach((element: HTMLElement, index) => {
      // Initial entrance
      gsap.from(element, {
        opacity: 0,
        scale: 0.5,
        y: 50,
        rotation: 90,
        duration: 1,
        delay: index * 0.15,
        ease: "elastic.out(1, 0.5)"
      });

      // Continuous animation
      gsap.to(element, {
        y: "+=30",
        rotation: "+=45",
        duration: 3 + Math.random() * 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: index * 0.2
      });
    });

    // Floating dots animation
    const dots = gsap.utils.toArray('.floating-dot');
    dots.forEach((dot: HTMLElement, index) => {
      gsap.to(dot, {
        y: "+=40",
        x: "+=20",
        duration: 4 + Math.random() * 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: index * 0.1
      });
    });

    // Rotating lines animation
    const lines = gsap.utils.toArray('.rotating-line');
    lines.forEach((line: HTMLElement, index) => {
      gsap.to(line, {
        rotation: 360,
        duration: 8 + index * 2,
        repeat: -1,
        ease: "none"
      });
    });

    // Magnetic elements setup
    const magneticElements = gsap.utils.toArray('.magnetic-element');
    magneticElements.forEach((element: HTMLElement) => {
      element.addEventListener('mousemove', (e: MouseEvent) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        gsap.to(element, {
          x: (x - centerX) * 0.2,
          y: (y - centerY) * 0.2,
          duration: 0.5,
          ease: "power2.out"
        });
      });

      element.addEventListener('mouseleave', () => {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.3)"
        });
      });
    });

    return () => {
      // Cleanup
      magneticElements.forEach((element: HTMLElement) => {
        element.removeEventListener('mousemove', () => { });
        element.removeEventListener('mouseleave', () => { });
      });
    };
  }, [isVisible]);

  // Mouse parallax effect
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const centerX = containerRect.left + containerRect.width / 2;
    const centerY = containerRect.top + containerRect.height / 2;

    const parallaxElements = gsap.utils.toArray('.parallax-element');
    parallaxElements.forEach((element: HTMLElement) => {
      const depth = parseFloat(element.getAttribute('data-depth')) || 0.2;

      gsap.to(element, {
        x: (mousePosition.x - centerX) * depth,
        y: (mousePosition.y - centerY) * depth,
        duration: 1,
        ease: "power2.out"
      });
    });
  }, [mousePosition]);

  return (
    <section
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900"
      id="striking-section"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={`bg-line-${i}`}
            className="absolute rotating-line w-1 h-32 bg-gradient-to-b from-purple-500/50 to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transformOrigin: 'center center'
            }}
          />
        ))}
      </div>

      {/* Floating grid dots */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        {[...Array(40)].map((_, i) => (
          <div
            key={`grid-dot-${i}`}
            className="absolute floating-dot w-1 h-1 rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Mesmerizing
            </span> Visual Experience
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Interactive elements that respond to your every move
          </p>
        </div>

        {/* Main animation canvas */}
        <div className="relative h-[600px] max-w-6xl mx-auto mb-32 rounded-3xl border border-gray-800/50 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm overflow-hidden">
          {/* Core animated elements */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-12 p-12">
            {/* Center orb with pulse effect */}
            <div
              className="core-element absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 shadow-lg cursor-pointer magnetic-element"
              style={{
                boxShadow: '0 0 40px rgba(139, 92, 246, 0.5)'
              }}
            >
              <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping opacity-0"></div>
            </div>

            {/* Rotating squares */}
            <div className="core-element flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500/80 to-pink-500/80 rounded-lg shadow-lg cursor-pointer magnetic-element rotating-square"></div>
            </div>

            {/* Floating triangle */}
            <div className="core-element flex items-center justify-center">
              <div
                className="w-0 h-0 border-l-[24px] border-l-transparent border-b-[42px] border-b-cyan-400 border-r-[24px] border-r-transparent cursor-pointer magnetic-element"
                style={{ filter: 'drop-shadow(0 0 12px rgba(34, 211, 238, 0.5))' }}
              ></div>
            </div>

            {/* Bouncing circle */}
            <div className="core-element flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 shadow-lg cursor-pointer magnetic-element bouncing-circle"></div>
            </div>

            {/* Pulsing diamond */}
            <div className="core-element flex items-center justify-center">
              <div
                className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-500 cursor-pointer magnetic-element"
                style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
              ></div>
            </div>

            {/* Floating line */}
            <div className="core-element flex items-center justify-center">
              <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full shadow-lg cursor-pointer magnetic-element"></div>
            </div>

            {/* Semi-circle */}
            <div className="core-element flex items-center justify-center">
              <div
                className="w-20 h-10 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-t-full cursor-pointer magnetic-element"
                style={{ boxShadow: '0 -10px 20px rgba(16, 185, 129, 0.3))' }}
              ></div>
            </div>

            {/* Arrow */}
            <div className="core-element flex items-center justify-center">
              <div
                className="w-0 h-0 border-l-[20px] border-l-transparent border-b-[30px] border-b-purple-400 border-r-[20px] border-r-transparent cursor-pointer magnetic-element"
                style={{ filter: 'drop-shadow(0 0 8px rgba(192, 132, 252, 0.5))' }}
              ></div>
            </div>
          </div>

          {/* Floating particles that follow mouse */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <div
                key={`particle-${i}`}
                className="absolute w-2 h-2 rounded-full bg-white parallax-element"
                data-depth={0.1 + Math.random() * 0.2}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  opacity: 0.3 + Math.random() * 0.7
                }}
              />
            ))}
          </div>

          {/* Animated connecting lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
              </pattern>
            </defs>

            <rect width="100%" height="100%" fill="url(#grid)" />

            <path
              d="M20%,30% Q50%,10% 80%,30%"
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="2"
              strokeDasharray="10,5"
              className="animate-dash"
            />

            <path
              d="M30%,70% L50%,50% L70%,70%"
              fill="none"
              stroke="url(#lineGradient)"
              strokeWidth="1.5"
              strokeDasharray="8,4"
              className="animate-dash"
              style={{ animationDelay: '1s' }}
            />
          </svg>
        </div>

        {/* Interactive elements showcase */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            {
              shape: 'circle',
              color: 'from-cyan-400 to-blue-500',
              effect: 'Magnetic Pulse',
              className: 'rounded-full'
            },
            {
              shape: 'square',
              color: 'from-purple-500 to-pink-500',
              effect: '3D Rotation',
              className: 'rounded-lg'
            },
            {
              shape: 'triangle',
              color: 'from-emerald-400 to-teal-500',
              effect: 'Directional Flow',
              className: 'triangle'
            },
            {
              shape: 'diamond',
              color: 'from-amber-400 to-orange-500',
              effect: 'Prism Reflection',
              className: 'diamond'
            }
          ].map((item, index) => (
            <div
              key={index}
              className="group relative h-40 bg-gray-900/50 border border-gray-800 rounded-xl flex flex-col items-center justify-center hover:bg-gray-800/30 transition-all duration-500 cursor-pointer overflow-hidden magnetic-element"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-r ${item.color} ${item.className} shadow-lg group-hover:scale-125 transition-transform duration-300`}
                style={{
                  clipPath: item.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' :
                    item.shape === 'diamond' ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' : 'none',
                  filter: 'drop-shadow(0 0 12px currentColor)'
                }}
              />

              <div className="mt-4 text-center">
                <h4 className="text-white font-medium">{item.effect}</h4>
                <p className="text-sm text-gray-400 mt-1">{item.shape}</p>
              </div>

              {/* Hover glow */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-500`}
              />

              {/* Animated border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/10 rounded-xl transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes dash {
          to { stroke-dashoffset: -100; }
        }
        
        .animate-dash {
          animation: dash 6s linear infinite;
        }
        
        .triangle {
          width: 0;
          height: 0;
          border-left: 32px solid transparent;
          border-right: 32px solid transparent;
          border-bottom: 56px solid;
        }
        
        .diamond {
          width: 32px;
          height: 32px;
          transform: rotate(45deg);
        }
        
        .bouncing-circle {
          animation: bounce 2s ease-in-out infinite;
        }
        
        .rotating-square {
          animation: rotate 8s linear infinite;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        
        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default StrikingAnimations;