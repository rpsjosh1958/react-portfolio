import React from 'react';
import { motion } from 'framer-motion';

export const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={`grid grid-cols-1 laptop:grid-cols-4 gap-4 max-w-7xl mx-auto w-full p-4 laptop:auto-rows-[18rem] ${className}`}
    >
      {children}
    </div>
  );
};

export const BentoItem = ({ children, className, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className={`
        rounded-3xl group/bento p-6
        bg-gray-100 dark:bg-[#111111] 
        border border-transparent dark:border-white/[0.1]
        flex flex-col
        ${onClick ? 'cursor-pointer dark:hover:bg-[#161616]' : ''} 
        ${className}
      `}
      whileHover={{
        scale: 1.02,
        y: -4,
        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {children}
    </motion.div>
  );
};
