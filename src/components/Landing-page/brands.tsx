"use client";
import React from "react";
import { motion } from "framer-motion";

const Brands = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className=" text-white py-12 px-4">
      <motion.div
        className="max-w-7xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Title */}
        <motion.h1
          className="text-2xl md:text-4xl lg:text-3xl font-bold text-center mb-12"
          variants={itemVariants}
        >
          <span className="bg-black bg-clip-text text-transparent">
            Government
          </span>
          <span className="text-[var(--primary-color)]">
            {" "}
            Recognized Platform
          </span>
        </motion.h1>
      </motion.div>
    </div>
  );
};

export default Brands;
