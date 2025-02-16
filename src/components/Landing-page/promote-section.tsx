"use client";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PromoteSection = () => {
  const router = useRouter();
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
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative bg-[#1B283F] py-14 flex items-center justify-between px-24">
      <motion.div
        className="space-y-6 max-w-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="space-y-2" variants={itemVariants}>
          <h2 className="text-white font-bold text-xl">
            Join now and Explore the world of courses
          </h2>
          <p className="text-gray-500">
            With our responsive themes and mobile and desktop apps, enjoy a
            seamless experience on any device and be the best visitor.
          </p>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Link href="/signup">
            <Button size="lg" className="bg-[#C1272D] hover:bg-[#A01F24]">
              Join Now
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Right Section - Image */}
      <motion.div
        className="absolute top-0 right-0"
        variants={imageVariants}
        initial="hidden"
        animate="visible"
      >
        <Image
          src="/rhone.svg"
          alt="image design"
          width={300}
          height={300}
          priority
        />
      </motion.div>
    </div>
  );
};

export default PromoteSection;
