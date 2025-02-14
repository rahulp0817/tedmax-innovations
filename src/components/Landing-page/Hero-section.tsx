"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Button } from "../ui/button";

const HeroSection = () => {
  return (
    <div className="relative">
      {/* Hero Image Section */}
      <div className="relative md:h-[600px] h-[136] mx-4 md:mx-0 md:top-0 top-20 ">
        <Image
          src="/landingHero.jpg"
          alt="Image description"
          width={1920}
          height={600}
          className="w-full h-full object-cover rounded-xl md:rounded-none"
        />
        <div className="absolute inset-0 rounded-xl md:rounded-none bg-gradient-to-b from-black/60 to-black/60" />

        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 100,
          }}
          className="absolute top-1/4 md:top-[40%] transform -translate-y-1/2 text-center w-full px-8 text-white"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="md:text-7xl text-2xl font-semibold mb-4"
          >
            Learn something new everyday
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className=" text-sm md:text-3xl mb-8"
          >
            Become professionals and ready to join the world!
          </motion.p>
        </motion.div>
      </div>

      {/* Search Card Section */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: -80, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          delay: 0.6,
        }}
        className="relative z-10 max-w-6xl mx-auto px-4"
      >
        <Card className="shadow-xl">
          <CardHeader className="font-semibold text-xl">
            What do you want to learn?
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-4">
            <motion.div
              className="flex-1 flex gap-6"
              whileTap={{ scale: 0.995 }}
            >
              <input
                type="text"
                placeholder="Search for popular courses"
                className="h-12 w-full bg-gray-100 px-4 rounded-lg outline-none focus:ring-2 focus:ring-red-500 transition-all"
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  className="bg-[#C1272D] hover:bg-[#a61f24] transition-colors h-12 w-full sm:w-auto"
                  size="lg"
                >
                  Search
                </Button>
              </motion.div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default HeroSection;
