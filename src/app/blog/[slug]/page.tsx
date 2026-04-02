'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import PublicLayout from '../../components/PublicLayout';
import { supabase } from '@/lib/supabase';
import {
  ArrowLeft,
  Calendar,
  Tag,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  feature_image_url: string | null;
  category_id: string | null;
  created_at: string;
}

interface Category {
  id: string;
  name: string;
}

const categoryColors = [
  '#2B44FF', '#10B981', '#F59E0B', '#8B5CF6', '#EF4444', '#EC4899', '#06B6D4',
];

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      const [postRes, catsRes] = await Promise.all([
        supabase.from('posts').select('*').eq('slug', slug).single(),
        supabase.from('categories').select('id, name'),
      ]);

      if (!postRes.data) { setNotFound(true); setLoading(false); return; }

      const postData: Post = postRes.data;
      setPost(postData);
      if (catsRes.data) setAllCategories(catsRes.data);

      // Related posts (same category, excluding current)
      const relatedQuery = supabase.from('posts').select('*').neq('id', postData.id).limit(3);
      if (postData.category_id) relatedQuery.eq('category_id', postData.category_id);
      const { data: related } = await relatedQuery;
      if (related) setRelatedPosts(related);

      setLoading(false);
    }
    fetchPost();
  }, [slug]);

  function getCategoryColor(catId: string | null) {
    if (!catId) return categoryColors[0];
    const idx = allCategories.findIndex(c => c.id === catId);
    return categoryColors[idx % categoryColors.length] || categoryColors[0];
  }

  function getCategoryName(catId: string | null) {
    if (!catId) return 'Geral';
    return allCategories.find(c => c.id === catId)?.name || 'Geral';
  }

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
  }

  function excerpt(content: string | null, max = 120) {
    if (!content) return '';
    const stripped = content.replace(/<[^>]+>/g, '').replace(/\n+/g, ' ').trim();
    return stripped.length > max ? stripped.slice(0, max) + '…' : stripped;
  }

  if (loading) {
    return (
      <PublicLayout>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', gap: 12, color: 'var(--site-text-secondary)' }}>
          <Loader2 size={24} style={{ animation: 'spin 1s linear infinite' }} />
          <span>Carregando artigo...</span>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>
      </PublicLayout>
    );
  }

  if (notFound) {
    return (
      <PublicLayout>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', gap: 16, color: 'var(--site-text-tertiary)', textAlign: 'center' }}>
          <AlertCircle size={48} style={{ opacity: 0.4 }} />
          <h2 style={{ fontSize: '1.6rem' }}>Artigo não encontrado</h2>
          <p style={{ color: 'var(--site-text-secondary)' }}>Este artigo pode ter sido removido ou o link está incorreto.</p>
          <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'var(--site-primary)', color: 'white', textDecoration: 'none', fontWeight: 600 }}>
            <ArrowLeft size={16} /> Voltar ao Blog
          </Link>
        </div>
      </PublicLayout>
    );
  }

  const color = getCategoryColor(post!.category_id);

  return (
    <PublicLayout>
      <main className="animate-fade-up" style={{ background: 'var(--site-bg)' }}>

        {/* HERO */}
        <section style={{ position: 'relative', overflow: 'hidden', minHeight: 460, display: 'flex', alignItems: 'flex-end' }}>
          {post!.feature_image_url ? (
            <>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${post!.feature_image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.88) 50%, rgba(0,0,0,0.25) 100%)' }} />
            </>
          ) : (
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${color}18 0%, var(--site-bg) 100%)` }} />
          )}

          <div className="container" style={{ position: 'relative', zIndex: 1, padding: '120px 0 56px', maxWidth: 860 }}>
            <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: post!.feature_image_url ? 'rgba(255,255,255,0.75)' : 'var(--site-text-secondary)', fontSize: '0.9rem', textDecoration: 'none', marginBottom: 24 }}>
              <ArrowLeft size={15} /> Voltar ao Blog
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', background: `${color}25`, color, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.07em' }}>
                <Tag size={12} /> {getCategoryName(post!.category_id).toUpperCase()}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.88rem', color: post!.feature_image_url ? 'rgba(255,255,255,0.7)' : 'var(--site-text-tertiary)' }}>
                <Calendar size={14} /> {formatDate(post!.created_at)}
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              lineHeight: 1.2,
              color: post!.feature_image_url ? 'white' : 'var(--site-text-primary)',
            }}>
              {post!.title}
            </h1>
          </div>
        </section>

        {/* ARTICLE BODY */}
        <section className="glass-section-white" style={{ padding: '64px 0' }}>
          <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px' }}>
            {post!.content ? (
              <div
                style={{ fontSize: '1.1rem', lineHeight: 1.85, color: 'var(--site-text-secondary)' }}
                dangerouslySetInnerHTML={{ __html: post!.content.replace(/\n/g, '<br/>') }}
              />
            ) : (
              <p style={{ color: 'var(--site-text-tertiary)', fontStyle: 'italic', textAlign: 'center', padding: '40px 0' }}>
                Conteúdo em breve.
              </p>
            )}

            {/* Tags / Category footer */}
            <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--site-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 16px', background: `${color}15`, color, fontSize: '0.82rem', fontWeight: 700 }}>
                <Tag size={13} /> {getCategoryName(post!.category_id)}
              </span>
              <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--site-text-secondary)', fontSize: '0.9rem', textDecoration: 'none' }}>
                <ArrowLeft size={14} /> Ver todas as publicações
              </Link>
            </div>
          </div>
        </section>

        {/* RELATED POSTS */}
        {relatedPosts.length > 0 && (
          <section className="glass-section-white" style={{ borderTop: 'none', padding: '0 0 80px' }}>
            <div className="container">
              <h3 style={{ fontSize: '1.5rem', marginBottom: 24 }}>Leia também</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(280px, 100%), 1fr))', gap: 20 }}>
                {relatedPosts.map(related => {
                  const rColor = getCategoryColor(related.category_id);
                  return (
                    <Link
                      key={related.id}
                      href={`/blog/${related.slug}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%', transition: 'transform 0.2s' }}
                        onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
                        onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}>
                        <div style={{ height: 160, background: 'var(--site-surface)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid var(--site-border)' }}>
                          {related.feature_image_url
                            ? <img src={related.feature_image_url} alt={related.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            : <span style={{ fontSize: '2rem', opacity: 0.15 }}>✦</span>
                          }
                        </div>
                        <div style={{ padding: 18 }}>
                          <span style={{ fontSize: '0.7rem', fontWeight: 700, color: rColor, letterSpacing: '0.05em' }}>
                            {getCategoryName(related.category_id).toUpperCase()}
                          </span>
                          <h4 style={{ fontSize: '1rem', marginTop: 6, lineHeight: 1.35, color: 'var(--site-text-primary)' }}>{related.title}</h4>
                          {related.content && (
                            <p style={{ fontSize: '0.85rem', color: 'var(--site-text-tertiary)', marginTop: 8, lineHeight: 1.5 }}>
                              {excerpt(related.content)}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </PublicLayout>
  );
}
