import React from 'react';

export const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={`grid grid-cols-1 laptop:grid-cols-4 gap-4 max-w-7xl mx-auto w-full p-4 laptop:auto-rows-[18rem] ${className}`}
    >
      {children}
    </div>
  );
};

export const BentoItem2 = ({ className, children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-3xl group/bento p-6
        border border-transparent dark:border-white/[0.1]
        hover:shadow-lg transition duration-200 
        flex flex-col
        ${onClick ? 'cursor-pointer hover:bg-gray-200 dark:hover:bg-[#161616]' : ''} 
        ${className}
      `}
    >
      {children}
    </div>
  );
};
