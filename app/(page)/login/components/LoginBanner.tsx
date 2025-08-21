'use client';

import { motion } from 'framer-motion';

const LoginBanner = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-600 to-blue-800"
      />
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute inset-0 bg-[url('/api/placeholder/800/600')] bg-cover bg-center mix-blend-overlay"
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
      </motion.div>
      <div className="absolute top-1/4 left-10 right-10 text-white">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-4xl font-bold mb-6"
        >
          Streamline Your Logistics
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="text-xl max-w-md"
        >
          Track parcels in real-time, manage deliveries efficiently, and provide
          exceptional customer experiences.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="mt-10 grid grid-cols-3 gap-8"
        >
          {[
            { icon: "🚚", text: "Real-time Tracking" },
            { icon: "⏱️", text: "Fast Delivery" },
            { icon: "🔒", text: "Secure Process" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="text-sm">{item.text}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default LoginBanner;