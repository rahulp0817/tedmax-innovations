"use client";
import React from "react";
import { motion } from "framer-motion";

const Loading: React.FC = () => {
  const dotVariants = {
    initial: { scale: 0.8, opacity: 0.6 },
    animate: {
      scale: [0.8, 1.2, 0.8],
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <motion.div initial="hidden" animate="visible" className="flex space-x-4">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            variants={dotVariants}
            custom={index}
            animate="animate"
            className="w-4 h-4 bg-red-400 rounded-full"
            style={{
              animationDelay: `${index * 0.2}s`,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Loading;
