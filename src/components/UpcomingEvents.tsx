import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin } from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'Sunday Service',
    date: 'Every Sunday',
    time: '9:00 AM',
    location: 'Main Sanctuary',
    type: 'service'
  },
  {
    id: 2,
    title: 'Youth Choir Practice',
    date: 'Every Saturday',
    time: '2:00 PM',
    location: 'Music Room',
    type: 'choir'
  },
  {
    id: 3,
    title: 'Bible Study',
    date: 'Every Wednesday',
    time: '6:00 PM',
    location: 'Fellowship Hall',
    type: 'study'
  }
];

const UpcomingEvents = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-lg overflow-hidden"
    >
      <div className="p-6 bg-red-600">
        <h2 className="text-2xl font-bold text-white">Upcoming Events</h2>
      </div>
      <div className="divide-y">
        {events.map((event) => (
          <motion.div
            key={event.id}
            whileHover={{ backgroundColor: 'rgba(249, 250, 251, 1)' }}
            className="p-6"
          >
            <div className="flex flex-col space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
              <div className="flex flex-col space-y-2 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default UpcomingEvents;