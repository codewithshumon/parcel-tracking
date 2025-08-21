/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Types
interface ParcelFormData {
  pickupAddress: string;
  deliveryAddress: string;
  parcelType: 'document' | 'small' | 'medium' | 'large' | 'custom';
  width: string;
  height: string;
  length: string;
  weight: string;
  paymentMethod: 'cod' | 'prepaid';
  codAmount: string;
  notes: string;
}

const parcelTypes = [
  {
    id: 'document',
    label: 'Document',
    description: 'Letters, contracts, files',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    dimensions: 'Max 35×25×2 cm'
  },
  {
    id: 'small',
    label: 'Small Box',
    description: 'Books, electronics, clothing',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    dimensions: 'Max 35×25×10 cm'
  },
  {
    id: 'medium',
    label: 'Medium Box',
    description: 'Shoes, small appliances',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    dimensions: 'Max 45×35×20 cm'
  },
  {
    id: 'large',
    label: 'Large Box',
    description: 'Large items, multiple products',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    dimensions: 'Max 60×40×30 cm'
  },
  {
    id: 'custom',
    label: 'Custom Size',
    description: 'Specify your own dimensions',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    dimensions: 'Specify below'
  }
];

const ParcelBookingPage = () => {
  const [formData, setFormData] = useState<ParcelFormData>({
    pickupAddress: '',
    deliveryAddress: '',
    parcelType: 'small',
    width: '',
    height: '',
    length: '',
    weight: '',
    paymentMethod: 'prepaid',
    codAmount: '',
    notes: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleParcelTypeSelect = (type: ParcelFormData['parcelType']) => {
    setFormData(prev => ({
      ...prev,
      parcelType: type
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would call an API
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
  };

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

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Parcel Booked Successfully!</h2>
            <p className="text-gray-600 mb-6">Your parcel pickup has been scheduled. We&apos;ll contact you shortly for confirmation.</p>
            <div className="flex space-x-4">
              <Link 
                href="/customer/dashboard"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 text-center"
              >
                Go to Dashboard
              </Link>
              <button 
                onClick={() => {
                  setIsSubmitted(false);
                  setCurrentStep(1);
                  setFormData({
                    pickupAddress: '',
                    deliveryAddress: '',
                    parcelType: 'small',
                    width: '',
                    height: '',
                    length: '',
                    weight: '',
                    paymentMethod: 'prepaid',
                    codAmount: '',
                    notes: ''
                  });
                }}
                className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors duration-200"
              >
                Book Another
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link href="/customer/dashboard" className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Dashboard
          </Link>
          <div className="flex items-center">
            <div className="bg-blue-600 rounded-lg w-10 h-10 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h1 className="ml-4 text-2xl font-bold text-gray-900">LogiTrack</h1>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center mb-8">
          {[1, 2, 3].map(step => (
            <div key={step} className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'} transition-colors duration-200`}>
                {step}
              </div>
              <span className="mt-2 text-sm font-medium text-gray-700">
                {step === 1 && 'Addresses'}
                {step === 2 && 'Parcel Details'}
                {step === 3 && 'Payment'}
              </span>
            </div>
          ))}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 -z-10">
            <motion.div 
              className="h-full bg-blue-600"
              initial={{ width: '0%' }}
              animate={{ width: `${((currentStep - 1) / 2) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <form onSubmit={handleSubmit}>
            {/* Step 1: Addresses */}
            {currentStep === 1 && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Pickup & Delivery Addresses</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        Pickup Address
                      </div>
                    </label>
                    <textarea
                      name="pickupAddress"
                      required
                      value={formData.pickupAddress}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter complete pickup address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                        </svg>
                        Delivery Address
                      </div>
                    </label>
                    <textarea
                      name="deliveryAddress"
                      required
                      value={formData.deliveryAddress}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter complete delivery address"
                    />
                  </div>
                </div>
                
                <div className="mt-8 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center"
                  >
                    Next
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 2: Parcel Details */}
            {currentStep === 2 && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Parcel Details</h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                      </svg>
                      Parcel Type
                    </div>
                  </label>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {parcelTypes.map(type => (
                      <motion.div
                        key={type.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors duration-200 ${formData.parcelType === type.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                        onClick={() => handleParcelTypeSelect(type.id as ParcelFormData['parcelType'])}
                      >
                        <div className="flex items-center mb-2">
                          <div className={`p-2 rounded-md ${formData.parcelType === type.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                            {type.icon}
                          </div>
                          <span className="ml-3 font-medium">{type.label}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">{type.description}</p>
                        <p className="text-xs text-gray-500">{type.dimensions}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {formData.parcelType === 'custom' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="grid grid-cols-3 gap-4 mb-6"
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Width (cm)</label>
                      <input
                        type="number"
                        name="width"
                        value={formData.width}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Width"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                      <input
                        type="number"
                        name="height"
                        value={formData.height}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Height"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Length (cm)</label>
                      <input
                        type="number"
                        name="length"
                        value={formData.length}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Length"
                      />
                    </div>
                  </motion.div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                        </svg>
                        Weight (kg)
                      </div>
                    </label>
                    <input
                      type="number"
                      name="weight"
                      required
                      value={formData.weight}
                      onChange={handleInputChange}
                      step="0.1"
                      min="0.1"
                      className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="0.0"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                          <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                        </svg>
                        Notes (Optional)
                      </div>
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Special instructions for delivery"
                    />
                  </div>
                </div>
                
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center"
                  >
                    Next
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <input
                      id="prepaid"
                      name="paymentMethod"
                      type="radio"
                      value="prepaid"
                      checked={formData.paymentMethod === 'prepaid'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="prepaid" className="ml-3 text-sm font-medium text-gray-700 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                      </svg>
                      Prepaid (Pay Now)
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="cod"
                      name="paymentMethod"
                      type="radio"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <label htmlFor="cod" className="ml-3 text-sm font-medium text-gray-700 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                        <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                      </svg>
                      Cash on Delivery (COD)
                    </label>
                  </div>
                </div>
                
                {formData.paymentMethod === 'cod' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mb-6"
                  >
                    <label className="block text-sm font-medium text-gray-700 mb-2">COD Amount</label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="number"
                        name="codAmount"
                        value={formData.codAmount}
                        onChange={handleInputChange}
                        className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                  </motion.div>
                )}
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="font-medium text-gray-900 mb-2">Summary</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>Parcel Type:</span>
                      <span>{parcelTypes.find(t => t.id === formData.parcelType)?.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Weight:</span>
                      <span>{formData.weight || '0'} kg</span>
                    </div>
                    {formData.paymentMethod === 'cod' && formData.codAmount && (
                      <div className="flex justify-between">
                        <span>COD Amount:</span>
                        <span>${formData.codAmount}</span>
                      </div>
                    )}
                    <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between font-medium">
                      <span>Total:</span>
                      <span>${formData.paymentMethod === 'cod' ? '15.00' : '12.00'}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Confirm Booking
                  </button>
                </div>
              </div>
            )}
          </form>
        </motion.div>
      </main>
    </div>
  );
};

export default ParcelBookingPage;