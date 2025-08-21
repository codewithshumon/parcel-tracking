'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Parcel } from './Parcel';

interface RecentParcelsProps {
  parcels: Parcel[];
}

const statusSteps = [
  { key: 'pending', label: 'Order Placed' },
  { key: 'picked_up', label: 'Picked Up' },
  { key: 'in_transit', label: 'In Transit' },
  { key: 'out_for_delivery', label: 'Out for Delivery' },
  { key: 'delivered', label: 'Delivered' },
];

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  picked_up: 'bg-blue-100 text-blue-800',
  in_transit: 'bg-indigo-100 text-indigo-800',
  out_for_delivery: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const RecentParcels = ({ parcels }: RecentParcelsProps) => {
  const getStatusIndex = (status: Parcel['status']) => {
    return statusSteps.findIndex(step => step.key === status);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-white rounded-lg shadow overflow-hidden"
    >
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent Parcels</h3>
      </div>
      <div className="divide-y divide-gray-200">
        <AnimatePresence>
          {parcels.map((parcel) => (
            <motion.div
              key={parcel.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <h4 className="text-lg font-medium text-gray-900">{parcel.trackingNumber}</h4>
                    <span className={`ml-3 px-2 py-1 text-xs font-medium rounded-full ${statusColors[parcel.status]}`}>
                      {parcel.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1">{parcel.origin} → {parcel.destination}</p>
                  <p className="text-sm text-gray-500 mt-2">Est. delivery: {parcel.estimatedDelivery}</p>
                </div>
                <Link 
                  href={`/customer/track/${parcel.id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Track
                </Link>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  {statusSteps.map((step, index) => (
                    <div 
                      key={step.key} 
                      className={`text-xs ${getStatusIndex(parcel.status) >= index ? 'text-blue-600 font-medium' : 'text-gray-400'}`}
                    >
                      {step.label}
                    </div>
                  ))}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${(getStatusIndex(parcel.status) + 1) * 25}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default RecentParcels;