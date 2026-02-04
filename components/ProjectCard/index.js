import { motion } from 'framer-motion';

export default function ProjectCard({ project, onClick }) {
  // Map tech stack to colors
  const getStackColor = (tech) => {
    const colors = {
      'React': 'text-[#61DAFB] bg-[#61DAFB]/10',
      'Next.js': 'text-gray-900 dark:text-white bg-gray-900/10 dark:bg-white/10',
      'TypeScript': 'text-[#3178C6] bg-[#3178C6]/10',
      'JavaScript': 'text-[#F7DF1E] bg-[#F7DF1E]/10',
      'Tailwind CSS': 'text-[#06B6D4] bg-[#06B6D4]/10',
      'Firebase': 'text-[#FFCA28] bg-[#FFCA28]/10',
      'WordPress': 'text-[#21759B] bg-[#21759B]/10',
      'Expo': 'text-[#000020] dark:text-white bg-[#000020]/10 dark:bg-white/10',
      'React Native': 'text-[#61DAFB] bg-[#61DAFB]/10',
      'Chakra UI': 'text-[#319795] bg-[#319795]/10',
      'Resend': 'text-black dark:text-white bg-black/10 dark:bg-white/10',
    };
    return colors[tech] || 'text-gray-600 dark:text-gray-400 bg-gray-600/10';
  };

  return (
    <motion.div
      className="group relative bg-white dark:bg-[#111] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-orange-500/30 transition-all duration-300 cursor-pointer"
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick && onClick(project)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Project Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-900">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Badge */}
        <div className="absolute top-3 right-3 px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
          {project.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Title & Year */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-orange-500 transition-colors">
            {project.title}
          </h3>
          <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0">{project.year}</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.stack.slice(0, 4).map((tech, index) => (
            <span
              key={index}
              className={`text-xs px-2 py-1 rounded-md font-medium ${getStackColor(tech)}`}
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 4 && (
            <span className="text-xs px-2 py-1 rounded-md font-medium text-gray-500 bg-gray-500/10">
              +{project.stack.length - 4}
            </span>
          )}
        </div>

        {/* Visit Link */}
        <div className="flex items-center gap-2 text-orange-500 font-medium text-sm pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <span>Visit Project</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
}
