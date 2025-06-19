import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Next-gen shopping experience with AI recommendations",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    color: "#3b82f6"
  },
  {
    id: 2,
    title: "Banking App",
    description: "Secure mobile banking with biometric authentication",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    color: "#8b5cf6"
  },
  {
    id: 3,
    title: "Design Portfolio",
    description: "Award-winning portfolio with stunning animations",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d",
    color: "#10b981"
  },
  {
    id: 4,
    title: "Analytics Dashboard",
    description: "Real-time data visualization for enterprises",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    color: "#f97316"
  }
];

const ScrollPortfolio = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = gsap.utils.toArray(".project-card");

    cards.forEach((card: HTMLElement, i) => {
      gsap.fromTo(
        card,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });
  }, []);

  return (
    <div ref={containerRef} className="bg-gray-900 min-h-screen py-20 px-4">
      <div className="max-w-5xl mx-auto space-y-20">
        {projects.map((project) => (
          <div
            key={project.id}
            className="project-card rounded-3xl overflow-hidden shadow-2xl bg-gray-800 text-white"
          >
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="md:w-1/2 p-8 flex flex-col justify-center"
                style={{ backgroundColor: project.color + "30" }}
              >
                <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
                <p className="text-white/80 mb-6">{project.description}</p>
                <div className="flex gap-4">
                  <button
                    className="px-5 py-2 bg-white text-gray-900 font-semibold rounded-full hover:bg-opacity-90"
                    style={{ backgroundColor: project.color }}
                  >
                    View Case Study
                  </button>
                  <button className="px-5 py-2 border border-white/30 rounded-full hover:bg-white/10">
                    Live Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollPortfolio;
