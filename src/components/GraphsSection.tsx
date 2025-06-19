import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DataVisualizationShowcase = () => {
  const [activeTab, setActiveTab] = useState('performance');
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);

  // Performance metrics
  const performanceData = [
    { label: 'Web Development', value: 92, color: 'from-blue-500 to-cyan-500' },
    { label: 'Mobile Applications', value: 88, color: 'from-purple-500 to-pink-500' },
    { label: 'UI/UX Design', value: 95, color: 'from-green-500 to-teal-500' },
    { label: 'Brand Strategy', value: 90, color: 'from-orange-500 to-red-500' },
    { label: 'E-commerce', value: 94, color: 'from-indigo-500 to-purple-500' }
  ];

  // Project distribution (for pie chart)
  const projectDistribution = [
    { label: 'Fintech', value: 35, color: 'from-blue-500 to-cyan-500' },
    { label: 'Healthcare', value: 25, color: 'from-purple-500 to-pink-500' },
    { label: 'E-commerce', value: 20, color: 'from-green-500 to-teal-500' },
    { label: 'Education', value: 15, color: 'from-orange-500 to-red-500' },
    { label: 'Entertainment', value: 5, color: 'from-indigo-500 to-purple-500' }
  ];

  // Business metrics
  const businessMetrics = [
    { label: 'Projects Completed', value: 247, suffix: '+', color: 'text-cyan-400' },
    { label: 'Client Satisfaction', value: 98, suffix: '%', color: 'text-purple-400' },
    { label: 'Awards Won', value: 36, suffix: '+', color: 'text-green-400' },
    { label: 'Years Experience', value: 12, suffix: '+', color: 'text-orange-400' }
  ];

  // Animate counters on scroll
  useEffect(() => {
    const counters = businessMetrics.map((_, i) => ({
      value: 0,
      target: businessMetrics[i].value,
      element: countersRef.current?.children[i]?.querySelector('.counter-value')
    }));

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 60%",
      onEnter: () => {
        counters.forEach(counter => {
          if (!counter.element) return;

          gsap.to(counter, {
            value: counter.target,
            duration: 2.5,
            ease: "power3.out",
            onUpdate: () => {
              counter.element!.textContent = Math.floor(counter.value) + businessMetrics.find(m => m.value === counter.target)?.suffix;
            }
          });
        });
      }
    });

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pie chart segment angles
  const calculatePieSegments = () => {
    let cumulativeAngle = 0;
    return projectDistribution.map(item => {
      const segmentAngle = (item.value / 100) * 360;
      const startAngle = cumulativeAngle;
      cumulativeAngle += segmentAngle;

      return {
        ...item,
        startAngle,
        endAngle: cumulativeAngle,
        path: describeArc(150, 150, 120, startAngle, cumulativeAngle)
      };
    });
  };

  const pieSegments = calculatePieSegments();

  // SVG arc generator
  function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number) {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M", x, y,
      "L", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      "Z"
    ].join(" ");
  }

  function polarToCartesian(x: number, y: number, radius: number, angleInDegrees: number) {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: x + (radius * Math.cos(angleInRadians)),
      y: y + (radius * Math.sin(angleInRadians))
    };
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900"
      id="data-viz"
    >
      {/* Floating grid background */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.3 + 0.1,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Data-Driven
            </span> Excellence
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Quantifiable results that demonstrate our impact and capabilities
          </p>
        </div>

        {/* Tabs navigation */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-gray-800 rounded-full p-1.5">
            {['performance', 'distribution', 'metrics'].map((tab) => (
              <button
                key={tab}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === tab
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                  }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Performance tab */}
        {activeTab === 'performance' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Animated bar charts */}
            <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <span className="w-3 h-3 rounded-full bg-cyan-500 mr-3 animate-pulse"></span>
                Expertise Levels
              </h3>

              <div className="space-y-8">
                {performanceData.map((item, index) => (
                  <div key={index} className="group">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-300 font-medium">{item.label}</span>
                      <span className="text-cyan-400 font-bold">{item.value}%</span>
                    </div>

                    <div className="relative h-3 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${item.color} rounded-full relative overflow-hidden`}
                        style={{ width: '0%' }}
                      >
                        <div
                          id={`bar-${index}`}
                          className="absolute inset-0"
                          ref={(el) => {
                            if (el) {
                              ScrollTrigger.create({
                                trigger: el,
                                start: "top 80%",
                                onEnter: () => {
                                  gsap.to(el, {
                                    width: `${item.value}%`,
                                    duration: 1.5,
                                    delay: index * 0.1,
                                    ease: "elastic.out(1, 0.5)"
                                  });
                                }
                              });
                            }
                          }}
                        ></div>

                        {/* Animated shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Radial progress */}
            <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <span className="w-3 h-3 rounded-full bg-purple-500 mr-3 animate-pulse"></span>
                Overall Performance
              </h3>

              <div className="flex flex-col items-center">
                <div className="relative w-64 h-64 mb-8">
                  <svg className="w-full h-full" viewBox="0 0 300 300">
                    {/* Background circle */}
                    <circle
                      cx="150"
                      cy="150"
                      r="120"
                      fill="none"
                      stroke="#1e293b"
                      strokeWidth="12"
                    />

                    {/* Progress circle */}
                    <circle
                      cx="150"
                      cy="150"
                      r="120"
                      fill="none"
                      stroke="url(#progressGradient)"
                      strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray="754"
                      strokeDashoffset="754"
                      transform="rotate(-90 150 150)"
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="754"
                        to="150.8" // 754 * (1 - 0.8) for 80%
                        dur="2s"
                        begin="0.5s"
                        fill="freeze"
                        calcMode="spline"
                        keySplines="0.3 0 0.7 1"
                      />
                    </circle>

                    <defs>
                      <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#8b5cf6" />
                      </linearGradient>
                    </defs>

                    {/* Center text */}
                    <text
                      x="150"
                      y="150"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="text-4xl font-bold fill-white"
                    >
                      <tspan x="150" dy="-10">94%</tspan>
                      <tspan x="150" dy="30" className="text-sm fill-gray-400">Success Rate</tspan>
                    </text>
                  </svg>
                </div>

                <div className="text-center max-w-md">
                  <p className="text-gray-400 mb-6">
                    Our projects consistently exceed client expectations with an average satisfaction score of 9.4/10
                  </p>
                  <button className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-medium rounded-full hover:shadow-lg hover:shadow-cyan-500/20 transition-all">
                    View Case Studies
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Distribution tab */}
        {activeTab === 'distribution' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Interactive pie chart */}
            <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-3 animate-pulse"></span>
                Industry Distribution
              </h3>

              <div className="relative w-full max-w-md mx-auto">
                <svg className="w-full h-auto" viewBox="0 0 300 300">
                  {pieSegments.map((segment, index) => (
                    <path
                      key={index}
                      d={segment.path}
                      className={`cursor-pointer transition-all duration-300 ${hoveredSegment === index ? 'opacity-100' : 'opacity-90'
                        }`}
                      fill={`url(#segmentGradient${index})`}
                      onMouseEnter={() => setHoveredSegment(index)}
                      onMouseLeave={() => setHoveredSegment(null)}
                    >
                      <animate
                        attributeName="opacity"
                        from="0"
                        to="0.9"
                        dur="1s"
                        begin={`${index * 0.2}s`}
                        fill="freeze"
                      />
                    </path>
                  ))}

                  {/* Center circle */}
                  <circle cx="150" cy="150" r="60" fill="#111827" />

                  {/* Center text */}
                  <text
                    x="150"
                    y="150"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xl font-bold fill-white"
                  >
                    {hoveredSegment !== null ? (
                      <>
                        <tspan x="150" dy="-10" className="text-2xl">
                          {projectDistribution[hoveredSegment].value}%
                        </tspan>
                        <tspan x="150" dy="25" className="text-sm fill-gray-400">
                          {projectDistribution[hoveredSegment].label}
                        </tspan>
                      </>
                    ) : (
                      <>
                        <tspan x="150" dy="-10" className="text-2xl">
                          100%
                        </tspan>
                        <tspan x="150" dy="25" className="text-sm fill-gray-400">
                          Coverage
                        </tspan>
                      </>
                    )}
                  </text>

                  {/* Gradients */}
                  <defs>
                    {pieSegments.map((segment, index) => (
                      <linearGradient
                        key={index}
                        id={`segmentGradient${index}`}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor={segment.color.includes('blue') ? '#3b82f6' :
                          segment.color.includes('purple') ? '#8b5cf6' :
                            segment.color.includes('green') ? '#10b981' :
                              segment.color.includes('orange') ? '#f97316' : '#6366f1'} />
                        <stop offset="100%" stopColor={segment.color.includes('blue') ? '#06b6d4' :
                          segment.color.includes('purple') ? '#ec4899' :
                            segment.color.includes('green') ? '#14b8a6' :
                              segment.color.includes('orange') ? '#ef4444' : '#8b5cf6'} />
                      </linearGradient>
                    ))}
                  </defs>
                </svg>
              </div>
            </div>

            {/* Legend and details */}
            <div className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <span className="w-3 h-3 rounded-full bg-orange-500 mr-3 animate-pulse"></span>
                Industry Breakdown
              </h3>

              <div className="space-y-6">
                {projectDistribution.map((item, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-xl transition-all duration-300 ${hoveredSegment === index
                        ? 'bg-gray-700/50 border border-gray-600 scale-[1.02]'
                        : 'bg-gray-800/30'
                      }`}
                    onMouseEnter={() => setHoveredSegment(index)}
                    onMouseLeave={() => setHoveredSegment(null)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 bg-gradient-to-r ${item.color}`}></div>
                        <span className="text-gray-300 font-medium">{item.label}</span>
                      </div>
                      <span className="text-white font-bold">{item.value}%</span>
                    </div>

                    <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                        style={{ width: `${item.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-gray-800/50 rounded-xl border border-gray-700">
                <h4 className="text-white font-medium mb-2">Key Insight</h4>
                <p className="text-gray-400 text-sm">
                  Our diverse portfolio across multiple industries demonstrates our adaptability and
                  deep understanding of various market needs and technological challenges.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Metrics tab */}
        {activeTab === 'metrics' && (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {businessMetrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-2xl p-6 hover:scale-105 transition-all duration-500 group overflow-hidden"
                >
                  <div className="relative z-10">
                    <div className={`text-4xl md:text-5xl font-bold mb-3 ${metric.color}`}>
                      <span className="counter-value">0{metric.suffix}</span>
                    </div>
                    <div className="text-gray-400 font-medium">{metric.label}</div>
                  </div>

                  {/* Hover effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${metric.color.replace('text', 'from')} to-${metric.color.replace('text', '').split('-')[1]}-600 opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  ></div>
                </div>
              ))}
            </div>

            <div ref={countersRef} className="mt-16 bg-gray-800/50 backdrop-blur-lg border border-gray-700 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center">
                <span className="w-3 h-3 rounded-full bg-indigo-500 mr-3 animate-pulse"></span>
                Growth Timeline
              </h3>

              <div className="relative h-64">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  Interactive Growth Chart Animation (Implementation would use GSAP/Chart.js)
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DataVisualizationShowcase;