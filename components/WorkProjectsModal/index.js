import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../ProjectCard';
import StackFilter from '../StackFilter';
import projectsData from '../../data/projects-data.json';

export default function WorkProjectsModal({ isOpen, onClose }) {
  const [selectedStacks, setSelectedStacks] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // Get all unique stacks
  const allStacks = useMemo(() => {
    const stacks = new Set();
    projectsData.forEach(project => {
      project.stack.forEach(tech => stacks.add(tech));
    });
    return Array.from(stacks).sort();
  }, []);

  // Filter projects based on selected stacks
  const filteredProjects = useMemo(() => {
    if (selectedStacks.length === 0) return projectsData;
    
    return projectsData.filter(project =>
      selectedStacks.some(stack => project.stack.includes(stack))
    );
  }, [selectedStacks]);

  const toggleStack = (stack) => {
    setSelectedStacks(prev =>
      prev.includes(stack)
        ? prev.filter(s => s !== stack)
        : [...prev, stack]
    );
  };

  const clearAll = () => {
    setSelectedStacks([]);
  };

  const handleProjectClick = (project) => {
    window.open(project.url, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-7xl max-h-[90vh] bg-white dark:bg-[#1c1c1c] rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/95 dark:bg-[#1c1c1c]/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  My Work
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Project Count and Filter Toggle */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Showing {filteredProjects.length} of {projectsData.length} projects
                </p>
                
                {/* Toggle Filter Button (Mobile Only) */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="md:hidden flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  {showFilters ? 'Hide' : 'Show'} Filters
                  {selectedStacks.length > 0 && (
                    <span className="px-2 py-0.5 bg-orange-500 text-white rounded-full text-xs">
                      {selectedStacks.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Stack Filter - Collapsible on Mobile */}
              <AnimatePresence>
                {(showFilters || window.innerWidth >= 768) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden md:!h-auto md:!opacity-100"
                  >
                    <StackFilter
                      allStacks={allStacks}
                      selectedStacks={selectedStacks}
                      onToggleStack={toggleStack}
                      onClearAll={clearAll}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Projects Grid */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={handleProjectClick}
                  />
                ))}
              </div>

              {/* Empty State */}
              {filteredProjects.length === 0 && (
                <motion.div
                  className="flex flex-col items-center justify-center py-20 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    No projects found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Try selecting different technologies
                  </p>
                  <button
                    onClick={clearAll}
                    className="px-6 py-2 bg-orange-500 text-white rounded-full font-medium hover:bg-orange-600 transition-colors"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
