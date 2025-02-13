import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, HelpingHand as PrayingHands } from 'lucide-react';

const DailyVerse = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-lg p-6 md:p-8"
    >
      <div className="flex flex-col space-y-6">
        <div className="flex items-center space-x-3">
          <BookOpen className="w-6 h-6 text-red-600" />
          <h3 className="text-xl font-semibold">Daily Verse</h3>
        </div>
        <blockquote className="text-lg italic text-gray-700">
          "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."
        </blockquote>
        <p className="text-sm text-gray-500">- John 3:16</p>
        
        <div className="border-t pt-6">
          <div className="flex items-center space-x-3 mb-4">
            <PrayingHands className="w-6 h-6 text-red-600" />
            <h3 className="text-xl font-semibold">Daily Prayer</h3>
          </div>
          <p className="text-gray-700">
            Dear Lord, guide us through this day with your wisdom and love. Help us to be a light in our community and to serve others as you have served us. Amen.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default DailyVerse;