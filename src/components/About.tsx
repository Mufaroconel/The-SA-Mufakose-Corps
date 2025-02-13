import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Users, Church, Video, Image, History } from "lucide-react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const AboutPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("mission");
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP animation for timeline items
    const ctx = gsap.context(() => {
      gsap.from(".timeline-item", {
        opacity: 0,
        y: 50,
        stagger: 0.3,
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top center+=100",
          end: "bottom center",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert(); // Cleanup
  }, []);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const TabButton: React.FC<{
    value: string;
    icon: React.ReactNode;
    label: string;
  }> = ({ value, icon, label }) => (
    <button
      onClick={() => setActiveTab(value)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
        ${
          activeTab === value
            ? "bg-red-600 text-white"
            : "bg-white text-gray-700 hover:bg-red-50"
        }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-red-50">
      {/* Hero Section */}
      <motion.div
        className="relative h-96 bg-gradient-to-r from-red-700 to-red-900 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
          <motion.h1 className="text-5xl font-bold mb-4" {...fadeInUp}>
            Salvation Army Mufakose
          </motion.h1>
          <motion.p
            className="text-xl max-w-2xl"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            Transforming lives through faith, hope, and service since 1865
          </motion.p>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-16">
        {/* Custom Tab Navigation */}
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
          <TabButton
            value="mission"
            icon={<Heart className="w-4 h-4" />}
            label="Mission"
          />
          <TabButton
            value="community"
            icon={<Users className="w-4 h-4" />}
            label="Community"
          />
          <TabButton
            value="services"
            icon={<Church className="w-4 h-4" />}
            label="Services"
          />
          <TabButton
            value="gallery"
            icon={<Image className="w-4 h-4" />}
            label="Gallery"
          />
          <TabButton
            value="videos"
            icon={<Video className="w-4 h-4" />}
            label="Videos"
          />
          <TabButton
            value="history"
            icon={<History className="w-4 h-4" />}
            label="History"
          />
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === "mission" && (
            <motion.div
              className="bg-white rounded-lg shadow-lg p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-red-800">
                    Our Mission
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    To preach the gospel of Jesus Christ and meet human needs in
                    His name without discrimination. We are dedicated to serving
                    the Mufakose community through spiritual guidance, social
                    services, and humanitarian aid.
                  </p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-red-800">
                    Our Values
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                      <span className="text-gray-700">Compassion for all</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                      <span className="text-gray-700">Service to others</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                      <span className="text-gray-700">Integrity in action</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "community" && (
            <motion.div
              className="bg-white rounded-lg shadow-lg p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Youth Programs",
                    description:
                      "Empowering young people through education and spiritual growth",
                  },
                  {
                    title: "Food Bank",
                    description:
                      "Providing nutritious meals to families in need",
                  },
                  {
                    title: "Counseling Services",
                    description: "Supporting mental and spiritual well-being",
                  },
                ].map((program, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-6 rounded-lg shadow-md"
                  >
                    <h3 className="text-xl font-bold text-red-800 mb-3">
                      {program.title}
                    </h3>
                    <p className="text-gray-600">{program.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "gallery" && (
            <motion.div
              className="bg-white rounded-lg shadow-lg p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="aspect-square bg-gray-200 rounded-lg overflow-hidden"
                  >
                    <img
                      src={`/api/placeholder/400/400`}
                      alt={`Church activity ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Add similar conditions for other tabs */}
        </div>

        {/* Timeline Section */}
        <div ref={timelineRef} className="mt-16">
          <h2 className="text-3xl font-bold text-red-800 mb-8 text-center">
            Our Journey
          </h2>
          <div className="space-y-8">
            {[
              { year: "1865", event: "The Salvation Army was founded" },
              { year: "1980", event: "Establishment of Mufakose Corps" },
              { year: "2000", event: "Community Center Opening" },
              { year: "2024", event: "Expanding our mission" },
            ].map((item, index) => (
              <div
                key={index}
                className="timeline-item flex items-center gap-4"
              >
                <div className="w-24 text-right font-bold text-red-800">
                  {item.year}
                </div>
                <div className="w-4 h-4 bg-red-800 rounded-full"></div>
                <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
                  {item.event}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
