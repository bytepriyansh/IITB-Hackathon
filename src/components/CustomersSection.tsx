import React, { useEffect, useRef, useState } from 'react';

const UltimateTestimonialsSection = () => {
  const sectionRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCard, setActiveCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "Priyansh Narang",
      role: "CEO, TechCorp",
      content: "Absolutely revolutionary! They transformed our digital presence beyond our wildest dreams. The results speak for themselves.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      company: "TechCorp",
      gradient: "from-purple-500 via-pink-500 to-red-500",
      glowColor: "purple",
      achievement: "500% Growth"
    },
    {
      id: 2,
      name: "Shashank Kumar",
      role: "Founder, StartupXYZ",
      content: "The most innovative team we've ever worked with. Results exceeded all expectations and delivered beyond imagination.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      company: "StartupXYZ",
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      glowColor: "cyan",
      achievement: "10M+ Users"
    },
    {
      id: 3,
      name: "Shruti Sharma",
      role: "CMO, Global Inc",
      content: "Outstanding creativity and technical expertise. A game-changing partnership that revolutionized our entire approach.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=150&h=150&fit=crop&crop=face",
      company: "Global Inc",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      glowColor: "emerald",
      achievement: "300% ROI"
    },
    {
      id: 4,
      name: "Shivam Patel",
      role: "CTO, Innovation Labs",
      content: "Exceptional work quality and seamless collaboration. Stunning precision, creativity, and technical mastery combined.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
      company: "Innovation Labs",
      gradient: "from-orange-500 via-red-500 to-pink-500",
      glowColor: "orange",
      achievement: "Award Winner"
    },
    {
      id: 5,
      name: "Arjun Singh",
      role: "Product Lead, FutureTech",
      content: "Mind-blowing results and cutting-edge solutions. They didn't just meet expectations - they redefined what's possible.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      company: "FutureTech",
      gradient: "from-indigo-500 via-purple-500 to-pink-500",
      glowColor: "indigo",
      achievement: "Industry Leader"
    },
    {
      id: 6,
      name: "Ananya Gupta",
      role: "Director, NextGen Solutions",
      content: "Absolutely phenomenal work! The level of innovation and attention to detail exceeded every single expectation we had.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      company: "NextGen Solutions",
      gradient: "from-rose-500 via-pink-500 to-purple-500",
      glowColor: "rose",
      achievement: "Top Performer"
    }
  ];

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Generate floating particles
  const generateParticles = () => {
    return [...Array(50)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-pulse"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 2}s`,
          transform: `translate(${Math.sin(Date.now() * 0.001 + i) * 20}px, ${Math.cos(Date.now() * 0.001 + i) * 20}px)`
        }}
      />
    ));
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        {/* Dynamic gradient orbs */}
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(147,51,234,0.4) 0%, rgba(59,130,246,0.2) 100%)',
            left: `${20 + Math.sin(Date.now() * 0.001) * 10}%`,
            top: `${20 + Math.cos(Date.now() * 0.001) * 10}%`,
            animationDuration: '4s'
          }}
        />
        <div
          className="absolute w-80 h-80 rounded-full blur-3xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(34,197,94,0.4) 0%, rgba(59,130,246,0.2) 100%)',
            right: `${20 + Math.sin(Date.now() * 0.0015) * 15}%`,
            top: `${40 + Math.cos(Date.now() * 0.0015) * 15}%`,
            animationDelay: '2s',
            animationDuration: '5s'
          }}
        />
        <div
          className="absolute w-72 h-72 rounded-full blur-3xl animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(236,72,153,0.4) 0%, rgba(168,85,247,0.2) 100%)',
            left: `${60 + Math.sin(Date.now() * 0.0008) * 20}%`,
            bottom: `${20 + Math.cos(Date.now() * 0.0008) * 10}%`,
            animationDelay: '1s',
            animationDuration: '6s'
          }}
        />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {generateParticles()}
      </div>

      {/* Mouse follower effect */}
      <div
        className="fixed w-32 h-32 pointer-events-none z-10 mix-blend-screen"
        style={{
          left: mousePosition.x - 64,
          top: mousePosition.y - 64,
          background: 'radial-gradient(circle, rgba(147,51,234,0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(20px)',
          transition: 'all 0.1s ease-out'
        }}
      />

      <div className="container mx-auto px-6 relative z-20">
        {/* Hero Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-purple-300 text-sm font-medium border border-purple-400/30">
              ⭐ 5.0 Rating • 1000+ Happy Clients
            </span>
          </div>

          <h2 className={`text-6xl md:text-8xl font-black text-white mb-8 leading-tight transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              LEGENDARY
            </span>
            <br />
            <span className="text-white/90">TESTIMONIALS</span>
          </h2>

          <p className={`text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Join thousands of industry leaders who've transformed their businesses with our revolutionary solutions
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`group relative transform transition-all duration-700 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
              style={{
                transitionDelay: `${index * 150}ms`,
                perspective: '1000px'
              }}
              onMouseEnter={() => setActiveCard(testimonial.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div className="relative p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all duration-500 h-full">
                {/* Animated border */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} style={{ padding: '2px' }}>
                  <div className="w-full h-full bg-slate-900/95 backdrop-blur-xl rounded-3xl"></div>
                </div>

                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-white/20 group-hover:border-white/50 transition-all duration-300"
                        />
                        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-300`} />
                      </div>
                      <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${testimonial.gradient} text-white`}>
                          {testimonial.achievement}
                        </span>
                      </div>
                    </div>

                    {/* Rating Stars */}
                    <div className="flex space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span
                          key={i}
                          className="text-yellow-400 text-lg animate-pulse"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quote */}
                  <blockquote className="text-gray-200 text-lg leading-relaxed mb-6 font-light italic">
                    <span className="text-4xl text-purple-400 leading-none">"</span>
                    {testimonial.content}
                    <span className="text-4xl text-purple-400 leading-none">"</span>
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-bold text-lg mb-1">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                      <p className="text-purple-300 text-xs font-medium mt-1">{testimonial.company}</p>
                    </div>

                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${testimonial.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <span className="text-white font-bold text-lg">✓</span>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                </div>
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ animationDelay: '0.5s' }}>
                  <div className="w-1 h-1 bg-purple-400 rounded-full animate-ping" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <button className="group relative px-12 py-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-bold text-lg rounded-full overflow-hidden hover:scale-105 transition-all duration-300">
            <span className="relative z-10">Join Our Success Stories</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default UltimateTestimonialsSection;