import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion, animate } from "framer-motion";
import { getAllPosts } from "../utils/api";
import { ISOToDate } from "../utils";
import CustomLoader from "../components/Loader";
import {
  SiReact, SiJavascript, SiTypescript, SiHtml5, SiCss3, SiFlutter, SiDart,
  SiNextdotjs, SiNodedotjs, SiTailwindcss, SiBootstrap, SiWordpress,
  SiAdobephotoshop, SiAdobeillustrator, SiAdobeaftereffects,
  SiAdobelightroom, SiFigma, SiGit, SiExpo
} from 'react-icons/si';

import data from "../data/portfolio.json";
import projects from "../data/projects-data.json";

const SECTIONS = [["s-intro", "Intro"], ["s-work", "Work"], ["s-services", "Services"], ["s-about", "Experience"], ["s-writing", "Writing"]];

const SERVICES = [
  ["Web App Development", "Using JavaScript, TypeScript, React and Next.js — or Dart with Flutter and Jaspr — I develop web applications that are responsive, SEO-friendly, and scalable. With Tailwind or Bootstrap for styling and intuitive UI design, your app will not only work smoothly — it’ll look amazing too."],
  ["Mobile App Development", "I build sleek and scalable mobile apps using Flutter and Dart, or React Native, TypeScript and Expo. With a sharp eye for design and usability, I ensure your app is fast, functional, and works beautifully on both iOS and Android."],
  ["Web Design", "I build responsive and modern websites using WordPress - HTML, CSS, Tailwind, and Bootstrap. Every layout is designed with user experience in mind — clean, intuitive, and perfectly aligned with your brand’s look and feel."],
  ["Graphic Design", "I create bold and eye-catching visuals using Adobe Photoshop and Illustrator from logos to full brand kits. Whether it’s social media content, flyers, or visual storytelling, I blend creativity and precision to help your brand stand out."],
  ["UI/UX", "I design seamless user experiences using Figma. From wireframes to high-fidelity interfaces, I focus on clarity, accessibility, and interaction — ensuring users enjoy every moment on your web or mobile app."],
  ["Animation, Editing & Streaming", "I edit videos using CapCut and AfterEffects to create engaging social content, reels, promos, and recap videos. From subtle color grading to dynamic transitions and overlays, my edits bring out the best in your footage — and I can support live streaming setups too."],
  
  
];

const EXPERIENCE = [
  ["Mobile App Developer", "Affinity Africa", "2026—Now"],
  ["Frontend Engineer", "Pandora Software Consulting", "2024—2026"],
  ["Web Designer", "Golden Ants Technologies", "2023—Now"],
];

const TECH_ITEMS = [
  { id: 'react', icon: <SiReact />, color: 'text-[#61DAFB]', name: 'React' },
  { id: 'nextjs', icon: <SiNextdotjs />, color: 'text-white', name: 'Next.js' },
  { id: 'typescript', icon: <SiTypescript />, color: 'text-[#3178C6]', name: 'TypeScript' },
  { id: 'javascript', icon: <SiJavascript />, color: 'text-[#F7DF1E]', name: 'JavaScript' },
  { id: 'nodejs', icon: <SiNodedotjs />, color: 'text-[#339933]', name: 'Node.js' },
  { id: 'html', icon: <SiHtml5 />, color: 'text-[#E34F26]', name: 'HTML5' },
  { id: 'css', icon: <SiCss3 />, color: 'text-[#1572B6]', name: 'CSS3' },
  { id: 'tailwind', icon: <SiTailwindcss />, color: 'text-[#06B6D4]', name: 'Tailwind' },
  { id: 'bootstrap', icon: <SiBootstrap />, color: 'text-[#7952B3]', name: 'Bootstrap' },
  { id: 'flutter', icon: <SiFlutter />, color: 'text-[#02569B]', name: 'Flutter' },
  { id: 'dart', icon: <SiDart />, color: 'text-[#0175C2]', name: 'Dart' },
  { id: 'wordpress', icon: <SiWordpress />, color: 'text-[#21759B]', name: 'WordPress' },
  { id: 'photoshop', icon: <SiAdobephotoshop />, color: 'text-[#31A8FF]', name: 'Photoshop' },
  { id: 'illustrator', icon: <SiAdobeillustrator />, color: 'text-[#FF9A00]', name: 'Illustrator' },
  { id: 'aftereffects', icon: <SiAdobeaftereffects />, color: 'text-[#9999FF]', name: 'After Effects' },
  { id: 'lightroom', icon: <SiAdobelightroom />, color: 'text-[#31A8FF]', name: 'Lightroom' },
  { id: 'figma', icon: <SiFigma />, color: 'text-[#F24E1E]', name: 'Figma' },
  { id: 'git', icon: <SiGit />, color: 'text-[#F05032]', name: 'Git' },
  { id: 'expo', icon: <SiExpo />, color: 'text-white', name: 'Expo' },
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
        <div className="grid grid-cols-3 grid-rows-3 gap-4 w-full flex-1 p-4 place-items-center">
            {displayItems.map((item, index) => (
                <div
                    key={`${item.id}-${index}`}
                    title={item.name}
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

const NPC_URL = "https://npc.aikins.xyz/u/ysljosh";
const YEARS = 3;
const featured = ["maleewa", "actually", "copdrop", "kamen"].map((id) => projects.find((p) => p.id === id));
const pad = (n) => String(n).padStart(2, "0");

const card = "border border-white/[.09] rounded-3xl bg-card";
const label = "font-geist-mono text-[11px] leading-none tracking-[.06em] uppercase";
const ease = "ease-[cubic-bezier(.2,.8,.2,1)]";
const reveal = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 1.1, ease: [0.2, 0.8, 0.2, 1] },
};

const Collapse = ({ open, children }) => (
  <div className={`grid transition-[grid-template-rows] duration-500 ${ease} ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`} inert={open ? undefined : ""}>
    <div className="overflow-hidden">{children}</div>
  </div>
);

const NpcCard = ({ className }) => {
  const [failed, setFailed] = useState(false);
  return (
    <a href={NPC_URL} target="_blank" rel="noreferrer" className={`${card} p-6 flex-col justify-between gap-5 ${className}`}>
      <span className={`${label} text-mute`}>Status · NPC</span>
      {failed ? (
        <span className="font-display text-[28px] leading-none">ysljosh is <span className="italic text-mute">offline</span></span>
      ) : (
        <img src="https://npc-api.aikins.xyz/v1/users/ysljosh/card.png?theme=dark&orientation=horizontal" alt="Now playing on NPC" className="w-full rounded-xl" onError={() => setFailed(true)} />
      )}
    </a>
  );
};

const Stat = ({ name, value }) => (
  <div className={`${card} p-5 laptop:p-6 flex flex-col justify-between gap-[30px] min-h-[150px] laptop:min-h-[200px]`}>
    <span className={`${label} text-mute`}>{name}</span>
    <span className="font-display text-[72px] laptop:text-[96px] leading-[.8] tracking-[-.04em]">
      {value}<span className="text-acc">+</span>
    </span>
  </div>
);

export default function Home({ latestPost }) {
  const [time, setTime] = useState("--:--");
  const [k, setK] = useState(0);
  const [active, setActive] = useState("s-intro");
  const [open, setOpen] = useState(0);
  const [all, setAll] = useState(false);
  const [loading, setLoading] = useState(true);
  const done = useCallback(() => setLoading(false), []);

  useEffect(() => {
    if (loading) return;
    // page mounts after the splash, so start at the top regardless of the browser's restored scroll
    window.scrollTo(0, 0);
    const tick = () => setTime(new Date().toLocaleTimeString("en-GB", { timeZone: "Africa/Accra", hour: "2-digit", minute: "2-digit" }));
    tick();
    const t = setInterval(tick, 15000);
    const count = animate(0, 1, { duration: 1.4, delay: 0.5, ease: [0.33, 1, 0.68, 1], onUpdate: setK });
    const spy = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    SECTIONS.forEach(([id]) => spy.observe(document.getElementById(id)));
    return () => { clearInterval(t); count.stop(); spy.disconnect(); };
  }, [loading]);

  return (
    <>
    <Head>
      <title>{data.name} - Portfolio</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="preload" as="image" href="/images/IMG_8199.JPG" />
    </Head>
    {loading ? <CustomLoader onComplete={done} /> : (
    <div className="split font-geist antialiased bg-[#060606] text-ink min-h-screen grid grid-cols-1 laptop:grid-cols-[minmax(360px,42%)_minmax(0,1fr)]">
      <aside className="p-3.5 flex laptop:sticky laptop:top-0 laptop:h-screen">
        <div className="relative flex-1 rounded-3xl overflow-hidden bg-card2 flex flex-col justify-between animate-rise min-h-[min(88vh,640px)] laptop:min-h-0">
          <img src="/images/IMG_8199.JPG" alt={data.name} className="absolute inset-0 w-full h-full object-cover object-[50%_28%] grayscale contrast-[1.05] brightness-[.8]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,.55)_0%,rgba(0,0,0,0)_30%,rgba(0,0,0,.2)_55%,rgba(0,0,0,.92)_100%)]" />

          <div className="relative flex justify-between items-center px-6 py-[22px] text-white">
            <div className="flex items-center gap-2.5">
              <span className="font-semibold text-lg leading-none">{data.name}</span>
              <span className="w-2 h-2 rounded-full bg-acc animate-beat" />
            </div>
            <span className={`${label} opacity-80`}>Accra · {time}</span>
          </div>

          <div className="relative px-6 pt-[26px] pb-6 flex flex-col gap-[22px] text-white">
            <nav className="hidden laptop:flex flex-col gap-0.5">
              {SECTIONS.map(([id, name]) => (
                <a key={id} href={`#${id}`} className={`flex items-center gap-3 font-geist-mono text-xs leading-none tracking-[.06em] uppercase py-1.5 transition-colors duration-300 hover:text-white ${active === id ? "text-white" : "text-white/45"}`}>
                  <span className={`block h-px bg-current transition-[width] duration-500 ${ease} ${active === id ? "w-9" : "w-3"}`} />
                  {name}
                </a>
              ))}
            </nav>
            <h1 className="font-display text-[clamp(56px,6vw,104px)] leading-[.86] tracking-[-.035em]">
              Hey, I&apos;m<br /><span className="italic text-acc">{data.name}.</span>
            </h1>
            <p className="text-[15px] leading-[1.45] text-white/80 max-w-[36ch]">Product designer, software engineer &amp; frontend developer based in Accra, Ghana.</p>
            <div className="grid grid-cols-2 min-[520px]:grid-cols-4 gap-1.5">
              {data.socials.slice(0, 4).map((s) => (
                <a key={s.id} href={s.link} target="_blank" rel="noreferrer" className="text-center py-[11px] px-1 rounded-full border border-white/25 font-medium text-xs leading-none backdrop-blur-md transition-colors hover:bg-white hover:text-black">
                  {s.title}
                </a>
              ))}
            </div>
            <a href={data.socials[4].link} className={`flex justify-between items-center py-4 pr-[18px] pl-[22px] rounded-full bg-acc text-white font-medium text-[15px] leading-none transition-transform duration-[400ms] ${ease} hover:scale-[1.02]`}>
              <span>Project in mind? Let&apos;s talk</span>
              <span className="w-8 h-8 rounded-full bg-black/20 grid place-items-center">↗</span>
            </a>
          </div>
        </div>
      </aside>

      <main className="flex flex-col gap-3.5 min-w-0 px-3.5 pb-3.5 laptop:p-3.5 laptop:pl-0">
        <section id="s-intro" className="order-1 laptop:order-none grid grid-cols-2 laptop:grid-cols-3 gap-3.5 animate-[rise_1s_.1s_both]">
          <Stat name="Years" value={Math.round(YEARS * k)} />
          <Stat name="Projects" value={20} />
          <NpcCard className="hidden laptop:flex" />
        </section>

        <section id="s-work" className="order-3 laptop:order-none flex flex-col gap-3.5">
          <div className="flex justify-between items-end px-2 pb-1.5 pt-5 laptop:pt-10">
            <h2 className="font-display text-[clamp(48px,5vw,80px)] leading-[.9] tracking-[-.03em]">Selected <span className="italic">work</span></h2>
            <span className="font-geist-mono text-xs leading-none text-mute">(<span className="laptop:hidden">{pad(featured.length)}</span><span className="hidden laptop:inline">03</span>)</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5 laptop:gap-3.5">
            {featured.map((p, i) => (
              <motion.a {...reveal} key={p.id} href={p.url} target="_blank" rel="noreferrer" className={`group flex flex-col gap-2 laptop:gap-3.5 ${i === 0 ? "laptop:col-span-2" : ""} ${i > 2 ? "laptop:hidden" : ""}`}>
                <div className={`relative overflow-hidden rounded-2xl laptop:rounded-3xl border border-white/[.09] bg-card2 aspect-square ${i === 0 ? "laptop:aspect-video" : "laptop:aspect-[4/3.4]"}`}>
                  <img src={p.image} alt={p.title} className={`absolute inset-0 w-full h-full object-cover object-top transition-transform duration-[1200ms] ${ease} group-hover:scale-105`} />
                  <span className="absolute top-2 left-2 laptop:top-4 laptop:left-4 font-geist-mono font-medium text-[9px] laptop:text-[11px] leading-none px-2 py-1.5 laptop:px-[11px] laptop:py-2 rounded-full bg-black/60 backdrop-blur-[10px] text-white">{p.category}</span>
                </div>
                <div className="flex justify-between gap-4 items-baseline px-1.5">
                  <span className="font-display text-[17px] laptop:text-[28px] leading-[1.05] tracking-[-.01em]">{p.title}</span>
                  <span className="hidden laptop:inline font-geist-mono text-xs leading-none text-mute whitespace-nowrap">{p.stack[0]} ↗</span>
                </div>
              </motion.a>
            ))}
          </div>
          <div className={`${card} overflow-hidden`}>
            <button aria-expanded={all} onClick={() => setAll(!all)} className="w-full flex justify-between items-center px-[26px] py-[22px] text-left transition-colors duration-300 hover:bg-card2">
              <span className="font-display text-[clamp(28px,2.6vw,40px)] leading-none tracking-[-.02em]">
                {all ? "Hide all work" : "View all work"} <span className="font-geist-mono text-xs tracking-normal text-mute align-middle">({pad(projects.length)})</span>
              </span>
              <span className={`w-[46px] h-[46px] rounded-full bg-acc text-white grid place-items-center text-xl transition-transform duration-500 ${ease} ${all ? "rotate-90" : ""}`}>→</span>
            </button>
            <Collapse open={all}>
              {projects.map((p, i) => (
                <a key={p.id} href={p.url} target="_blank" rel="noreferrer" className={`grid grid-cols-[44px_minmax(0,1fr)_auto_24px] gap-4 items-center px-[26px] py-4 border-t border-white/[.09] transition-all duration-[400ms] ${ease} hover:pl-[34px] hover:bg-card2`}>
                  <span className="font-geist-mono text-[11px] leading-none text-mute">{pad(i + 1)}</span>
                  <span className="font-display text-2xl leading-[1.05]">{p.title}</span>
                  <span className="hidden min-[520px]:inline font-geist-mono text-[11px] leading-none text-mute whitespace-nowrap">{p.category}</span>
                  <span className="text-acc text-right">↗</span>
                </a>
              ))}
            </Collapse>
          </div>
        </section>

        <motion.section {...reveal} id="s-services" className={`${card} order-2 laptop:order-none p-7 laptop:mt-10`}>
          <div className="flex justify-between mb-2.5">
            <span className={`${label} text-mute`}>What I do</span>
            <span className="font-geist-mono text-[11px] leading-none text-mute">{pad(SERVICES.length)}</span>
          </div>
          {SERVICES.map(([title, desc], i) => (
            <div key={title} className="border-t border-white/[.09]">
              <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)} className="w-full grid grid-cols-[44px_minmax(0,1fr)_28px] items-center py-5 text-left">
                <span className={`font-geist-mono text-xs leading-none ${open === i ? "text-acc" : "text-mute"}`}>{pad(i + 1)}</span>
                <span className="font-display text-[clamp(28px,2.6vw,40px)] leading-none tracking-[-.02em]">{title}</span>
                <span className={`font-light text-[26px] leading-none text-mute text-center transition-transform duration-[400ms] ${open === i ? "rotate-45" : ""}`}>+</span>
              </button>
              <Collapse open={open === i}>
                <p className="pr-10 pb-6 pl-11 text-[15px] leading-[1.55] text-mute max-w-[62ch]">{desc}</p>
              </Collapse>
            </div>
          ))}
        </motion.section>

        <motion.section {...reveal} id="s-about" className="order-4 laptop:order-none grid grid-cols-1 laptop:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-3.5">
          <div className={`${card} p-7 flex flex-col gap-2`}>
            <span className={`${label} text-mute mb-2.5`}>Experience</span>
            {EXPERIENCE.map(([role, company, dates]) => (
              <div key={role} className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3.5 gap-y-1.5 py-4 last:pb-0 border-t border-white/[.09]">
                <span className="font-medium text-base leading-[1.2]">{role}</span>
                <span className={`font-geist-mono text-[11px] leading-none ${dates.endsWith("Now") ? "text-acc" : "text-mute"}`}>{dates}</span>
                <span className="text-sm leading-none text-mute">{company}</span>
              </div>
            ))}
          </div>
          <div className={`${card} p-7 flex flex-col gap-[18px]`}>
            <span className={`${label} text-mute`}>Toolkit</span>
            <TechGrid />
          </div>
        </motion.section>

        <motion.section {...reveal} id="s-writing" className="order-5 laptop:order-none grid grid-cols-1 laptop:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-3.5">
          <Link href={latestPost ? `/blog/${latestPost.slug}` : "/blog"} className={`${card} p-7 flex flex-col justify-between gap-[30px] transition-colors hover:border-white/20`}>
            <span className={`${label} text-acc`}>● Latest post</span>
            <span className="font-display text-[32px] leading-[1.05] [text-wrap:pretty]">{latestPost?.title || "Read the blog"}</span>
            <div className="flex justify-between font-geist-mono text-xs leading-none text-mute">
              <span>{latestPost && ISOToDate(latestPost.date)}</span>
              <span className="text-ink">Read →</span>
            </div>
          </Link>
          <NpcCard className="flex laptop:hidden" />
          <div className={`${card} p-6 flex flex-col justify-between gap-5`}>
            <div className="flex gap-4 items-center">
              <img src="/images/podcast.jpg" alt="RPS Recap" className="w-[72px] h-[72px] rounded-[14px] object-cover" />
              <div className="flex flex-col gap-1.5">
                <span className="font-semibold text-base leading-none">RPS RECAP</span>
                <span className="text-sm leading-[1.3] text-mute">Josh&apos;s weekly adventures.</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <a href="https://open.spotify.com/show/2CC9k3Wkb36ttOmmFup38u" target="_blank" rel="noreferrer" className="text-center p-[13px] rounded-full border border-white/20 font-medium text-[13px] leading-none transition-colors hover:bg-[#1DB954] hover:border-[#1DB954] hover:text-black">Spotify</a>
              <a href="https://podcasts.apple.com/gh/podcast/rps-recap/id1657300696" target="_blank" rel="noreferrer" className="text-center p-[13px] rounded-full border border-white/20 font-medium text-[13px] leading-none transition-colors hover:bg-[#9B4DE0] hover:border-[#9B4DE0] hover:text-white">Apple</a>
            </div>
          </div>
        </motion.section>

        <div className="order-6 laptop:order-none pt-[30px] px-2 pb-2.5 flex justify-between font-geist-mono text-xs leading-none text-mute">
          <span>© {new Date().getFullYear()} Josh Gideon Tetteh</span>
          <span>Accra, Ghana</span>
        </div>
      </main>
    </div>
    )}
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
