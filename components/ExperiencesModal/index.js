import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ExperiencesModal({ isOpen, onClose, experiences }) {
  const [selectedExp, setSelectedExp] = useState(null);

  if (!isOpen) return null;

  // Extended experience data with more details
  const extendedExperiences = experiences?.map((exp, index) => ({
    ...exp,
    period: exp.year || `202${3 - index} - 202${4 - index}`,
    location: exp.location || 'Remote',
    responsibilities: exp.responsibilities || [
      'Led development of key features',
      'Collaborated with cross-functional teams',
      'Implemented best practices and code reviews'
    ],
    achievements: exp.achievements || [
      'Improved performance by 40%',
      'Reduced bug count by 60%'
    ],
    technologies: exp.technologies || ['React', 'TypeScript', 'Next.js']
  })) || [];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-[#1c1c1c] rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-500 to-purple-500 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-white flex items-center gap-2">
              <span className="text-3xl">💼</span> Work Experience
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Timeline */}
          <div className="space-y-8">
            {extendedExperiences.map((exp, index) => (
              <motion.div
                key={exp.id || index}
                className="relative pl-8 pb-8 border-l-2 border-gray-300 dark:border-gray-700 last:border-l-0 last:pb-0"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Timeline dot */}
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-4 border-white dark:border-[#1c1c1c]" />

                {/* Card */}
                <div className="bg-gray-50 dark:bg-[#111] rounded-2xl p-6 hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-800">
                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {exp.title}
                      </h3>
                      <p className="text-lg text-blue-600 dark:text-blue-400 font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 text-right">
                      <p className="font-medium">{exp.period}</p>
                      <p>{exp.location}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {exp.description}
                  </p>

                  {/* Responsibilities */}
                  {exp.responsibilities && (
                    <div className="mb-4">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">Key Responsibilities:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={idx}>{resp}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Achievements */}
                  {exp.achievements && (
                    <div className="mb-4">
                      <h4 className="font-bold text-gray-900 dark:text-white mb-2">Achievements:</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technologies */}
                  {exp.technologies && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {exp.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {extendedExperiences.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">💼</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                No experiences yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Check back soon for updates!
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
