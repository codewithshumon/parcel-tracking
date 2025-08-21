'use client';

import { motion, Variants } from 'framer-motion';

const SignupBanner = () => {
  // Floating animation variants
  const floatingAnimation: Variants = {
    animate: {
      y: [0, -15, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Pulse animation variants
  const pulseAnimation: Variants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Rotate animation variants
  const rotateAnimation: Variants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  // Fade in up animation variants
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Scale in animation variants
  const scaleIn: Variants = {
    hidden: { scale: 0.9 },
    visible: { scale: 1 }
  };

  // Rotate in animation variants
  const rotateIn: Variants = {
    hidden: { rotate: -180, scale: 0 },
    visible: { rotate: 0, scale: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <>
      {/* Background gradient with animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 h-full w-full bg-gradient-to-br from-indigo-900 via-blue-800 to-purple-700"
      />
      
      {/* Animated shapes in the background */}
      <motion.div
        variants={floatingAnimation}
        animate="animate"
        className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-blue-500/20 blur-xl"
      />
      
      <motion.div
        variants={floatingAnimation}
        animate="animate"
        initial={{ y: 40 }}
        className="absolute bottom-1/3 right-1/4 w-32 h-32 rounded-full bg-purple-500/20 blur-xl"
      />
      
      <motion.div
        variants={pulseAnimation}
        animate="animate"
        className="absolute top-1/3 right-1/3 w-24 h-24 rounded-lg bg-indigo-500/15 blur-lg"
      />
      
      {/* Main content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center mb-8"
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={scaleIn}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="inline-flex items-center justify-center mb-6"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={rotateIn}
              transition={{ delay: 0.8 }}
              className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mr-4 border border-white/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.7 }}
              className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100"
            >
              LogiTrack
            </motion.h2>
          </motion.div>
          
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="text-3xl font-bold mb-4"
          >
            Join Our Delivery Network
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.7 }}
            className="text-xl text-blue-100 max-w-lg"
          >
            Create your account and experience the future of logistics management
          </motion.p>
        </motion.div>

        {/* Animated features list */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8"
        >
          {[
            { 
              icon: "🚀", 
              title: "Instant Setup", 
              description: "Get started in minutes with our intuitive platform" 
            },
            { 
              icon: "🌎", 
              title: "Global Reach", 
              description: "Connect with delivery networks worldwide" 
            },
            { 
              icon: "📊", 
              title: "Real-Time Analytics", 
              description: "Monitor your shipments with live tracking" 
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8 + index * 0.2, duration: 0.5 }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
              className="text-center bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20"
            >
              <motion.div 
                className="text-3xl mb-4"
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {item.icon}
              </motion.div>
              <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
              <p className="text-blue-100">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Animated CTA section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4, duration: 0.7 }}
          className="mt-12 text-center"
        >
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20"
          >
            <span className="mr-2">✨</span>
            <span>Join thousands of satisfied users</span>
            <span className="ml-2">✨</span>
          </motion.div>
        </motion.div>

        {/* Decorative animated elements */}
        <motion.div
          variants={rotateAnimation}
          animate="animate"
          className="absolute top-20 right-20 w-12 h-12 border-2 border-white/20 rounded-full"
        />
        
        <motion.div
          variants={rotateAnimation}
          animate="animate"
          transition={{ duration: 15 }}
          className="absolute bottom-20 left-20 w-16 h-16 border-2 border-white/10 rounded-full"
        />
        
        <motion.div
          variants={floatingAnimation}
          animate="animate"
          transition={{ duration: 5 }}
          className="absolute top-40 left-40 w-6 h-6 bg-white/20 rounded-full"
        />
        
        <motion.div
          variants={floatingAnimation}
          animate="animate"
          transition={{ duration: 7, delay: 1 }}
          className="absolute bottom-40 right-40 w-4 h-4 bg-white/30 rounded-full"
        />
      </div>
    </>
  );
};

export default SignupBanner;