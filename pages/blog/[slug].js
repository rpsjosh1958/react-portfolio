import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { getPostBySlug, getAllPosts } from "../../utils/api";
import ContentSection from "../../components/ContentSection";

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

const ACCENT = '#FF6B1A';
const MONO = "'JetBrains Mono', ui-monospace, monospace";
const SANS = "'Space Grotesk', system-ui, sans-serif";

export default function BlogPost({ post, prevPost, nextPost }) {
  return (
    <>
      <Head>
        <title>{post.chapter ? `Chapter ${String(post.chapter).padStart(2, '0')} — ${post.title}` : post.title}</title>
        <meta name="description" content={post.preview} />
      </Head>

      <div style={{ minHeight: '100vh', background: '#0C0C0E', color: '#E8E6E3', fontFamily: SANS }}>
        {/* back nav */}
        <div style={{ padding: '22px 28px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <Link href="/blog" style={{ fontFamily: MONO, fontSize: 12, color: '#55535C', textDecoration: 'none', letterSpacing: '0.06em', transition: 'color .15s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#F5F4F2'}
            onMouseLeave={e => e.currentTarget.style.color = '#55535C'}
          >
            ← Blog
          </Link>
        </div>

        {/* article */}
        <article style={{ maxWidth: 680, margin: '0 auto', padding: '64px 32px 80px' }}>
          {/* meta */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
              {post.chapter && (
                <span style={{ fontFamily: MONO, fontSize: 11, color: '#55535C', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Chapter {String(post.chapter).padStart(2, '0')}
                </span>
              )}
              {post.chapter && post.tag && <span style={{ color: '#2a2a2d' }}>·</span>}
              {post.tag && (
                <span style={{ fontFamily: MONO, fontSize: 11, color: ACCENT, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{post.tag}</span>
              )}
            </div>

            <h1 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 500, letterSpacing: '-0.025em', lineHeight: 1.2, margin: '0 0 14px', color: '#F5F4F2' }}>
              {post.title}
            </h1>

            {post.tagline && (
              <p style={{ fontSize: 17, color: '#66646C', lineHeight: 1.5, margin: '0 0 18px', fontStyle: 'italic' }}>
                {post.tagline}
              </p>
            )}

            <div style={{ fontFamily: MONO, fontSize: 11, color: '#3a3a3d' }}>{formatDate(post.date)}</div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)', marginBottom: 48 }} />

          {/* content */}
          <div className="blog-body">
            <ContentSection content={post.content} />
          </div>

          {/* prev / next */}
          {(prevPost || nextPost) && (
            <>
              <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.06)', margin: '64px 0 48px' }} />
              <nav style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                {prevPost ? (
                  <ChapterLink post={prevPost} direction="prev" />
                ) : <div />}
                {nextPost ? (
                  <ChapterLink post={nextPost} direction="next" />
                ) : <div />}
              </nav>
            </>
          )}
        </article>
      </div>
    </>
  );
}

function ChapterLink({ post, direction }) {
  const isPrev = direction === 'prev';
  return (
    <Link href={`/blog/${post.slug}`} style={{ textDecoration: 'none', flex: 1, maxWidth: 280 }}>
      <motion.div
        whileHover={{ x: isPrev ? -4 : 4 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        style={{
          display: 'flex', flexDirection: 'column', gap: 6,
          alignItems: isPrev ? 'flex-start' : 'flex-end',
          padding: '18px 20px', borderRadius: 14,
          border: '1px solid rgba(255,255,255,0.06)',
          background: 'rgba(255,255,255,0.02)',
          cursor: 'pointer',
        }}
      >
        <span style={{ fontFamily: MONO, fontSize: 10, color: '#3a3a3d', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          {isPrev ? '← Previous' : 'Next →'}
        </span>
        {post.chapter && (
          <span style={{ fontFamily: MONO, fontSize: 10, color: '#55535C', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Chapter {String(post.chapter).padStart(2, '0')}
          </span>
        )}
        <span style={{ fontSize: 14, fontWeight: 500, color: '#F5F4F2', lineHeight: 1.3, textAlign: isPrev ? 'left' : 'right' }}>
          {post.title}
        </span>
      </motion.div>
    </Link>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    "date", "slug", "preview", "title", "tagline",
    "image", "content", "chapter", "tag",
  ]);

  // build prev/next from chapter order
  const allPosts = getAllPosts(["slug", "title", "chapter"]).sort(
    (a, b) => (a.chapter || 0) - (b.chapter || 0)
  );
  const idx = allPosts.findIndex(p => p.slug === params.slug);
  const prevPost = idx > 0 ? allPosts[idx - 1] : null;
  const nextPost = idx < allPosts.length - 1 ? allPosts[idx + 1] : null;

  return {
    props: { post, prevPost, nextPost },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);
  return {
    paths: posts.map(post => ({ params: { slug: post.slug } })),
    fallback: false,
  };
}
