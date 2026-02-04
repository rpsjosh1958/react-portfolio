import { motion } from 'framer-motion';

export default function StackFilter({ allStacks, selectedStacks, onToggleStack, onClearAll }) {
  return (
    <div className="flex flex-wrap gap-2">
      {/* All Button */}
      <motion.button
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
          selectedStacks.length === 0
            ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
        onClick={onClearAll}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        All
      </motion.button>

      {/* Stack Filters */}
      {allStacks.map((stack) => (
        <motion.button
          key={stack}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedStacks.includes(stack)
              ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
          onClick={() => onToggleStack(stack)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {stack}
        </motion.button>
      ))}
    </div>
  );
}
