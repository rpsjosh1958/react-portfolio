import { motion } from 'framer-motion';
import { 
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiNodedotjs,
  SiTailwindcss, SiFlutter, SiFigma, SiGit, SiReactnative, SiExpo
} from 'react-icons/si';

export default function AboutModal({ isOpen, onClose, data }) {
  if (!isOpen) return null;

  const skills = [
    { name: 'React', icon: <SiReact />, level: 95, color: 'text-[#61DAFB]' },
    { name: 'Next.js', icon: <SiNextdotjs />, level: 90, color: 'text-gray-800 dark:text-white' },
    { name: 'TypeScript', icon: <SiTypescript />, level: 85, color: 'text-[#3178C6]' },
    { name: 'React Native', icon: <SiReactnative />, level: 88, color: 'text-[#61DAFB]' },
    { name: 'Tailwind CSS', icon: <SiTailwindcss />, level: 95, color: 'text-[#06B6D4]' },
    { name: 'Flutter', icon: <SiFlutter />, level: 75, color: 'text-[#02569B]' },
    { name: 'Node.js', icon: <SiNodedotjs />, level: 80, color: 'text-[#339933]' },
    { name: 'Figma', icon: <SiFigma />, level: 85, color: 'text-[#F24E1E]' },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#1c1c1c] rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', duration: 0.5 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-orange-500 to-pink-500 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-white">
              Hey, I'm {data?.name || 'Josh'}! 👋
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
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)] space-y-8">
          {/* About Me */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">💼</span> About Me
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {data?.aboutpara || "I'm a passionate full-stack developer specializing in building exceptional digital experiences. With expertise in modern web technologies and a keen eye for design, I create seamless, user-friendly applications."}
            </p>
          </section>

          {/* What I Do */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">🚀</span> What I Do
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-2xl border border-orange-200 dark:border-orange-800">
                <div className="text-3xl mb-2">🌐</div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Web Development</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Building responsive, performant web applications with React, Next.js, and modern frameworks
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl border border-blue-200 dark:border-blue-800">
                <div className="text-3xl mb-2">📱</div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Mobile Development</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Creating cross-platform mobile apps with React Native and Expo for iOS & Android
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl border border-purple-200 dark:border-purple-800">
                <div className="text-3xl mb-2">🎨</div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">UI/UX Design</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Crafting beautiful, intuitive interfaces with Figma and modern design principles
                </p>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl border border-green-200 dark:border-green-800">
                <div className="text-3xl mb-2">⚡</div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-2">Full-Stack Solutions</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  End-to-end development from database design to deployment and maintenance
                </p>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">⚙️</span> Skills & Technologies
            </h3>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="space-y-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-xl ${skill.color}`}>{skill.icon}</span>
                      <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                    </div>
                    <span className="text-sm font-bold text-gray-600 dark:text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1, ease: 'easeOut' }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="text-2xl">📬</span> Get In Touch
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Interested in working together? Feel free to reach out!
            </p>
            <div className="flex flex-wrap gap-3">
              {data?.socials?.map((social) => (
                <a
                  key={social.platform}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300"
                >
                  {social.platform}
                </a>
              ))}
            </div>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
}
