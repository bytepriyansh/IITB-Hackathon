
import React, { useEffect, useState } from 'react';

const FeaturesServices = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  const features = [
    {
      icon: "🚀",
      title: "Lightning Fast",
      description: "Optimized performance for blazing fast load times",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: "🎨",
      title: "Pixel Perfect",
      description: "Meticulous attention to every design detail",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: "📱",
      title: "Responsive Design",
      description: "Perfect across all devices and screen sizes",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: "🔒",
      title: "Secure & Reliable",
      description: "Enterprise-grade security and reliability",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: "⚡",
      title: "Real-time Updates",
      description: "Live data synchronization and updates",
      color: "from-indigo-500 to-purple-500"
    },
    {
      icon: "🌟",
      title: "Premium Support",
      description: "24/7 dedicated support and maintenance",
      color: "from-pink-500 to-rose-500"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems(prev => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.feature-item');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-64 h-64 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6">
            Why Choose <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Us</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            We combine cutting-edge technology with exceptional design to deliver unparalleled results
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              data-index={index}
              className={`feature-item group relative transform transition-all duration-1000 ${
                visibleItems.includes(index) 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Floating animation container */}
              <div className="relative animate-bounce" style={{ animationDelay: `${index * 0.5}s`, animationDuration: '3s' }}>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 relative overflow-hidden group-hover:scale-105 transition-all duration-500">
                  
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                  
                  {/* Ripple effect */}
                  <div className="absolute inset-0 rounded-3xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </div>
                  
                  {/* Glowing border effect */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    {/* Animated icon */}
                    <div className="text-6xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
                      <span className="inline-block animate-pulse">
                        {feature.icon}
                      </span>
                    </div>
                    
                    {/* Title with gradient effect */}
                    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-500 group-hover:bg-clip-text transition-all duration-500">
                      {feature.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-white/70 group-hover:text-white transition-colors duration-500">
                      {feature.description}
                    </p>
                    
                    {/* Animated accent dot */}
                    <div className={`absolute top-4 right-4 w-3 h-3 bg-gradient-to-r ${feature.color} rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-ping`}></div>
                  </div>
                  
                  {/* Corner accent */}
                  <div className={`absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl ${feature.color} opacity-10 group-hover:opacity-30 transition-opacity duration-500`}></div>
                </div>
              </div>
              
              {/* Shadow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-20 blur-2xl transform translate-y-8 transition-all duration-500 rounded-3xl`}></div>
            </div>
          ))}
        </div>

       
      </div>
    </section>
  );
};

export default FeaturesServices;
