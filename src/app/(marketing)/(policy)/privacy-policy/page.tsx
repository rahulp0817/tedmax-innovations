"use client";
import { motion } from "framer-motion";
import React from "react";
import { privacypolicyContent } from "./privacy-policy";

const PrivacyPolicypage = () => {
  return (
    <>
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.25,
          type: "spring",
          damping: 10,
          stiffness: 100,
        }}
        className="wrapper flex flex-col items-start justify-center"
      >
        <h1 className="mx-auto mb-8 w-full text-center text-4xl font-extrabold tracking-tighter text-primary md:mb-12 md:text-5xl">
          Privacy Policy
        </h1>
        <div className="mx-auto text-center text-lg font-medium text-foreground/70">
          Last Updated At:{" "}
          <span className="text-primary">February 2, 2025</span>
        </div>
        <h3 className="text-[var(--primary-color)] mx-80 mt-12 text-lg font-medium text-foreground/70">
          TedMax is committed to protecting your privacy. This Privacy Policy
          explains how we collect, use, disclose, and protect your personal
          information when you access our website and services.
        </h3>
        <br />
        <div className="mx-auto max-w-3xl">
          {privacypolicyContent.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.5 + item.id * 0.1,
                type: "spring",
                damping: 10,
                stiffness: 100,
              }}
              className="mb-6"
            >
              <p className="text-lg font-medium text-foreground/80">
                <div>
                  <div className="flex">
                    {item.id}
                    <p>.</p>&nbsp;&nbsp;
                    {item.title} <br />
                  </div>
                  <p className="text-md text-gray-500 px-4 py-2">
                    {item.content}
                  </p>
                </div>
              </p>
            </motion.div>
          ))}
        </div>
      </motion.main>
    </>
  );
};

export default PrivacyPolicypage;
