import React from "react";
import { motion } from "framer-motion";

const animations = {
  in: { opacity: 0 },
  out: { opacity: 1 },
  // exit: { opacity: 0 },
};

const pageTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.5,
};

function AminatedLayout({ children }) {
  return (
    <motion.div
      variants={animations}
      initial="in"
      animate="out"
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}

export default AminatedLayout;
