import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { useTheme } from "next-themes";
import { BentoItem } from "../components/Bento";
import Modal from "../components/Modal";

import data from "../data/portfolio.json";
import { BentoItem2 } from "../components/Bento2";

// --- Icons ---
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

// Tech Icons
const ReactIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M12 0c-1.7 0-3.3 1.1-4.7 3.1-1.4-2-3-3.1-4.7-3.1C1.2 0 0 2 0 4.5c0 1.2.3 2.9 1 4.5C2.6 5.1 6.8 2.6 12 2.6s9.4 2.5 11 6.4c.7-1.6 1-3.3 1-4.5C24 2 22.8 0 21.3 0c-1.7 0-3.3 1.1-4.7 3.1-1.4-2-3-3.1-4.7-3.1zM12 5.1c-2.4 0-4.6 1.1-5.9 2.8 1.8.8 4 1.2 5.9 1.2 1.9 0 4.1-.4 5.9-1.2-1.3-1.7-3.5-2.8-5.9-2.8zm0 5.4c-2.6 0-5.1.7-7.2 1.8-.7 1.4-1.1 2.9-1.1 4.2 0 3.8 3.7 6.9 8.3 6.9 4.6 0 8.3-3.1 8.3-6.9 0-1.3-.4-2.8-1.1-4.2-2.1-1.1-4.6-1.8-7.2-1.8zm0 2.6c1.1 0 2.2.4 2.2 1.5 0 1.1-1.1 2-2.2 2s-2.2-.9-2.2-2 1.1-1.5 2.2-1.5z"/></svg>;
const JsIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 rounded"><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.751-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.958-.42.858-1.307 1.08-2.673.657l-.311-2.178c.87.556.975.292.975-.348V11.03z"/></svg>;
const TsIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 rounded"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zM15.263 17.513c-1.163 1.163-2.6 1.65-4.275 1.438-1.738-.213-3.088-1.588-3.3-3.325.212 1.737 1.562 3.112 3.3 3.325 1.675.212 3.112-.275 4.275-1.438zm-3.5-6.8h.013c.6 0 .8.088 1.163.463-.363-.375-.563-.463-1.163-.463H6v12h1.5v-5.25h4.275V10.713H6v-3h1.5v3h4.263zm8.25 0h.013c.6 0 .8.088 1.163.463-.363-.375-.563-.463-1.163-.463H15.15v1.5h1.5v3.75c0 .325.025.65.075.975.05.325.163.638.338.913.175.275.4.5.675.663.275.163.588.238.913.238h1.125v-1.5h-.75c-.2 0-.388-.075-.525-.213-.138-.138-.213-.325-.213-.525V12.213h1.5v-1.5h-1.5z"/></svg>;
const HtmlIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l.232-2.718 10.125.003.23-2.715H4.815l.774 9.138h8.379l-.294 3.042-2.727.729-2.772-.741-.186-2.145H4.155l.39 5.343 6.402 1.83 6.342-1.803.882-9.963H8.531z"/></svg>;
const CssIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.525 5.56-4.273 1.341-4.148-1.303-.187-2.072H2.66l.46 5.8 7.828 2.228 7.863-2.258 1.218-11.917z"/></svg>;
const FlutterIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8"><path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.357L14.327 0H14.314zM14.314 24l-4.364-4.364 4.364-4.364L21.685 24h-7.371zM6 15.7l4.364 4.364 3.95-3.95L8.277 10.077 6 15.7z"/></svg>;
const FigmaIcon = () => <svg viewBox="0 0 38 57" fill="none" className="w-8 h-8"><path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#0ACF83"/><path d="M0 47.5a9.5 9.5 0 0 0 19 0V38H0v9.5z" fill="#0ACF83"/><path d="M0 28.5a9.5 9.5 0 0 0 19 0V19H0v9.5z" fill="#A259FF"/><path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E"/><path d="M28.5 0H19v19h9.5A9.5 9.5 0 0 0 28.5 0z" fill="#FF7262"/></svg>;
const SpotifyIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141 4.2-1.32 9.6-0.66 13.38 1.68.3.181.54.78.361 1.141zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.299z"/></svg>;
const ApplePodcastIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M22.5 12c0 5.799-4.701 10.5-10.5 10.5S1.5 17.799 1.5 12 6.201 1.5 12 1.5 22.5 6.201 22.5 12zm-3.5 0a1 1 0 00-1-1 7.994 7.994 0 00-2.316-5.631 1 1 0 10-1.414 1.414A5.992 5.992 0 0116 11a1 1 0 011 1 5.992 5.992 0 01-1.83 4.217 1 1 0 101.439 1.39A7.993 7.993 0 0019 12zm-4.5 0a1 1 0 00-1-1 3.5 3.5 0 00-1.125-2.583 1 1 0 10-1.309 1.517A1.5 1.5 0 1111 11a1 1 0 011 1 1.5 1.5 0 11-2.934.434 3.5 3.5 0 00-1.125 1.15 1 1 0 101.414 1.415A1.5 1.5 0 1113 13a1 1 0 011-1zm-6-5.657A1 1 0 007.5 5a10 10 0 017.071 2.929 1 1 0 10-1.414-1.414A7.992 7.992 0 008.5 6.343zM6 12a1 1 0 00-1-1 9.986 9.986 0 00-2.903-7.054 1 1 0 10-1.414 1.414A7.993 7.993 0 015 11v2a7.993 7.993 0 01-2.317 5.64 1 1 0 101.414 1.414A9.986 9.986 0 006 13V12z"/></svg>;


const PsIcon = () => (
    <div className="w-10 h-10 bg-[#31A8FF] text-[#001E36] rounded-lg flex items-center justify-center font-bold font-serif text-lg border-2 border-[#001E36]">Ps</div>
);

const AiIcon = () => (
    <div className="w-10 h-10 bg-[#FF9A00] text-[#330000] rounded-lg flex items-center justify-center font-bold font-serif text-lg border-2 border-[#330000]">Ai</div>
);

const AeIcon = () => (
    <div className="w-10 h-10 bg-[#00005B] text-[#D8A1FF] rounded-lg flex items-center justify-center font-bold font-serif text-lg border-2 border-[#D8A1FF]">Ae</div>
);

const LrIcon = () => (
    <div className="w-10 h-10 bg-[#31A8FF] text-[#001E36] rounded-lg flex items-center justify-center font-bold font-serif text-lg border-2 border-[#001E36]">Lr</div>
);

const CapCutIcon = () => (
  <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center font-bold text-sm">Cc</div>
);


const TECH_ITEMS = [
  { id: 'react', icon: <ReactIcon />, color: 'bg-transparent', text: 'text-[#61DAFB]' }, 
  { id: 'js', icon: <JsIcon />, color: 'bg-transparent', text: 'text-[#F7DF1E]' },
  { id: 'ts', icon: <TsIcon />, color: 'bg-transparent', text: 'text-[#3178C6]' },
  { id: 'html', icon: <HtmlIcon />, color: 'bg-transparent', text: 'text-[#E34F26]' },
  { id: 'css', icon: <CssIcon />, color: 'bg-transparent', text: 'text-[#1572B6]' },
  { id: 'flutter', icon: <FlutterIcon />, color: 'bg-transparent', text: 'text-[#02569B]' },
  { id: 'ps', icon: <PsIcon />, color: 'bg-transparent', text: '' }, 
  { id: 'ai', icon: <AiIcon />, color: 'bg-transparent', text: '' }, 
  { id: 'ae', icon: <AeIcon />, color: 'bg-transparent', text: '' }, 
  { id: 'lr', icon: <LrIcon />, color: 'bg-transparent', text: '' }, 
  { id: 'figma', icon: <FigmaIcon />, color: 'bg-transparent', text: '' }, 
  { id: 'capcut', icon: <CapCutIcon />, color: 'bg-transparent', text: '' }, 
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
                        flex items-center justify-center
                        transition-all duration-500 ease-in-out transform
                        ${item.color} ${item.text}
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

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
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

  return (
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
            <button onClick={() => openModal('About Me', <p className="text-lg leading-relaxed">{data.aboutpara}</p>)} className="hover:text-black dark:hover:text-white transition">Resume</button>
            <button onClick={() => openModal('My Work', <div className="grid grid-cols-1 gap-4">{data.projects.map(p => <div key={p.id} className="p-4 border dark:border-gray-700 rounded-lg"><h3 className="font-bold">{p.title}</h3><p>{p.description}</p><a href={p.url} target="_blank" className="text-blue-500 mt-2 block">View Project</a></div>)}</div>)} className="hover:text-black dark:hover:text-white transition">Work</button>
            
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
        <div className="w-full max-w-[1600px] h-full grid grid-cols-1 laptop:grid-cols-4 laptop:grid-rows-4 gap-3 laptop:gap-4 overflow-y-auto laptop:overflow-y-auto">
          
          <BentoItem 
             className="laptop:col-span-1 laptop:row-span-1 bg-gray-100 dark:bg-[#0a0a0a] flex flex-col justify-center border-l-4 border-orange-500 min-h-[150px] laptop:min-h-0"
             onClick={() => openModal('About', <p className="text-lg">{data.aboutpara}</p>)}
          >
            <h1 className="text-xl laptop:text-2xl desktop:text-3xl laptopl:text-4xl font-bold text-gray-800 dark:text-white leading-tight">
              Hey I'm {data.name}
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

          <BentoItem2 className="laptop:col-span-1 laptop:row-span-1 bg-transparent !p-0 border-none hover:shadow-none flex flex-col gap-2 min-h-[100px] laptop:min-h-0">
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
             className="laptop:col-span-1 laptop:row-span-1 flex items-center justify-center bg-[#1a1a1a] dark:bg-[#0a0a0a] text-gray-300 overflow-hidden relative min-h-[150px] laptop:min-h-0"
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
            className="laptop:col-span-1 laptop:row-span-4 p-0 overflow-hidden relative group rounded-[2rem] min-h-[500px] laptop:min-h-0"
            onClick={() => openModal('Profile', <img src="/images/IMG_8199.JPG" className="w-full rounded-xl" />)}
          >
            <img 
              src="/images/IMG_8199.JPG" 
              alt="Profile" 
              className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-700 ease-in-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </BentoItem>

          {/* COL 3 */}
          <BentoItem2 className="laptop:col-span-1 laptop:row-span-1 !p-0 bg-transparent border-none hover:shadow-none min-h-[100px] laptop:min-h-0">
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
             className="laptop:col-span-1 laptop:row-span-1 bg-gray-100 dark:bg-[#0a0a0a] overflow-hidden flex flex-col justify-center gap-1.5 min-h-[120px] laptop:min-h-0"
             onClick={() => openModal('Experiences', <div className="space-y-4">{data.resume.experiences.map((exp,i) => <div key={i}><h3 className="font-bold">{exp.position}</h3><p>{exp.dates}</p></div>)}</div>)}
          >
             <div className="flex items-center gap-2 p-1.5 bg-white dark:bg-[#141414] rounded-xl shadow-sm">
                 <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-bold text-[9px] ring-2 ring-gray-100 dark:ring-[#0a0a0a] shrink-0">Pa</div>
                 <div className="min-w-0">
                    <h4 className="font-bold text-[9px] desktop:text-[11px] laptopl:text-xs dark:text-white leading-none truncate">Frontend Engineer</h4>
                    <p className="text-[9px] desktop:text-[11px] laptopl:text-xs text-gray-500 dark:text-gray-300 truncate mt-0.5">Pandora Software Consulting • Present</p>
                 </div>
             </div>
             <div className="flex items-center gap-2 p-1.5 bg-white dark:bg-[#141414] rounded-xl shadow-sm">
                 <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center font-bold text-[9px] ring-2 ring-gray-100 dark:ring-[#0a0a0a] shrink-0">Go</div>
                 <div className="min-w-0">
                    <h4 className="font-bold text-[9px] desktop:text-[11px] laptopl:text-xs dark:text-white leading-none truncate">Web Designer</h4>
                    <p className="text-[9px] desktop:text-[11px] laptopl:text-xs text-gray-500 dark:text-gray-300 truncate mt-0.5">Golden Ants Technologies • Present</p>
                 </div>
             </div>
          </BentoItem>

          <BentoItem 
            className="laptop:col-span-1 laptop:row-span-1 bg-black dark:bg-[#0a0a0a] text-white flex flex-row items-center justify-center gap-4 relative"
            onClick={() => window.location.href = `mailto:${data.email || 'tettehjosh5@gmail.com'}`}
          >
             <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center animate-bounce">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
             </div>
             <div>
                <h2 className="text-sm desktop:text-base font-bold text-black dark:text-white">Project in mind?</h2>
                <span className="text-orange-500 font-bold text-2xl desktop:text-3xl cursor-pointer hover:underline">
                  Let's Talk
                </span>
             </div>
          </BentoItem>

          {/* Graphic Works */}
          <BentoItem 
            className="laptop:col-span-1 laptop:row-span-1 bg-slate-100 dark:bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden group min-h-[150px] laptop:min-h-0"
            onClick={() => openModal('Graphic Works', <p className="text-center">Gallery Coming Soon... Go back and tap the Pinterest!</p>)}
          >
             <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10"></div>
             <h3 className="font-bold text-lg z-10 text-gray-700 dark:text-white">Graphic Works</h3>
          </BentoItem>

          {/* COL 4 */}
          <BentoItem 
             className="laptop:col-span-1 laptop:row-span-2 bg-gray-100 dark:bg-[#0a0a0a] flex items-center justify-center p-0 min-h-[300px] laptop:min-h-0"
          >
              <TechGrid />
          </BentoItem>

          {/* New Experimental Card / NPC Music */}
          <BentoItem 
             onClick={() => {}}
             className="laptop:col-span-1 laptop:row-span-2 bg-[#1a1a1a] dark:bg-[#0a0a0a] flex flex-col items-center justify-center !p-0 overflow-hidden relative min-h-[300px] laptop:min-h-0"
          > 
             <div 
                className="absolute inset-0 z-20 cursor-pointer" 
                onClick={() => window.open('https://npc.aikins.xyz/u/ysljosh', '_blank')}
             />
             <iframe 
               src="https://npc.aikins.xyz/u/ysljosh" 
               className="absolute inset-0 w-[400%] h-[400%] border-none origin-top-left scale-[0.25]" 
               title="NPC Profile"
             />
          </BentoItem>

          <BentoItem 
             className="laptop:col-span-1 laptop:row-span-1 bg-[#2D2B42] flex flex-col justify-center p-3 relative overflow-hidden group border-none gap-2 min-h-[100px] laptop:min-h-0"
             onClick={() => openModal('Podcast', <div className="space-y-4 text-center"><h3 className="text-2xl font-bold">RPS RECAP</h3><p>{data.podcast?.description || "Josh's weekly adventures as a young adult."}</p><div className="flex justify-center gap-4 mt-4"><button className="px-4 py-2 bg-green-500 text-white rounded-full">Spotify</button><button className="px-4 py-2 bg-purple-600 text-white rounded-full">Apple</button></div></div>)}
          > 
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-lg tracking-tighter">RPS</span>
               </div>
               <div className="flex flex-col justify-center min-w-0">
                  <h3 className="text-black dark:text-white font-bold text-lg desktop:text-xl leading-tight truncate">RPS RECAP</h3>
                  <p className="text-[9px] desktop:text-xs text-gray-500 dark:text-gray-300 line-clamp-1">Josh's weekly adventures.</p>
               </div>
             </div>

             <div className="flex gap-2 w-full">
                 <button className="flex-1 bg-[#1DB954] hover:bg-[#1ed760] text-black text-[9px] desktop:text-xs font-bold py-1 rounded-full flex items-center justify-center gap-1 transition-colors">
                    <SpotifyIcon /> Spotify
                 </button>
                 <button className="flex-1 bg-[#8854D0] hover:bg-[#9b6add] text-white text-[9px] desktop:text-xs font-bold py-1 rounded-full flex items-center justify-center gap-1 transition-colors">
                    Apple
                 </button>
             </div>
          </BentoItem>

        </div>
      </main>

      <Modal 
        isOpen={modalOpen} 
        closeModal={closeModal} 
        title={modalContent.title}
        panelClassName={modalContent.panelClassName}
      >
        {modalContent.content}
      </Modal>
    </div>
  );
}