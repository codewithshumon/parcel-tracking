"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  AnalyticsIcon,
  AutomationIcon,
  BellIcon,
  BookIcon,
  ClockIcon,
  DeliverIcon,
  LocationIcon,
  MenuIcon,
  MobileIcon,
  PackageIcon,
  RealTimeIcon,
  SecureIcon,
  ShieldIcon,
  TrackIcon,
  TruckIcon,
} from "../libs/svgConst";

const features = [
  {
    icon: <RealTimeIcon className="h-8 w-8 text-blue-600" />,
    title: "Real-time Tracking",
    description:
      "Monitor your parcels in real-time with live updates and precise location tracking.",
  },
  {
    icon: <AnalyticsIcon className="h-8 w-8 text-blue-600" />,
    title: "Advanced Analytics",
    description:
      "Gain insights into your delivery performance with detailed analytics and reports.",
  },
  {
    icon: <AutomationIcon className="h-8 w-8 text-blue-600" />,
    title: "Automated Assignments",
    description:
      "Automatically assign deliveries to the nearest available agent for optimal efficiency.",
  },
  {
    icon: <MobileIcon className="h-8 w-8 text-blue-600" />,
    title: "Mobile Access",
    description:
      "Manage your deliveries on the go with our responsive mobile application.",
  },
  {
    icon: <SecureIcon className="h-8 w-8 text-blue-600" />,
    title: "Secure Platform",
    description:
      "Your data is protected with enterprise-grade security and encryption protocols.",
  },
  {
    icon: <BookIcon className="h-8 w-8 text-blue-600" />,
    title: "Easy Booking",
    description:
      "Book parcels in seconds with our intuitive and user-friendly interface.",
  },
];

const steps = [
  {
    icon: <BookIcon className="h-10 w-10 text-blue-600" />,
    title: "Book a Parcel",
    description:
      "Create a shipment with details of your parcel, origin, and destination.",
  },
  {
    icon: <TrackIcon className="h-10 w-10 text-blue-600" />,
    title: "Track in Real-time",
    description:
      "Monitor your parcel's journey with live updates and notifications.",
  },
  {
    icon: <DeliverIcon className="h-10 w-10 text-blue-600" />,
    title: "Receive Delivery",
    description:
      "Get your parcel delivered safely and confirm receipt with digital signature.",
  },
];

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Case Studies", href: "#case-studies" },
      { label: "Reviews", href: "#reviews" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "#about" },
      { label: "Careers", href: "#careers" },
      { label: "Contact", href: "#contact" },
      { label: "Blog", href: "#blog" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#help" },
      { label: "Documentation", href: "#docs" },
      { label: "API Status", href: "#status" },
      { label: "Live Chat", href: "#chat" },
    ],
  },
];

const Landing = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center"
            >
              <div className="bg-blue-600 rounded-lg w-10 h-10 flex items-center justify-center">
                <TruckIcon className="h-6 w-6 text-white" />
              </div>
              <h1 className="ml-4 text-2xl font-bold text-gray-900">
                LogiTrack
              </h1>
            </motion.div>

            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                How It Works
              </a>
              <a
                href="#pricing"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Pricing
              </a>
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-gray-700">
                <MenuIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                Modern Logistics{" "}
                <span className="text-blue-600">Tracking Platform</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Streamline your delivery process with real-time tracking,
                automated assignments, and seamless customer experience.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-center font-medium transition-colors duration-200"
                >
                  Get Started
                </Link>
                <Link
                  href="#demo"
                  className="border border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 px-6 py-3 rounded-lg text-center font-medium transition-colors duration-200"
                >
                  View Demo
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">
                      Tracking ID: LT789456123
                    </span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      In Transit
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-3/4"></div>
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>Order Placed</span>
                    <span>In Transit</span>
                    <span>Out for Delivery</span>
                    <span>Delivered</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center">
                    <PackageIcon className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-gray-700">From: New York, NY</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div className="flex items-center">
                    <LocationIcon className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-gray-700">To: Los Angeles, CA</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center">
                    <ClockIcon className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="text-gray-700">
                      Est. Delivery: Dec 15, 2023
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-4 -right-4 bg-blue-100 rounded-lg p-3 shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
              >
                <BellIcon className="h-6 w-6 text-blue-600" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 bg-green-100 rounded-lg p-3 shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
              >
                <ShieldIcon className="h-6 w-6 text-green-600" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage your logistics operations
              efficiently
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-20 bg-gray-50 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Simple steps to manage your deliveries efficiently
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="relative mb-6">
                  <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Transform Your Logistics?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Join thousands of businesses that trust LogiTrack for their
              delivery management needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/register"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-center font-medium transition-colors duration-200"
              >
                Get Started Free
              </Link>
              <Link
                href="#demo"
                className="bg-transparent border border-white text-white hover:bg-blue-700 px-8 py-3 rounded-lg text-center font-medium transition-colors duration-200"
              >
                Schedule a Demo
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 rounded-lg w-8 h-8 flex items-center justify-center mr-2">
                <TruckIcon className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">LogiTrack</span>
            </div>
            <p className="text-gray-400">
              Modern logistics tracking platform for businesses of all sizes.
            </p>
          </div>

          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} LogiTrack. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
