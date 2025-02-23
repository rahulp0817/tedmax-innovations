'use client'
import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQs = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className="md:px-96 md:mb-32 mb-16 px-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.h1 
        className="md:text-3xl text-2xl font-semibold text-center mb-6 "
        variants={titleVariants}
      >
        Frequently Asked <span className="text-red-600">Questions</span>
      </motion.h1>
      <Accordion type="single" collapsible className="w-full">
        <motion.div variants={itemVariants}>
          <AccordionItem value="item-1">
            <AccordionTrigger>
              What types of courses does TedMax offer?
            </AccordionTrigger>
            <AccordionContent>
              We offer three types of courses: <br />
              • Basic Course Model: ₹499 for essential foundational training. <br />
              • Advanced Course Model: ₹1999 for comprehensive training with assignments. <br />
              • Internship Program Model: ₹2500 for intensive training with industrial project experience.
            </AccordionContent>
          </AccordionItem>
        </motion.div>

        <motion.div variants={itemVariants}>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              What fields are your courses available in?
            </AccordionTrigger>
            <AccordionContent>
              Our programs are designed for students in the following categories: <br />
              • Business and Management <br />
              • Software Development and IT <br />
              • Mechanical and Industrial Applications
            </AccordionContent>
          </AccordionItem>
        </motion.div>

        <motion.div variants={itemVariants}>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              What is included in the Internship Program Model?
            </AccordionTrigger>
            <AccordionContent>
              The Internship Program provides intensive training, project-based learning, certifications, and an opportunity for performance-based stipends.
            </AccordionContent>
          </AccordionItem>
        </motion.div>

        <motion.div variants={itemVariants}>
          <AccordionItem value="item-4">
            <AccordionTrigger>How are courses delivered?</AccordionTrigger>
            <AccordionContent>
              Courses are conducted through an interactive online platform that offers structured modules, assignments, and practical exercises.
            </AccordionContent>
          </AccordionItem>
        </motion.div>

        <motion.div variants={itemVariants}>
          <AccordionItem value="item-5">
            <AccordionTrigger>Will I get a certificate?</AccordionTrigger>
            <AccordionContent>
              Yes, multiple certifications are awarded upon successful course completion, adding value to your academic profile.
            </AccordionContent>
          </AccordionItem>
        </motion.div>

        <motion.div variants={itemVariants}>
          <AccordionItem value="item-6">
            <AccordionTrigger>
              How much time do I need to complete a course?
            </AccordionTrigger>
            <AccordionContent>
              • Basic Course: 1-2 weeks <br />
              • Advanced Course: 4-6 weeks <br />
              • Internship Program: 2 months
            </AccordionContent>
          </AccordionItem>
        </motion.div>

        <motion.div variants={itemVariants}>
          <AccordionItem value="item-7">
            <AccordionTrigger>How do I enroll in a course?</AccordionTrigger>
            <AccordionContent>
              Simply create an account on our website, select the course of your choice, and make the payment through the secure payment gateway.
            </AccordionContent>
          </AccordionItem>
        </motion.div>

        <motion.div variants={itemVariants}>
          <AccordionItem value="item-8">
            <AccordionTrigger>What payment options are available?</AccordionTrigger>
            <AccordionContent>
              Simply create an account on our website, select the course of your choice, and make the payment through the secure payment gateway.
            </AccordionContent>
          </AccordionItem>
        </motion.div>

        <motion.div variants={itemVariants}>
          <AccordionItem value="item-9">
            <AccordionTrigger>Is there a refund policy?</AccordionTrigger>
            <AccordionContent>
              Refunds are not available once a course or internship has started.
            </AccordionContent>
          </AccordionItem>
        </motion.div>

        <motion.div variants={itemVariants}>
          <AccordionItem value="item-10">
            <AccordionTrigger>How can I contact support?</AccordionTrigger>
            <AccordionContent>
              You can reach us at [support@tedmax.com] for any inquiries or technical issues.
            </AccordionContent>
          </AccordionItem>
        </motion.div>

        <motion.div variants={itemVariants}>
          <AccordionItem value="item-11">
            <AccordionTrigger>
              Can I switch between course models after enrollment?
            </AccordionTrigger>
            <AccordionContent>
              No, switching between course models is not allowed after enrollment.
            </AccordionContent>
          </AccordionItem>
        </motion.div>
      </Accordion>
    </motion.div>
  );
};

export default FAQs;