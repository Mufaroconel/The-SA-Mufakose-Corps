// src/components/Brigades/BrigadeMembersSection.tsx
import React from "react";
import { motion } from "framer-motion";
import { Users, Calendar, Music } from "lucide-react";

interface BrigadeMembersSectionProps {
  members: string[];
}

const BrigadeMembersSection: React.FC<BrigadeMembersSectionProps> = ({
  members,
}) => {
  if (!Array.isArray(members)) {
    return (
      <div className="text-center py-12 text-gray-500">
        No members information available.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-8"
    >
      <h2 className="text-2xl font-bold text-red-800 mb-6">Brigade Members</h2>
      {members.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-4 bg-red-50 rounded-lg"
            >
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                {member.charAt(0)}
              </div>
              <span className="text-gray-700">{member}</span>
            </motion.li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-12 text-gray-500">
          No members listed yet.
        </div>
      )}
    </motion.div>
  );
};

export default BrigadeMembersSection;
