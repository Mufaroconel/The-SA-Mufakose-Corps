// src/components/Brigades/BrigadeDetailPage.tsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { brigadeData } from "../../data/brigades";
import { Users, Clock, Calendar } from "lucide-react";
import BrigadeMembersSection from "./BrigadeMembersSection";

const BrigadeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const brigade = brigadeData.find((b) => b.id === id);
  const [activeTab, setActiveTab] = useState<"about" | "posts" | "members">(
    "about"
  );

  if (!brigade) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl text-gray-600">Brigade not found</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-red-50">
      {/* Hero Section */}
      <motion.div
        className="relative h-96 bg-gradient-to-r from-red-700 to-red-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="absolute inset-0">
          <img
            src={brigade.image}
            alt={brigade.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center text-white">
          <motion.h1
            className="text-5xl font-bold mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {brigade.name}
          </motion.h1>
          <motion.p
            className="text-xl max-w-2xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {brigade.description}
          </motion.p>
        </div>
      </motion.div>

      {/* Content Section */}
      <div className="container mx-auto px-6 py-16">
        {/* Updated Tab Navigation */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("about")}
            className={`px-6 py-2 rounded-lg transition-colors ${
              activeTab === "about"
                ? "bg-red-600 text-white"
                : "bg-white text-gray-700 hover:bg-red-50"
            }`}
          >
            About
          </button>
          <button
            onClick={() => setActiveTab("members")}
            className={`px-6 py-2 rounded-lg transition-colors ${
              activeTab === "members"
                ? "bg-red-600 text-white"
                : "bg-white text-gray-700 hover:bg-red-50"
            }`}
          >
            Members
          </button>
          <button
            onClick={() => setActiveTab("posts")}
            className={`px-6 py-2 rounded-lg transition-colors ${
              activeTab === "posts"
                ? "bg-red-600 text-white"
                : "bg-white text-gray-700 hover:bg-red-50"
            }`}
          >
            Latest Activities
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "about" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold text-red-800 mb-6">
                  Brigade Information
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="font-medium">Leader</p>
                      <p className="text-gray-600">{brigade.leader}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="font-medium">Meeting Time</p>
                      <p className="text-gray-600">{brigade.meetingTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="font-medium">Current Members</p>
                      <p className="text-gray-600">{brigade.members} members</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-red-800 mb-6">
                  Join Us
                </h2>
                <p className="text-gray-600 mb-4">
                  We welcome new members who are passionate about serving God
                  through music and worship. Contact our brigade leader or visit
                  us during our meeting times to learn more.
                </p>
                <button className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors">
                  Contact Leader
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === "members" && (
          <BrigadeMembersSection members={brigade.members} />
        )}

        {activeTab === "posts" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {brigade.posts.length > 0 ? (
              brigade.posts.map((post) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-64 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-red-800 mb-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div>{post.author}</div>
                    </div>
                    <p className="text-gray-600">{post.content}</p>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                No activities posted yet.
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BrigadeDetailPage;
