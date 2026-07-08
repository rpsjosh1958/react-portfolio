import Head from "next/head";
import Link from "next/link";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getAllPosts } from "../../utils/api";

const ACCENT = '#FF6B1A';
const MONO = "'JetBrains Mono', ui-monospace, monospace";
const SANS = "'Space Grotesk', system-ui, sans-serif";

const TINTS = [
  ['#3a1d5e','#7a3aa0'], ['#0d3b4f','#16718f'],
  ['#5e2a12','#b04e1d'], ['#1d2a4d','#2f4d99'],
  ['#143d2c','#22825a'], ['#3d1a1a','#8f3a3a'],
];

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function GradientPlaceholder({ index, title }) {
  const [a, b] = TINTS[index % TINTS.length];
  const initials = title
    .replace(/[^a-zA-Z ]/g, ' ').trim().split(/\s+/).filter(Boolean)
    .slice(0, 2).map(w => w[0]).join('').toUpperCase() || 'P';
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${a}, ${b})`, fontFamily: MONO, fontWeight: 700, fontSize: 28, color: 'rgba(255,255,255,0.7)', letterSpacing: '0.05em' }}>
      {initials}
    </div>
  );
}

function GridCard({ post, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
    >
      <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
        <div
          style={{ background: '#161618', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, overflow: 'hidden', cursor: 'pointer', transition: 'border-color .2s, transform .2s, box-shadow .2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,107,26,0.35)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.4)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          <div style={{ height: 180, overflow: 'hidden', flexShrink: 0 }}>
            {post.image
              ? <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              : <GradientPlaceholder index={index} title={post.title} />}
          </div>
          <div style={{ padding: '18px 20px 22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              {post.chapter && (
                <span style={{ fontFamily: MONO, fontSize: 10, color: '#55535C', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Chapter {String(post.chapter).padStart(2, '0')}
                </span>
              )}
              {post.chapter && post.tag && <span style={{ color: '#2a2a2d', fontSize: 10 }}>·</span>}
              {post.tag && (
                <span style={{ fontFamily: MONO, fontSize: 10, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{post.tag}</span>
              )}
            </div>
            <h2 style={{ fontSize: 17, fontWeight: 500, margin: '0 0 10px', lineHeight: 1.4, color: '#F5F4F2', letterSpacing: '-0.01em' }}>{post.title}</h2>
            {post.preview && (
              <p style={{ color: '#A2A0A8', fontSize: 13.5, lineHeight: 1.6, margin: '0 0 14px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.preview}</p>
            )}
            <div style={{ fontFamily: MONO, fontSize: 11, color: '#55535C' }}>{formatDate(post.date)}</div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function ListRow({ post, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03, duration: 0.3 }}
    >
      <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 20, padding: '16px 18px', borderRadius: 12, cursor: 'pointer', transition: 'background .15s', border: '1px solid transparent' }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'transparent'; }}
        >
          {/* thumbnail */}
          <div style={{ width: 60, height: 60, borderRadius: 10, overflow: 'hidden', flexShrink: 0, background: '#1a1a1d' }}>
            {post.image
              ? <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              : <GradientPlaceholder index={index} title={post.title} />}
          </div>
          {/* info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              {post.chapter && (
                <span style={{ fontFamily: MONO, fontSize: 10, color: '#55535C', letterSpacing: '0.08em', textTransform: 'uppercase', flexShrink: 0 }}>
                  Ch. {String(post.chapter).padStart(2, '0')}
                </span>
              )}
              {post.tag && <span style={{ fontFamily: MONO, fontSize: 10, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{post.tag}</span>}
            </div>
            <div style={{ fontSize: 16, fontWeight: 500, color: '#F5F4F2', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', letterSpacing: '-0.01em' }}>{post.title}</div>
            {post.preview && (
              <div style={{ color: '#A2A0A8', fontSize: 13, marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{post.preview}</div>
            )}
          </div>
          {/* date */}
          <div style={{ fontFamily: MONO, fontSize: 11, color: '#55535C', flexShrink: 0 }}>{formatDate(post.date)}</div>
          <div style={{ color: '#3a3a3d', fontSize: 14, flexShrink: 0 }}>›</div>
        </div>
      </Link>
    </motion.div>
  );
}

function GridIcon({ active }) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill={active ? '#F5F4F2' : '#55535C'}>
      <rect x="0" y="0" width="6.5" height="6.5" rx="1.5" />
      <rect x="8.5" y="0" width="6.5" height="6.5" rx="1.5" />
      <rect x="0" y="8.5" width="6.5" height="6.5" rx="1.5" />
      <rect x="8.5" y="8.5" width="6.5" height="6.5" rx="1.5" />
    </svg>
  );
}

function ListIcon({ active }) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill={active ? '#F5F4F2' : '#55535C'}>
      <rect x="0" y="1" width="15" height="2.5" rx="1.25" />
      <rect x="0" y="6.25" width="15" height="2.5" rx="1.25" />
      <rect x="0" y="11.5" width="15" height="2.5" rx="1.25" />
    </svg>
  );
}

export default function Blog({ posts }) {
  const [view, setView] = useState('grid');
  const [sort, setSort] = useState('oldest');
  const [activeTag, setActiveTag] = useState('Personal');

  const tags = useMemo(() => {
    const all = posts.flatMap(p => (p.tag ? [p.tag] : []));
    const unique = [...new Set(all)];
    return unique.length ? ['All', ...unique] : [];
  }, [posts]);

  const displayed = useMemo(() => {
    let list = activeTag === 'All' ? posts : posts.filter(p => p.tag === activeTag);
    return sort === 'oldest' ? [...list].reverse() : list;
  }, [posts, sort, activeTag]);

  return (
    <>
      <Head>
        <title>Blog — Josh Tetteh</title>
        <meta name="description" content="Thoughts and writings by Josh Tetteh" />
      </Head>

      <div style={{ minHeight: '100vh', background: '#0C0C0E', fontFamily: SANS, color: '#F5F4F2' }}>
        {/* top nav */}
        <div style={{ padding: '20px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontFamily: MONO, fontSize: 12, color: '#55535C', textDecoration: 'none', letterSpacing: '0.06em', transition: 'color .15s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#F5F4F2'}
            onMouseLeave={e => e.currentTarget.style.color = '#55535C'}
          >
            ← Portfolio
          </Link>
          <span style={{ fontFamily: MONO, fontSize: 11, color: '#55535C', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Josh Tetteh</span>
        </div>

        <div style={{ maxWidth: 1060, margin: '0 auto', padding: '48px 24px 80px' }}>
          {/* page header */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 36, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontFamily: MONO, fontSize: 11, color: ACCENT, letterSpacing: '0.16em', textTransform: 'uppercase', marginBottom: 10 }}>Writing</div>
              <h1 style={{ fontSize: 46, fontWeight: 500, letterSpacing: '-0.025em', margin: 0, lineHeight: 1 }}>Blog</h1>
              <p style={{ color: '#55535C', fontFamily: MONO, fontSize: 12, marginTop: 10 }}>
                {displayed.length} post{displayed.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* view toggle */}
            <div style={{ display: 'flex', gap: 3, background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: 4, alignSelf: 'flex-start' }}>
              <button onClick={() => setView('grid')} aria-label="Grid view" style={{ padding: '8px 11px', borderRadius: 7, border: 'none', cursor: 'pointer', background: view === 'grid' ? 'rgba(255,255,255,0.10)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .15s' }}>
                <GridIcon active={view === 'grid'} />
              </button>
              <button onClick={() => setView('list')} aria-label="List view" style={{ padding: '8px 11px', borderRadius: 7, border: 'none', cursor: 'pointer', background: view === 'list' ? 'rgba(255,255,255,0.10)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background .15s' }}>
                <ListIcon active={view === 'list'} />
              </button>
            </div>
          </div>

          {/* filters */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 32, flexWrap: 'wrap', alignItems: 'center' }}>
            {['newest', 'oldest'].map(s => {
              const active = sort === s;
              return (
                <button key={s} onClick={() => setSort(s)} style={{ padding: '6px 14px', borderRadius: 9999, fontFamily: MONO, fontSize: 11.5, letterSpacing: '0.02em', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .15s', border: `1px solid ${active ? ACCENT : 'rgba(255,255,255,0.10)'}`, background: active ? ACCENT : 'transparent', color: active ? '#15110d' : '#9C9AA3' }}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              );
            })}

            {tags.length > 0 && (
              <>
                <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.08)', margin: '0 2px' }} />
                {tags.map(tag => {
                  const active = activeTag === tag;
                  return (
                    <button key={tag} onClick={() => setActiveTag(tag)} style={{ padding: '6px 14px', borderRadius: 9999, fontFamily: MONO, fontSize: 11.5, letterSpacing: '0.02em', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .15s', border: `1px solid ${active ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.10)'}`, background: active ? 'rgba(255,255,255,0.08)' : 'transparent', color: active ? '#F5F4F2' : '#9C9AA3' }}>
                      {tag}
                    </button>
                  );
                })}
              </>
            )}
          </div>

          {/* posts */}
          <AnimatePresence mode="wait">
            {view === 'grid' ? (
              <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 20 }}>
                {displayed.map((post, i) => <GridCard key={post.slug} post={post} index={i} />)}
              </motion.div>
            ) : (
              <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {displayed.map((post, i) => <ListRow key={post.slug} post={post} index={i} />)}
              </motion.div>
            )}
          </AnimatePresence>

          {displayed.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#55535C', fontFamily: MONO, fontSize: 13 }}>
              No posts yet.
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts(['slug', 'title', 'image', 'preview', 'date', 'tag', 'chapter']);
  return {
    props: { posts },
  };
}
