import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Heart } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    author: 'John Doe',
    content: 'The youth program has been a blessing for my children. They look forward to every meeting!',
    type: 'testimony'
  },
  {
    id: 2,
    author: 'Prayer Warrior',
    content: 'Please pray for my mother who is in the hospital.',
    type: 'prayer'
  },
  {
    id: 3,
    author: 'Mary Smith',
    content: 'The choir performance last Sunday was absolutely beautiful. Praise God!',
    type: 'update'
  }
];

const CommunityFeed = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="p-6 bg-red-600">
        <h2 className="text-2xl font-bold text-white">Community Feed</h2>
      </div>
      <div className="divide-y">
        {testimonials.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="p-6 hover:bg-gray-50"
          >
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                {item.type === 'prayer' ? (
                  <Heart className="w-6 h-6 text-red-600" />
                ) : (
                  <MessageCircle className="w-6 h-6 text-red-600" />
                )}
              </div>
              <div className="flex-1 space-y-2">
                <p className="text-gray-900">{item.content}</p>
                <p className="text-sm text-gray-500">- {item.author}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CommunityFeed;