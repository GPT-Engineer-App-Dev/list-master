import React from "react";
import { motion } from "framer-motion";

const sparkleVariants = {
  initial: { rotate: 0 },
  animate: { rotate: 360 },
};

const Sparkles: React.FC = () => {
  return (
    <motion.span role="img" aria-label="sparkles" variants={sparkleVariants} initial="initial" animate="animate" transition={{ loop: Infinity, ease: "linear", duration: 2 }}>
      ✨
    </motion.span>
  );
};

export default Sparkles;
