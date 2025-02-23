import React from 'react';
import { useParams } from 'react-router-dom';

const FellowshipDetailPage: React.FC = () => {
  const { id } = useParams();

  return (
    <div className="pt-20 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Fellowship Details</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">Fellowship {id}</h2>
        {/* Add your fellowship details content here */}
        <p className="text-gray-600">
          Details for fellowship with ID: {id}
        </p>
      </div>
    </div>
  );
};

export default FellowshipDetailPage;
