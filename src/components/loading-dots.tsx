import { motion } from "framer-motion";

const LoadingDots = () => {
  const containerVariants = {
    initial: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const dotVariants = {
    initial: {
      scale: 0.5,
      opacity: 0.5,
    },
    animate: {
      scale: 1,
      opacity: 1,
    },
  };

  const dotTransition = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
  };

  return (
    <div className="flex items-center justify-center w-full h-full">
      <motion.div
        className="flex gap-2"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {[...Array(3)].map((_, i) => (
          <motion.span
            key={i}
            className="w-1.5 h-1.5 bg-gray-400 rounded-full"
            variants={dotVariants}
            //@ts-ignore
            transition={dotTransition}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default LoadingDots;
