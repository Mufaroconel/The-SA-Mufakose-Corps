import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sermonData, liveStreamData } from "../../data/sermons";
import {
  Video,
  Headphones,
  Calendar,
  Clock,
  Eye,
  Tag,
  Radio,
  Youtube,
  Users,
} from "lucide-react";

type MediaType = "video" | "audio";

const SermonsPage: React.FC = () => {
  const [mediaType, setMediaType] = useState<MediaType>("video");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.div
        className="relative h-64 bg-gradient-to-r from-purple-700 to-purple-900 text-white"
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
            Sermons & Messages
          </motion.h1>
          <motion.p
            className="text-xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Grow in faith through our collection of inspiring messages
          </motion.p>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 py-12">
        {/* Live Stream Section */}
        {liveStreamData.isLive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-red-600 font-medium">Live Now</span>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="aspect-video">
                <iframe
                  className="w-full h-full"
                  src={liveStreamData.streamUrl}
                  title="Live Stream"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {liveStreamData.title}
                  </h2>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users size={18} />
                    <span>{liveStreamData.viewers} watching</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={18} />
                  <span>
                    {new Date(liveStreamData.startTime).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Media Type Toggle */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setMediaType("video")}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
              mediaType === "video"
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-700 hover:bg-purple-50"
            }`}
          >
            <Video size={18} />
            Video Sermons
          </button>
          <button
            onClick={() => setMediaType("audio")}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg transition-colors ${
              mediaType === "audio"
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-700 hover:bg-purple-50"
            }`}
          >
            <Headphones size={18} />
            Audio Sermons
          </button>
        </div>

        {/* Sermons Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mediaType}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {sermonData.map((sermon) => (
              <motion.div
                key={sermon.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
                whileHover={{ y: -5 }}
              >
                <div className="relative">
                  <img
                    src={sermon.thumbnailUrl}
                    alt={sermon.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    {mediaType === "video" ? (
                      <Youtube className="w-12 h-12 text-white" />
                    ) : (
                      <Radio className="w-12 h-12 text-white" />
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {sermon.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{sermon.description}</p>

                  <div className="space-y-2 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{new Date(sermon.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>{sermon.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye size={16} />
                      <span>{sermon.views} views</span>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {sermon.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-sm"
                      >
                        <Tag size={12} />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="mt-6 w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2">
                    {mediaType === "video" ? (
                      <>
                        <Video size={18} />
                        Watch Sermon
                      </>
                    ) : (
                      <>
                        <Headphones size={18} />
                        Listen to Sermon
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SermonsPage;
