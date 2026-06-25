import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { BentoItem } from "../components/Bento";
import Modal from "../components/Modal";
import CustomLoader from "../components/Loader";
import WorkProjectsModal from "../components/WorkProjectsModal";
import AboutModal from "../components/AboutModal";
import ExperiencesModal from "../components/ExperiencesModal";
import { getAllPosts } from "../utils/api";
import { ISOToDate } from "../utils";

import data from "../data/portfolio.json";
import { BentoItem2 } from "../components/Bento2";

import { 
  SiReact, SiJavascript, SiTypescript, SiHtml5, SiCss3, SiFlutter,
  SiNextdotjs, SiNodedotjs, SiTailwindcss, SiBootstrap, SiWordpress,
  SiAdobephotoshop, SiAdobeillustrator, SiAdobeaftereffects,  
  SiAdobelightroom, SiFigma, SiGit, SiExpo, SiApplepodcasts, SiSpotify
} from 'react-icons/si';

// UI Icons
const GlobeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S13.636 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.514 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.546-3.131 1.57-4.297" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </svg>
);

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>
);


const TECH_ITEMS = [
  { id: 'react', icon: <SiReact />, color: 'text-[#61DAFB]', name: 'React' },
  { id: 'nextjs', icon: <SiNextdotjs />, color: 'text-gray-800 dark:text-white', name: 'Next.js' },
  { id: 'typescript', icon: <SiTypescript />, color: 'text-[#3178C6]', name: 'TypeScript' },
  { id: 'javascript', icon: <SiJavascript />, color: 'text-[#F7DF1E]', name: 'JavaScript' },
  { id: 'nodejs', icon: <SiNodedotjs />, color: 'text-[#339933]', name: 'Node.js' },
  { id: 'html', icon: <SiHtml5 />, color: 'text-[#E34F26]', name: 'HTML5' },
  { id: 'css', icon: <SiCss3 />, color: 'text-[#1572B6]', name: 'CSS3' },
  { id: 'tailwind', icon: <SiTailwindcss />, color: 'text-[#06B6D4]', name: 'Tailwind' },
  { id: 'bootstrap', icon: <SiBootstrap />, color: 'text-[#7952B3]', name: 'Bootstrap' },
  { id: 'flutter', icon: <SiFlutter />, color: 'text-[#02569B]', name: 'Flutter' },
  { id: 'wordpress', icon: <SiWordpress />, color: 'text-[#21759B]', name: 'WordPress' },
  { id: 'photoshop', icon: <SiAdobephotoshop />, color: 'text-[#31A8FF]', name: 'Photoshop' },
  { id: 'illustrator', icon: <SiAdobeillustrator />, color: 'text-[#FF9A00]', name: 'Illustrator' },
  { id: 'aftereffects', icon: <SiAdobeaftereffects />, color: 'text-[#9999FF]', name: 'After Effects' },
  { id: 'lightroom', icon: <SiAdobelightroom />, color: 'text-[#31A8FF]', name: 'Lightroom' },
  { id: 'figma', icon: <SiFigma />, color: 'text-[#F24E1E]', name: 'Figma' },
  { id: 'git', icon: <SiGit />, color: 'text-[#F05032]', name: 'Git' },
  { id: 'expo', icon: <SiExpo />, color: 'text-[#000020] dark:text-white', name: 'Expo' },
];

const TechGrid = () => {
    const [displayItems, setDisplayItems] = useState(TECH_ITEMS.slice(0, 9));
    const [fadingIndex, setFadingIndex] = useState(-1);

    useEffect(() => {
        const interval = setInterval(() => {
            const slotToSwap = Math.floor(Math.random() * 9);
            setFadingIndex(slotToSwap);

            setTimeout(() => {
                setDisplayItems(prev => {
                    const newItems = [...prev];
                    const displayedIds = new Set(newItems.map(i => i.id));
                    const available = TECH_ITEMS.filter(i => !displayedIds.has(i.id));
                    
                    if (available.length > 0) {
                         const randomReplacement = available[Math.floor(Math.random() * available.length)];
                         newItems[slotToSwap] = randomReplacement;
                    }
                    return newItems;
                });
                setFadingIndex(-1);
            }, 500); 
        }, 2000); 

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-3 grid-rows-3 gap-4 w-full h-full p-4 place-items-center">
            {displayItems.map((item, index) => (
                <div 
                    key={`${item.id}-${index}`} 
                    className={`
                        flex items-center justify-center text-5xl
                        transition-all duration-500 ease-in-out transform
                        ${item.color}
                        ${fadingIndex === index ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}
                    `}
                >
                    {item.icon}
                </div>
            ))}
        </div>
    );
};

const Loader = () => (
  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-500"></div>
);

// NPC Modal Content Component
const NpcModalContent = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full relative min-h-[250px] flex items-center justify-center">
      {isLoading && (
         <div className="absolute inset-0 flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a] z-10">
            <Loader />
         </div>
      )}
      <iframe 
        src="https://npc.aikins.xyz/u/ysljosh" 
        className="w-full min-h-[250px] border-none rounded-lg overflow-hidden" 
        title="NPC Profile"
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
};

// Now Playing Component
const NowPlaying = () => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(Date.now());
  const profileUrl = "https://npc.aikins.xyz/u/ysljosh";

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshKey(Date.now());
      setIsLoading(true); // Reset loading on refresh
    }, 180000); // 3 minutes

    return () => clearInterval(interval);
  }, []);

  const imageUrl = `https://npc-api.aikins.xyz/v1/users/ysljosh/card.png?theme=dark&orientation=horizontal&t=${refreshKey}`;

  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a] dark:bg-[#0a0a0a] z-10">
           <Loader />
        </div>
      )}
      {!hasError ? (
         <div className="w-full h-full flex items-center justify-center hover:opacity-90 transition">
             <img 
               src={imageUrl} 
               alt="Now Playing" 
               className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
               onLoad={() => setIsLoading(false)}
               onError={() => {
                 setHasError(true);
                 setIsLoading(false);
               }}
             />
         </div>
      ) : (
         <div className="flex flex-col items-center justify-center text-center p-4 animate-in fade-in zoom-in duration-500">
             <span className="text-4xl mb-2">😴</span>
             <h3 className="text-xl font-bold dark:text-white text-gray-800">Josh is asleep</h3>
             <p className="text-xs text-gray-500 mt-1">Check back later</p>
         </div>
      )}
    </div>
  );
};

export default function Home({ latestPost }) {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [workModalOpen, setWorkModalOpen] = useState(false);
  const [aboutModalOpen, setAboutModalOpen] = useState(false);
  const [experiencesModalOpen, setExperiencesModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", content: null, panelClassName: "" });

  useEffect(() => {
    setMounted(true);
  }, []);

  const openModal = (title, content, panelClassName = "") => {
    setModalContent({ title, content, panelClassName });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const yearsExp = 3; 
  const projectCount = data.projects.length + (data.services.length * 5);

  if (!mounted) return null;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <>
      <AnimatePresence>
        {loading && <CustomLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      <div className="h-screen w-screen overflow-hidden bg-white dark:bg-black transition-colors duration-300 font-sans selection:bg-orange-500 selection:text-white flex flex-col">

      <Head>
        <title>{data.name} - Portfolio</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" /> 
      </Head>

      <nav className="p-4 flex justify-center shrink-0 z-50">
        <div className="bg-gray-100 dark:bg-[#151515]/90 backdrop-blur-md rounded-full px-6 py-2 flex items-center justify-between w-full max-w-7xl shadow-sm border border-gray-200 dark:border-gray-800/50">
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-black dark:text-white">{data.name}</span>
            <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse"></div>
          </div>
          
          <div className="flex items-center gap-6 text-sm font-medium text-gray-600 dark:text-gray-300">
            <button onClick={() => setWorkModalOpen(true)} className="hover:text-black dark:hover:text-white transition">Work</button>
            
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-1.5 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 px-4 pb-4 overflow-hidden flex items-center justify-center">
        <motion.div 
          className="w-full max-w-[1600px] h-full grid grid-cols-1 laptop:grid-cols-4 laptop:grid-rows-4 gap-3 laptop:gap-4 overflow-y-auto laptop:overflow-y-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          <BentoItem 
             className="laptop:col-span-1 laptop:row-span-1 bg-gray-100 dark:bg-[#0a0a0a] flex flex-col justify-center border-l-4 border-orange-500 min-h-[150px] laptop:min-h-0"
          >
            <h1 className="text-xl laptop:text-2xl desktop:text-3xl laptopl:text-4xl font-bold text-gray-800 dark:text-white leading-tight">
              Hey I&apos;m {data.name}
            </h1>
            <p className="text-[10px] desktop:text-xs laptopl:text-sm text-gray-500 dark:text-gray-300 mt-1 font-bold">
              Product Designer • Software Engineer • Frontend Developer
            </p>
          </BentoItem>

          <BentoItem 
            className="laptop:col-span-1 laptop:row-span-1 bg-orange-600 dark:bg-orange-600 justify-center text-white flex items-center gap-3 min-h-[100px] laptop:min-h-0"
          >
            <div className="p-2 bg-white/20 rounded-full shrink-0">
              <GlobeIcon />
            </div>
            <div>
               <p className="text-white font-bold text-xl desktop:text-2xl laptopl:text-3xl tracking-widest leading-none">ACCRA, Ghana</p>
            </div>
          </BentoItem>

          <BentoItem2 className="order-5 laptop:order-none laptop:col-span-1 laptop:row-span-1 bg-transparent !p-0 border-none hover:shadow-none flex flex-col gap-2 min-h-[100px] laptop:min-h-0">
             <div className="grid grid-cols-2 gap-2 h-full">
               {data.socials.slice(0, 4).map(social => (
                 <a 
                   key={social.id} 
                   href={social.link} 
                   target="_blank" 
                   rel="noreferrer"
                   className="flex items-center justify-center bg-gray-200 dark:bg-[#111] rounded-2xl text-[10px] desktop:text-xs border border-white/5 font-bold hover:bg-gray-300 dark:hover:bg-[#1f1f1f] transition-all text-gray-700 dark:text-gray-200 border border-transparent hover:border-orange-500/30"
                  >
                   {social.title} ↗
                 </a>
               ))}
             </div>
          </BentoItem2>

          <BentoItem
             className="order-6 laptop:order-none laptop:col-span-1 laptop:row-span-1 flex items-center justify-center bg-[#1a1a1a] dark:bg-[#0a0a0a] text-gray-300 overflow-hidden relative min-h-[150px] laptop:min-h-0"
             onClick={() => openModal('What I Do', 
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
                  <div className="space-y-2">
                     <h3 className="text-xl font-bold text-black dark:text-white">Graphic Design</h3>
                     <p className="text-gray-400 text-sm leading-relaxed">I create bold and eye-catching visuals using Adobe Photoshop and Illustrator from logos to full brand kits. Whether it’s social media content, flyers, or visual storytelling, I blend creativity and precision to help your brand stand out.</p>
                  </div>
                  <div className="space-y-2">
                     <h3 className="text-xl font-bold text-black dark:text-white">Web Design</h3>
                     <p className="text-gray-400 text-sm leading-relaxed">I build responsive and modern websites using WordPress - HTML, CSS, Tailwind, and Bootstrap. Every layout is designed with user experience in mind — clean, intuitive, and perfectly aligned with your brand’s look and feel.</p>
                  </div>
                  <div className="space-y-2">
                     <h3 className="text-xl font-bold text-black dark:text-white">UI/UX</h3>
                     <p className="text-gray-400 dark:text-gray-300 text-sm leading-relaxed">I design seamless user experiences using Figma. From wireframes to high-fidelity interfaces, I focus on clarity, accessibility, and interaction — ensuring users enjoy every moment on your web or mobile app.</p>
                  </div>
                  <div className="space-y-2">
                     <h3 className="text-xl font-bold text-black dark:text-white">Animation, Editing & Streaming</h3>
                     <p className="text-gray-400 text-sm leading-relaxed">I edit videos using CapCut and AfterEffects to create engaging social content, reels, promos, and recap videos. From subtle color grading to dynamic transitions and overlays, my edits bring out the best in your footage — and I can support live streaming setups too.</p>
                  </div>
                  <div className="space-y-2">
                     <h3 className="text-xl font-bold text-black dark:text-white">Mobile App Development</h3>
                     <p className="text-gray-400 text-sm leading-relaxed">I build sleek and scalable mobile apps using React Native, TypeScript, and Expo. With a sharp eye for design and usability, I ensure your app is fast, functional, and works beautifully on both iOS and Android.</p>
                  </div>
                  <div className="space-y-2">
                     <h3 className="text-xl font-bold text-black dark:text-white">Web App Development</h3>
                     <p className="text-gray-400 text-sm leading-relaxed">Using JavaScript, React, Next.js, and TypeScript, I develop web applications that are responsive, SEO-friendly, and scalable. With Tailwind or Bootstrap for styling and intuitive UI design, your app will not only work smoothly — it’ll look amazing too.</p>
                  </div>
               </div>
             )}
          >
             <h3 className="font-bold text-lg desktop:text-xl laptopl:text-2xl z-10 text-gray-700 dark:text-white">What I Do?</h3>
          </BentoItem>

          <BentoItem
            className="order-3 laptop:order-none laptop:col-span-1 laptop:row-span-4 p-0 overflow-hidden relative group rounded-[2rem] min-h-[500px] laptop:min-h-0"
            onClick={() => openModal('Profile', <img src="/images/IMG_8199.JPG" alt="Josh Profile" className="w-full rounded-xl" />)}
          >
            <img 
              src="/images/IMG_8199.JPG" 
              alt="Profile" 
              className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </BentoItem>

          {/* COL 3 */}
          <BentoItem2 className="order-7 laptop:order-none laptop:col-span-1 laptop:row-span-1 !p-0 bg-transparent border-none hover:shadow-none min-h-[100px] laptop:min-h-0">
             <div className="grid grid-cols-2 grid-rows-1 gap-3 h-full">
                <div className="bg-[#111] rounded-2xl flex flex-col justify-center items-center text-center p-2 border border-white/5">
                   <span className="text-2xl desktop:text-3xl laptopl:text-4xl font-bold text-white">{yearsExp}+</span>
                   <span className="text-[10px] desktop:text-xs text-gray-400 uppercase">Years</span>
                </div>
                <div className="bg-[#111] rounded-2xl flex flex-col justify-center items-center text-center p-2 border border-white/5">
                   <span className="text-2xl desktop:text-3xl laptopl:text-4xl font-bold text-white">{projectCount}+</span>
                   <span className="text-[10px] desktop:text-xs text-gray-400 uppercase">Projects</span>
                </div>
             </div>
          </BentoItem2>

           {/* Experience MOVED to Col 3 */}
          <BentoItem
             className="order-8 laptop:order-none laptop:col-span-1 laptop:row-span-1 bg-gray-100 dark:bg-[#0a0a0a] overflow-hidden flex flex-col justify-center gap-1.5 min-h-[120px] laptop:min-h-0"
          >
            <div className="flex items-center gap-2 p-1.5 bg-white dark:bg-[#141414] rounded-xl shadow-sm">
                 <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-bold text-[9px] ring-2 ring-gray-100 dark:ring-[#0a0a0a] shrink-0">Pa</div>
                 <div className="min-w-0">
                    <h4 className="font-bold text-[9px] desktop:text-[11px] laptopl:text-xs dark:text-white leading-none truncate">Mobile App Developer</h4>
                    <p className="text-[9px] desktop:text-[11px] laptopl:text-xs text-gray-500 dark:text-gray-300 truncate mt-0.5">Affinity Africa • 2026 - Present</p>
                 </div>
             </div>
             <div className="flex items-center gap-2 p-1.5 bg-white dark:bg-[#141414] rounded-xl shadow-sm">
                 <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-bold text-[9px] ring-2 ring-gray-100 dark:ring-[#0a0a0a] shrink-0">Pa</div>
                 <div className="min-w-0">
                    <h4 className="font-bold text-[9px] desktop:text-[11px] laptopl:text-xs dark:text-white leading-none truncate">Frontend Engineer</h4>
                    <p className="text-[9px] desktop:text-[11px] laptopl:text-xs text-gray-500 dark:text-gray-300 truncate mt-0.5">Pandora Software Consulting • 2024 - 2026</p>
                 </div>
             </div>
             <div className="flex items-center gap-2 p-1.5 bg-white dark:bg-[#141414] rounded-xl shadow-sm">
                 <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-bold text-[9px] ring-2 ring-gray-100 dark:ring-[#0a0a0a] shrink-0">Go</div>
                 <div className="min-w-0">
                    <h4 className="font-bold text-[9px] desktop:text-[11px] laptopl:text-xs dark:text-white leading-none truncate">Web Designer</h4>
                    <p className="text-[9px] desktop:text-[11px] laptopl:text-xs text-gray-500 dark:text-gray-300 truncate mt-0.5">Golden Ants Technologies • 2023 - Present</p>
                 </div>
             </div>
          </BentoItem>

          <BentoItem
            className="order-9 laptop:order-none laptop:col-span-1 laptop:row-span-1 bg-black dark:bg-[#0a0a0a] text-white flex flex-row items-center justify-center gap-4 relative"
            onClick={() => window.location.href = `mailto:${data.email || 'tettehjosh5@gmail.com'}`}
          >
             <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center animate-bounce">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
             </div>
             <div>
                <h2 className="text-sm desktop:text-base font-bold text-black dark:text-white">Project in mind?</h2>
                <span className="text-orange-500 font-bold text-2xl desktop:text-3xl cursor-pointer hover:underline">
                  Let&apos;s Talk
                </span>
             </div>
          </BentoItem>

          {/* Blog — Latest Post */}
          <BentoItem
            className="order-4 laptop:order-none laptop:col-span-1 laptop:row-span-1 bg-[#111113] flex flex-col justify-between relative overflow-hidden group min-h-[150px] laptop:min-h-0 !p-0 cursor-pointer"
            onClick={() => router.push('/blog')}
          >
            {/* ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.07] to-transparent pointer-events-none" />
            <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-orange-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-orange-500/20 transition-all duration-700" />

            <div className="relative z-10 p-4 h-full flex flex-col justify-between gap-2">
              {/* pulsing badge */}
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
                </span>
                <span className="text-[10px] tracking-widest uppercase font-mono text-orange-500">Latest Post</span>
              </div>

              {/* title + date */}
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <h3 className="text-white font-medium text-sm leading-snug line-clamp-2 group-hover:text-orange-400 transition-colors duration-300">
                  {latestPost?.title || 'Read the blog'}
                </h3>
                {latestPost && (
                  <p className="text-[11px] font-mono text-gray-600 mt-1">
                    {ISOToDate(latestPost.date)}
                  </p>
                )}
              </motion.div>

              {/* footer */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-gray-600 uppercase tracking-wider group-hover:text-orange-500 transition-colors duration-300">Read →</span>
                <span className="text-[10px] font-mono text-gray-700">Blog</span>
              </div>
            </div>
          </BentoItem>

          {/* COL 4 */}
          <BentoItem
             className="order-10 laptop:order-none laptop:col-span-1 laptop:row-span-2 bg-gray-100 dark:bg-[#0a0a0a] flex items-center justify-center p-0 min-h-[300px] laptop:min-h-0"
          >
              <TechGrid />
          </BentoItem>

          {/* New Experimental Card / NPC Music */}
          <BentoItem
             onClick={() => {}}
             className="order-11 laptop:order-none laptop:col-span-1 laptop:row-span-2 bg-[#1a1a1a] dark:bg-[#0a0a0a] flex flex-col items-center justify-center !p-0 overflow-hidden relative min-h-[300px] laptop:min-h-0"
          > 
             <div 
                className="absolute inset-0 z-20 cursor-pointer" 
                onClick={() => window.open('https://npc.aikins.xyz/u/ysljosh', '_blank')}
             />
             <iframe 
               src="https://npc.aikins.xyz/u/ysljosh" 
               className="absolute inset-0 w-[222%] h-[222%] border-none origin-top-left scale-[0.45]" 
               title="NPC Profile"
             />
          </BentoItem>

          <BentoItem
             className="order-12 laptop:order-none laptop:col-span-1 laptop:row-span-1 bg-[#2D2B42] flex flex-col justify-center p-3 relative overflow-hidden group border-none gap-2 min-h-[100px] laptop:min-h-0"
             onClick={() => openModal('Podcast', <div className="space-y-4 text-center"><h3 className="text-2xl font-bold">RPS RECAP</h3><p>{data.podcast?.description || "Josh's weekly adventures as a young adult."}</p><div className="flex justify-center gap-4 mt-4"><button className="px-4 py-2 bg-green-500 text-white rounded-full">Spotify</button><button className="px-4 py-2 bg-purple-600 text-white rounded-full">Apple</button></div></div>)}
          > 
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-lg tracking-tighter">RPS</span>
               </div>
               <div className="flex flex-col justify-center min-w-0">
                  <h3 className="text-black dark:text-white font-bold text-lg desktop:text-xl leading-tight truncate">RPS RECAP</h3>
                  <p className="text-[9px] desktop:text-xs text-gray-500 dark:text-gray-300 line-clamp-1">Josh&apos;s weekly adventures.</p>
               </div>
             </div>

             <div className="flex gap-2 w-full">
                 <a 
                   href="https://open.spotify.com/show/YOUR_SPOTIFY_SHOW_ID"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex-1 bg-[#1DB954] hover:bg-[#1ed760] text-black text-[9px] desktop:text-xs font-bold py-1 rounded-full flex items-center justify-center gap-1 transition-colors"
                 >
                    <SiSpotify className="w-4 h-4" /> Spotify
                 </a>
                 <a 
                   href="https://podcasts.apple.com/podcast/YOUR_PODCAST_ID"
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex-1 bg-[#8854D0] hover:bg-[#9b6add] text-white text-[9px] desktop:text-xs font-bold py-1 rounded-full flex items-center justify-center gap-1 transition-colors"
                 >
                    <SiApplepodcasts className="w-4 h-4" /> Apple
                 </a>
             </div>
          </BentoItem>

        </motion.div>
      </main>

      <Modal 
        isOpen={modalOpen} 
        closeModal={closeModal} 
        title={modalContent.title}
        panelClassName={modalContent.panelClassName}
      >
        {modalContent.content}
      </Modal>

      <WorkProjectsModal 
        isOpen={workModalOpen}
        onClose={() => setWorkModalOpen(false)}
      />

      <AboutModal 
        isOpen={aboutModalOpen}
        onClose={() => setAboutModalOpen(false)}
        data={data}
      />

      {/* <ExperiencesModal
        isOpen={experiencesModalOpen}
        onClose={() => setExperiencesModalOpen(false)}
        experiences={data.resume?.experiences || []}
      /> */}
    </div>
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts(["slug", "title", "date"]);
  return {
    props: {
      latestPost: posts[0] || null,
    },
  };
}