import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import fellowshipData from "../../data/fellowship";
import { Users, Clock, ChevronRight, Heart } from "lucide-react";

const FellowshipsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-blue-50">
      {/* Hero Section */}
      <motion.div
        className="relative h-64 bg-gradient-to-r from-blue-700 to-blue-900 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
          <motion.h1
            className="text-4xl font-bold mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Our Fellowships
          </motion.h1>
          <motion.p
            className="text-xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Growing together in faith, love, and community
          </motion.p>
        </div>
      </motion.div>

      {/* Fellowships Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fellowshipData.map((fellowship, index) => (
            <motion.div
              key={fellowship.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link to={`/fellowships/${fellowship.id}`}>
                <div className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform group-hover:scale-105">
                  <div className="relative h-48">
                    <img
                      src={fellowship.image}
                      alt={fellowship.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold">
                      {fellowship.name}
                    </h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      {fellowship.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Users size={16} />
                        <span>{fellowship.members} members</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} />
                        <span>{fellowship.meetingTime}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center text-blue-600 font-medium">
                      Learn more
                      <ChevronRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-2" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FellowshipsPage;
