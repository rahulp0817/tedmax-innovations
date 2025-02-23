"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

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

  const logos = [
    { id: 1, src: "/StartupIndia.png", alt: "Azadi India" },
    { id: 2, src: "/Azadindia.png", alt: "Azadi India" },
    { id: 3, src: "/Indiagovt.png", alt: "Azadi India" },
    { id: 4, src: "/MMSE.png", alt: "Azadi India" },
  ];

  return (
    <div className="text-white py-12 px-4">
      <motion.div
        className="max-w-7xl mx-auto space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Title */}
        <motion.h1
          className="text-2xl md:text-4xl lg:text-3xl font-bold text-center mb-6"
          variants={itemVariants}
        >
          <span className="bg-black bg-clip-text text-transparent">
            Government
          </span>
          <span className="text-[var(--primary-color)]">
            {" "}
            Recognized Platforms
          </span>
        </motion.h1>

        {/* Logo Grid */}
        <motion.div 
          className="grid grid-cols-4 md:grid-cols-4 gap-6 items-center justify-items-center"
          variants={itemVariants}
        >
          {logos.map((logo) => (
            <motion.div
              key={logo.id}
              className="relative w-20 h-20 md:w-40 md:h-40"
              variants={logoVariants}
              whileHover="hover"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 160px, 192px"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Brands;