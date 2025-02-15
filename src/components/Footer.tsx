"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  ArrowUp,
} from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const socialVariants = {
    hidden: { scale: 0 },
    visible: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <motion.div
        className="max-w-7xl mx-auto px-4 py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
          {/* Company Info */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <div className="flex items-center gap-2 flex-shrink-0 cursor-pointer">
              <div className="">
                <Image
                  src="/logo.svg"
                  alt="logo"
                  width={56}
                  height={56}
                  priority
                />
              </div>
              <h3 className="text-2xl font-bold text-[var(--primary-color)] ">
                TEDMAX
              </h3>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering minds through quality education and innovative learning
              experiences.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: <Facebook />, href: "#" },
                { icon: <Twitter />, href: "#" },
                {
                  icon: <Instagram />,
                  href: "https://www.instagram.com/tedmax_innovations?igsh=bmdxaTNvNzY4NWIx",
                },
                {
                  icon: <Linkedin />,
                  href: "https://www.linkedin.com/company/tedmax-innovations/",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-[var(--primary-color)] transition-colors"
                  variants={socialVariants}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { name: "About Us", link: "/about" },
                { name: "Courses", link: "/courses" },
                { name: "Mentors", link: "/mentors" },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a
                    href={item.link}
                    className="flex items-center hover:text-[var(--primary-color)] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 mr-2" />
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-white mb-6">
              Contact Info
            </h4>
            <ul className="space-y-4">
              {[
                {
                  icon: <MapPin />,
                  text: "Reva University, Bengaluru, Karnataka, 560064",
                },
                { icon: <Phone />, text: "+91 123456790" },
                { icon: <Mail />, text: "contact@tedmex.in" },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  whileHover={{ x: 5 }}
                >
                  <span className="mr-3 text-[var(--primary-color)]">
                    {item.icon}
                  </span>
                  <span>{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Terms and policy */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-white mb-6">
              Terms and Policy
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Privacy Policy", link: "/privacy-policy" },
                { name: "Terms of Use", link: "/tnc" },
              ].map((item, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a
                    href={item.link}
                    className="flex items-center hover:text-[var(--primary-color)] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4 mr-2" />
                    {item.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center"
          variants={itemVariants}
        >
          <p className="text-center md:text-left mb-4 md:mb-0">
            © {new Date().getFullYear()} TedMax. All rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition-colors"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
