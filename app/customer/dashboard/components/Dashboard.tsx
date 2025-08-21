/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Types
interface Parcel {
  id: string;
  trackingNumber: string;
  status: 'pending' | 'picked_up' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'cancelled';
  origin: string;
  destination: string;
  estimatedDelivery: string;
  createdAt: string;
  weight: number;
  dimensions: string;
  recipient: string;
  recipientPhone: string;
}

// Mock data
const mockParcels: Parcel[] = [
  {
    id: '1',
    trackingNumber: 'LT123456789',
    status: 'in_transit',
    origin: 'New York, NY',
    destination: 'Los Angeles, CA',
    estimatedDelivery: '2023-12-15',
    createdAt: '2023-12-05',
    weight: 2.5,
    dimensions: '30x20x10 cm',
    recipient: 'John Smith',
    recipientPhone: '+1 (555) 123-4567'
  },
  {
    id: '2',
    trackingNumber: 'LT987654321',
    status: 'out_for_delivery',
    origin: 'Chicago, IL',
    destination: 'Miami, FL',
    estimatedDelivery: '2023-12-10',
    createdAt: '2023-12-07',
    weight: 5.0,
    dimensions: '40x30x25 cm',
    recipient: 'Sarah Johnson',
    recipientPhone: '+1 (555) 987-6543'
  },
  {
    id: '3',
    trackingNumber: 'LT456789123',
    status: 'delivered',
    origin: 'Seattle, WA',
    destination: 'Boston, MA',
    estimatedDelivery: '2023-12-03',
    createdAt: '2023-11-28',
    weight: 1.2,
    dimensions: '25x15x5 cm',
    recipient: 'Michael Brown',
    recipientPhone: '+1 (555) 456-7890'
  },
];

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

const CustomerDashboard = () => {
  const [parcels, setParcels] = useState<Parcel[]>(mockParcels);
  const [activeTab, setActiveTab] = useState<'overview' | 'parcels' | 'bookings'>('overview');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [newParcel, setNewParcel] = useState({
    origin: '',
    destination: '',
    weight: '',
    dimensions: '',
    recipient: '',
    recipientPhone: '',
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const handleBookParcel = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API
    const newParcelObj: Parcel = {
      id: (parcels.length + 1).toString(),
      trackingNumber: `LT${Math.floor(100000000 + Math.random() * 900000000)}`,
      status: 'pending',
      origin: newParcel.origin,
      destination: newParcel.destination,
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      createdAt: new Date().toISOString().split('T')[0],
      weight: parseFloat(newParcel.weight),
      dimensions: newParcel.dimensions,
      recipient: newParcel.recipient,
      recipientPhone: newParcel.recipientPhone,
    };

    setParcels([newParcelObj, ...parcels]);
    setNewParcel({
      origin: '',
      destination: '',
      weight: '',
      dimensions: '',
      recipient: '',
      recipientPhone: '',
    });
    setIsBookingModalOpen(false);
  };

  const getStatusIndex = (status: Parcel['status']) => {
    return statusSteps.findIndex(step => step.key === status);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <div className="bg-blue-600 rounded-lg w-10 h-10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="ml-4 text-2xl font-bold text-gray-900">LogiTrack</h1>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center space-x-4"
          >
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200">
              Book New Parcel
            </button>
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-700 font-medium">JS</span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900">Welcome back, John!</h2>
          <p className="text-gray-600">Here&apos;s the latest update on your parcels</p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {[
            { title: 'Total Parcels', value: parcels.length, color: 'bg-blue-500' },
            { title: 'In Transit', value: parcels.filter(p => p.status === 'in_transit').length, color: 'bg-yellow-500' },
            { title: 'Out for Delivery', value: parcels.filter(p => p.status === 'out_for_delivery').length, color: 'bg-purple-500' },
            { title: 'Delivered', value: parcels.filter(p => p.status === 'delivered').length, color: 'bg-green-500' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-lg shadow p-6"
            >
              <div className="flex items-center">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-gray-600">{stat.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Recent Parcels */}
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

        {/* Book New Parcel Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="fixed bottom-8 right-8"
        >
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="w-14 h-14 bg-blue-600 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-blue-700 transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </motion.div>
      </main>

      {/* Booking Modal */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setIsBookingModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-lg shadow-xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Book New Parcel</h3>
              </div>
              <form onSubmit={handleBookParcel} className="px-6 py-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Origin</label>
                    <input
                      type="text"
                      required
                      value={newParcel.origin}
                      onChange={(e) => setNewParcel({ ...newParcel, origin: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Destination</label>
                    <input
                      type="text"
                      required
                      value={newParcel.destination}
                      onChange={(e) => setNewParcel({ ...newParcel, destination: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                      <input
                        type="number"
                        step="0.1"
                        required
                        value={newParcel.weight}
                        onChange={(e) => setNewParcel({ ...newParcel, weight: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Dimensions (cm)</label>
                      <input
                        type="text"
                        placeholder="LxWxH"
                        required
                        value={newParcel.dimensions}
                        onChange={(e) => setNewParcel({ ...newParcel, dimensions: e.target.value })}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Recipient Name</label>
                    <input
                      type="text"
                      required
                      value={newParcel.recipient}
                      onChange={(e) => setNewParcel({ ...newParcel, recipient: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Recipient Phone</label>
                    <input
                      type="tel"
                      required
                      value={newParcel.recipientPhone}
                      onChange={(e) => setNewParcel({ ...newParcel, recipientPhone: e.target.value })}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setIsBookingModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Book Parcel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerDashboard;