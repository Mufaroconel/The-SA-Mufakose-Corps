import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Calendar, Heart, Users } from "lucide-react";
import { gsap } from "gsap";

const mediaContent = [
  {
    type: "image",
    url: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    duration: 10000,
  },
  {
    type: "image",
    url: "https://images.unsplash.com/photo-1510590337019-5ef8d3d32116?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    duration: 10000,
  },
  {
    type: "video",
    url: "https://player.vimeo.com/external/370467553.sd.mp4?s=96de8b923370fb7fa8616d4e0b74eaf3fac9e576&profile_id=164&oauth2_token_id=57447761",
    duration: 45000,
  },
  {
    type: "image",
    url: "https://images.unsplash.com/photo-1445743432342-eac500ce72b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
    duration: 10000,
  },
  {
    type: "video",
    url: "https://player.vimeo.com/external/368484050.sd.mp4?s=ea33e97a6b2452c7d2a00999d0ace295c3f3e289&profile_id=164&oauth2_token_id=57447761",
    duration: 45000,
  },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const heroRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaContent.length);
    }, mediaContent[currentIndex].duration);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  useEffect(() => {
    gsap.fromTo(
      heroRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1 }
    );
  }, []);

  const currentMedia = mediaContent[currentIndex];

  return (
    <div ref={heroRef} className="relative min-h-screen pt-20">
      {/* Background Media */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-0"
        >
          {currentMedia.type === "image" ? (
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("${currentMedia.url}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ) : (
            <video
              autoPlay
              muted
              className="absolute inset-0 w-full h-full object-cover"
              src={currentMedia.url}
              onEnded={() =>
                setCurrentIndex(
                  (prevIndex) => (prevIndex + 1) % mediaContent.length
                )
              }
            />
          )}
          <div className="absolute inset-0 bg-black opacity-50" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center min-h-[calc(100vh-5rem)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center space-y-12"
          >
            <motion.div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Welcome to <span className="text-red-500">Salvation Army</span>
                <br />
                Mufakose Corps
              </h1>

              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
                Join us in worship, fellowship, and service to our community
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-red-600 text-white rounded-lg font-semibold flex items-center justify-center space-x-3 hover:bg-red-700 transition-colors shadow-lg"
              >
                <span>Join Us This Sunday</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-red-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
              >
                Learn More
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-white"
          >
            <div className="flex flex-col items-center space-y-4 p-6 rounded-xl backdrop-blur-sm bg-white/10">
              <Calendar className="w-12 h-12 text-red-500" />
              <h3 className="text-xl font-semibold">Weekly Services</h3>
              <p className="text-gray-200 text-center">
                Join us every Sunday for worship and fellowship
              </p>
            </div>

            <div className="flex flex-col items-center space-y-4 p-6 rounded-xl backdrop-blur-sm bg-white/10">
              <Users className="w-12 h-12 text-red-500" />
              <h3 className="text-xl font-semibold">Community Groups</h3>
              <p className="text-gray-200 text-center">
                Connect with others in our various fellowship groups
              </p>
            </div>

            <div className="flex flex-col items-center space-y-4 p-6 rounded-xl backdrop-blur-sm bg-white/10">
              <Heart className="w-12 h-12 text-red-500" />
              <h3 className="text-xl font-semibold">Outreach Programs</h3>
              <p className="text-gray-200 text-center">
                Serve the community through our various ministries
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Media Navigation Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-2">
          {mediaContent.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-red-500 w-6"
                  : "bg-white/50 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
