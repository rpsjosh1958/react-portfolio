import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import projectsData from '../../data/projects-data.json';

const ACCENT = '#FF6B1A';
const SANS = "'Space Grotesk', system-ui, sans-serif";
const MONO = "'JetBrains Mono', ui-monospace, monospace";

const TABS = ['All', 'Featured', 'Mobile', 'Web App', 'E-Commerce', 'Website', 'Enterprise'];

const TINTS = {
  'Mobile':     ['#3a1d5e', '#7a3aa0'],
  'Web App':    ['#0d3b4f', '#16718f'],
  'E-Commerce': ['#5e2a12', '#b04e1d'],
  'Website':    ['#1d2a4d', '#2f4d99'],
  'Enterprise': ['#143d2c', '#22825a'],
};

function initials(title) {
  const w = title.replace(/[^a-zA-Z ]/g, ' ').trim().split(/\s+/).filter(Boolean);
  if (w.length >= 2) return (w[0][0] + w[1][0]).toUpperCase();
  return (title.replace(/[^a-zA-Z]/g, '').slice(0, 2) || 'P').toUpperCase();
}

function yearNum(p) {
  return parseInt(String(p.year).slice(0, 4), 10) || 0;
}

function Placeholder({ project, size }) {
  const [a, b] = TINTS[project.category] || ['#2a2a30', '#3f3f49'];
  return (
    <div style={{
      width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: `linear-gradient(135deg, ${a}, ${b})`,
      fontFamily: MONO, fontWeight: 600, fontSize: size, color: 'rgba(255,255,255,0.9)',
    }}>
      {initials(project.title)}
    </div>
  );
}

export default function WorkProjectsModal({ isOpen, onClose }) {
  const [tab, setTab] = useState('All');
  const [selId, setSelId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileView, setMobileView] = useState('list'); // 'list' | 'detail'

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Reset mobile view to list when modal opens
  useEffect(() => {
    if (isOpen) setMobileView('list');
  }, [isOpen]);

  const projects = useMemo(() => {
    return [...projectsData].sort(
      (x, y) => (Number(!!y.featured) - Number(!!x.featured)) || (yearNum(y) - yearNum(x))
    );
  }, []);

  const filtered = useMemo(() => {
    if (tab === 'All') return projects;
    if (tab === 'Featured') return projects.filter((p) => p.featured);
    if (tab === 'Mobile') return projects.filter((p) => p.mobile || p.category === 'Mobile');
    return projects.filter((p) => p.category === tab);
  }, [tab, projects]);

  const selected = projects.find((p) => p.id === selId) || filtered[0] || projects[0];

  const changeTab = (t) => {
    setTab(t);
    const next =
      t === 'All'      ? projects
      : t === 'Featured' ? projects.filter((p) => p.featured)
      : t === 'Mobile'   ? projects.filter((p) => p.mobile || p.category === 'Mobile')
      : projects.filter((p) => p.category === t);
    setSelId(next.length ? next[0].id : null);
  };

  const handleSelectProject = (id) => {
    setSelId(id);
    if (isMobile) setMobileView('detail');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          style={{
            position: 'fixed', inset: 0, zIndex: 50, display: 'flex',
            alignItems: isMobile ? 'flex-end' : 'center',
            justifyContent: 'center',
            padding: isMobile ? 0 : 32,
            background: 'rgba(6,6,8,0.72)', backdropFilter: 'blur(6px)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            style={{
              width: isMobile ? '100%' : 1180,
              height: isMobile ? '92dvh' : 768,
              maxWidth: '100%',
              maxHeight: isMobile ? '92dvh' : '92vh',
              background: '#161618',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: isMobile ? '20px 20px 0 0' : 22,
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0,0,0,0.55)',
              display: 'flex', flexDirection: 'column', fontFamily: SANS,
            }}
            initial={{ scale: isMobile ? 1 : 0.94, y: isMobile ? 40 : 0, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: isMobile ? 1 : 0.94, y: isMobile ? 40 : 0, opacity: 0 }}
            transition={{ type: 'spring', duration: 0.45 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── MOBILE DETAIL VIEW ── */}
            {isMobile && mobileView === 'detail' && selected ? (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
                {/* Mobile detail header */}
                <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
                  <button
                    onClick={() => setMobileView('list')}
                    style={{ background: 'rgba(255,255,255,0.07)', border: 'none', borderRadius: 9999, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#F5F4F2', fontSize: 16, flexShrink: 0 }}
                  >
                    ←
                  </button>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: MONO, fontSize: 10, color: ACCENT, textTransform: 'uppercase', letterSpacing: '0.12em' }}>{selected.category}</div>
                    <div style={{ fontSize: 16, fontWeight: 500, color: '#F5F4F2', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{selected.title}</div>
                  </div>
                  <button
                    onClick={onClose}
                    style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 9999, width: 34, height: 34, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#9C9AA3', fontSize: 15, flexShrink: 0 }}
                  >
                    ✕
                  </button>
                </div>

                {/* Mobile detail content */}
                <div style={{ flex: 1, overflowY: 'auto' }}>
                  {/* media */}
                  {selected.mobile ? (
                    <div style={{
                      height: 260, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'radial-gradient(circle at 50% 28%, rgba(255,107,26,0.12), transparent 62%), #0E0E10',
                    }}>
                      <div style={{
                        position: 'relative', width: 130, height: 240, borderRadius: 24, background: '#000',
                        padding: 6, boxShadow: '0 20px 48px rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.12)',
                      }}>
                        <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', width: 38, height: 4, borderRadius: 3, background: 'rgba(255,255,255,0.22)', zIndex: 2 }} />
                        <div style={{ width: '100%', height: '100%', borderRadius: 18, overflow: 'hidden', background: '#111' }}>
                          {selected.image ? <img src={selected.image} alt={selected.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : <Placeholder project={selected} size={28} />}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div style={{ height: 220, flexShrink: 0, padding: '18px 18px 0', display: 'flex', flexDirection: 'column', background: '#0E0E10' }}>
                      <div style={{ flex: 1, borderRadius: '10px 10px 0 0', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)', borderBottom: 'none', display: 'flex', flexDirection: 'column', background: '#1a1a1d' }}>
                        <div style={{ height: 28, display: 'flex', alignItems: 'center', gap: 6, padding: '0 12px', background: '#202024', flexShrink: 0 }}>
                          <span style={{ width: 8, height: 8, borderRadius: 9999, background: '#FF5F57' }} />
                          <span style={{ width: 8, height: 8, borderRadius: 9999, background: '#FEBC2E' }} />
                          <span style={{ width: 8, height: 8, borderRadius: 9999, background: '#28C840' }} />
                          <div style={{ marginLeft: 8, flex: 1, maxWidth: 160, height: 14, borderRadius: 4, background: 'rgba(255,255,255,0.06)' }} />
                        </div>
                        <div style={{ flex: 1, overflow: 'hidden', background: '#111' }}>
                          {selected.image ? <img src={selected.image} alt={selected.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : <Placeholder project={selected} size={32} />}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* info */}
                  <div style={{ padding: '20px 20px 32px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                      <h3 style={{ fontSize: 22, color: '#F5F4F2', margin: 0, fontWeight: 500, letterSpacing: '-0.01em' }}>{selected.title}</h3>
                      <div style={{ fontFamily: MONO, fontSize: 11, color: '#9C9AA3', border: '1px solid rgba(255,255,255,0.10)', padding: '4px 9px', borderRadius: 7, whiteSpace: 'nowrap', flexShrink: 0 }}>{selected.year}</div>
                    </div>
                    <p style={{ color: '#A2A0A8', fontSize: 14, lineHeight: 1.62, margin: '12px 0 0' }}>{selected.description}</p>
                    <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.1em', color: '#66646C', textTransform: 'uppercase', marginTop: 20 }}>Built with</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginTop: 10 }}>
                      {selected.stack.map((tech) => (
                        <span key={tech} style={{ fontFamily: MONO, fontSize: 11, color: '#C9C7CF', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', padding: '5px 10px', borderRadius: 9999 }}>{tech}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
                      <a href={selected.url} target="_blank" rel="noopener noreferrer"
                        style={{ flex: 1, minWidth: 120, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, background: ACCENT, color: '#15110d', fontSize: 14, fontWeight: 600, padding: '13px 20px', borderRadius: 9999, textDecoration: 'none' }}>
                        Visit live ↗
                      </a>
                      {selected.github && (
                        <a href={selected.github} target="_blank" rel="noopener noreferrer"
                          style={{ flex: 1, minWidth: 120, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6, border: '1px solid rgba(255,255,255,0.16)', color: '#F5F4F2', padding: '13px 20px', borderRadius: 9999, textDecoration: 'none', fontSize: 14 }}>
                          View code
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* ── DESKTOP SPLIT VIEW + MOBILE LIST VIEW ── */
              <>
                {/* Header */}
                <div style={{ padding: isMobile ? '16px 18px 14px' : '24px 28px 18px', borderBottom: '1px solid rgba(255,255,255,0.07)', flexShrink: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div>
                      <h2 style={{ fontSize: isMobile ? 22 : 31, color: '#F5F4F2', margin: '6px 0 0', fontWeight: 500, letterSpacing: '-0.015em' }}>
                        Selected Works
                      </h2>
                      {!isMobile && (
                        <div style={{ fontFamily: MONO, fontSize: 12, color: '#66646C', marginTop: 9 }}>
                          {projects.length} projects&nbsp;&nbsp;·&nbsp;&nbsp;2023 – 2026&nbsp;&nbsp;·&nbsp;&nbsp;
                          {projects.filter((p) => p.mobile).length} mobile builds
                        </div>
                      )}
                    </div>
                    <button
                      onClick={onClose}
                      aria-label="Close"
                      style={{
                        width: 38, height: 38, borderRadius: 9999, border: '1px solid rgba(255,255,255,0.12)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#9C9AA3', cursor: 'pointer', fontSize: 17, background: 'transparent', flexShrink: 0,
                      }}
                    >
                      ✕
                    </button>
                  </div>

                  {/* Tabs — horizontal scroll on mobile */}
                  <div style={{
                    display: 'flex', gap: 8, marginTop: isMobile ? 14 : 18,
                    overflowX: isMobile ? 'auto' : 'visible',
                    flexWrap: isMobile ? 'nowrap' : 'wrap',
                    paddingBottom: isMobile ? 2 : 0,
                    scrollbarWidth: 'none',
                    WebkitOverflowScrolling: 'touch',
                  }}>
                    {TABS.map((t) => {
                      const active = t === tab;
                      return (
                        <button
                          key={t}
                          onClick={() => changeTab(t)}
                          style={{
                            padding: '7px 14px', borderRadius: 9999, fontFamily: MONO, fontSize: 12,
                            letterSpacing: '0.02em', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all .15s',
                            flexShrink: 0,
                            border: `1px solid ${active ? ACCENT : 'rgba(255,255,255,0.10)'}`,
                            background: active ? ACCENT : 'transparent',
                            color: active ? '#15110d' : '#9C9AA3',
                          }}
                        >
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Body */}
                <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
                  {/* LEFT / MOBILE list */}
                  <div style={{
                    width: isMobile ? '100%' : 362,
                    flexShrink: 0,
                    borderRight: isMobile ? 'none' : '1px solid rgba(255,255,255,0.07)',
                    display: 'flex', flexDirection: 'column', minHeight: 0,
                  }}>
                    <div style={{ padding: '11px 16px', fontFamily: MONO, fontSize: 10.5, color: '#66646C', letterSpacing: '0.08em', borderBottom: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
                      {filtered.length} PROJECTS SHOWN
                    </div>
                    <div style={{ flex: 1, overflowY: 'auto', padding: 8, display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {filtered.map((p) => {
                        const isSel = !isMobile && selected && p.id === selected.id;
                        return (
                          <div
                            key={p.id}
                            onClick={() => handleSelectProject(p.id)}
                            style={{
                              display: 'flex', alignItems: 'center', gap: 14,
                              padding: isMobile ? '13px 14px' : '11px 14px',
                              cursor: 'pointer', borderRadius: 12, transition: 'background .15s',
                              background: isSel ? 'rgba(255,107,26,0.12)' : 'transparent',
                            }}
                            onMouseEnter={(e) => { if (!isSel) e.currentTarget.style.background = 'rgba(255,255,255,0.045)'; }}
                            onMouseLeave={(e) => { if (!isSel) e.currentTarget.style.background = 'transparent'; }}
                          >
                            <div style={{ width: isMobile ? 50 : 46, height: isMobile ? 50 : 46, borderRadius: 11, overflow: 'hidden', flexShrink: 0, background: '#222226' }}>
                              {p.image
                                ? <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                : <Placeholder project={p} size={14} />}
                            </div>
                            <div style={{ minWidth: 0, flex: 1 }}>
                              <div style={{
                                fontSize: isMobile ? 16 : 15, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden',
                                textOverflow: 'ellipsis', color: isSel ? ACCENT : '#F5F4F2',
                              }}>
                                {p.title}
                              </div>
                              <div style={{ fontFamily: MONO, fontSize: 11, color: '#66646C', marginTop: 4, display: 'flex', gap: 6, alignItems: 'center' }}>
                                {p.featured && <span style={{ color: ACCENT }}>★</span>}
                                <span>{p.category}</span>
                              </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                              <div style={{ fontFamily: MONO, fontSize: 11, color: '#66646C' }}>{p.year}</div>
                              {isMobile && <span style={{ color: '#444', fontSize: 14 }}>›</span>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* RIGHT detail — desktop only */}
                  {!isMobile && selected && (
                    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', background: '#161618' }}>
                      {selected.mobile ? (
                        <div style={{
                          height: 330, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                          background: 'radial-gradient(circle at 50% 28%, rgba(255,107,26,0.12), transparent 62%), #0E0E10',
                          borderBottom: '1px solid rgba(255,255,255,0.06)',
                        }}>
                          <div style={{
                            position: 'relative', width: 160, height: 300, borderRadius: 28, background: '#000',
                            padding: 7, boxShadow: '0 24px 56px rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.12)',
                          }}>
                            <div style={{ position: 'absolute', top: 15, left: '50%', transform: 'translateX(-50%)', width: 46, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.22)', zIndex: 2 }} />
                            <div style={{ width: '100%', height: '100%', borderRadius: 22, overflow: 'hidden', background: '#111' }}>
                              {selected.image ? <img src={selected.image} alt={selected.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : <Placeholder project={selected} size={34} />}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div style={{ height: 330, flexShrink: 0, padding: '26px 30px 0', display: 'flex', flexDirection: 'column', background: '#0E0E10', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                          <div style={{ flex: 1, borderRadius: '12px 12px 0 0', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.12)', borderBottom: 'none', display: 'flex', flexDirection: 'column', background: '#1a1a1d' }}>
                            <div style={{ height: 34, display: 'flex', alignItems: 'center', gap: 7, padding: '0 14px', background: '#202024', flexShrink: 0 }}>
                              <span style={{ width: 10, height: 10, borderRadius: 9999, background: '#FF5F57' }} />
                              <span style={{ width: 10, height: 10, borderRadius: 9999, background: '#FEBC2E' }} />
                              <span style={{ width: 10, height: 10, borderRadius: 9999, background: '#28C840' }} />
                              <div style={{ marginLeft: 12, flex: 1, maxWidth: 260, height: 18, borderRadius: 6, background: 'rgba(255,255,255,0.06)' }} />
                            </div>
                            <div style={{ flex: 1, overflow: 'hidden', background: '#111' }}>
                              {selected.image ? <img src={selected.image} alt={selected.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /> : <Placeholder project={selected} size={40} />}
                            </div>
                          </div>
                        </div>
                      )}

                      <div style={{ flex: 1, overflowY: 'auto', padding: '24px 30px 28px' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: ACCENT }}>{selected.category}</div>
                            <h3 style={{ fontSize: 26, color: '#F5F4F2', margin: '6px 0 0', fontWeight: 500, letterSpacing: '-0.01em' }}>{selected.title}</h3>
                          </div>
                          <div style={{ fontFamily: MONO, fontSize: 12, color: '#9C9AA3', border: '1px solid rgba(255,255,255,0.10)', padding: '5px 10px', borderRadius: 8, whiteSpace: 'nowrap', flexShrink: 0 }}>{selected.year}</div>
                        </div>
                        <p style={{ color: '#A2A0A8', fontSize: 14.5, lineHeight: 1.62, margin: '15px 0 0', maxWidth: '54ch' }}>{selected.description}</p>
                        <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '0.1em', color: '#66646C', textTransform: 'uppercase', marginTop: 24 }}>Built with</div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 11 }}>
                          {selected.stack.map((tech) => (
                            <span key={tech} style={{ fontFamily: MONO, fontSize: 11.5, color: '#C9C7CF', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', padding: '6px 11px', borderRadius: 9999 }}>{tech}</span>
                          ))}
                        </div>
                        <div style={{ display: 'flex', gap: 12, marginTop: 26 }}>
                          <a href={selected.url} target="_blank" rel="noopener noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: ACCENT, color: '#15110d', fontSize: 14, fontWeight: 600, padding: '11px 21px', borderRadius: 9999, textDecoration: 'none' }}>
                            Visit live ↗
                          </a>
                          {selected.github && (
                            <a href={selected.github} target="_blank" rel="noopener noreferrer"
                              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid rgba(255,255,255,0.16)', color: '#F5F4F2', padding: '11px 21px', borderRadius: 9999, textDecoration: 'none', fontSize: 14 }}>
                              View code
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
