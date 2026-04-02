'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import PublicLayout from '../../components/PublicLayout';
import { supabase } from '@/lib/supabase';
import {
  ArrowLeft,
  BookOpen,
  Clock,
  BarChart2,
  Monitor,
  Calendar,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';

interface Course {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  duration: string | null;
  level: string | null;
  modality: string | null;
  image_url: string | null;
  is_published: boolean;
  created_at: string;
}

const categoryColors: Record<string, string> = {
  'Agroecologia e Sementes Crioulas': '#10B981',
  'Gestão de Projetos Sociais': '#8B5CF6',
  'Empreendedorismo Feminino': '#F59E0B',
  'Tecnologia e Inovação': '#2B44FF',
  'Saúde e Bem-estar Comunitário': '#EF4444',
  'Educação e Cultura': '#EC4899',
  'Economia Solidária': '#06B6D4',
};

export default function CursoPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchCourse() {
      const { data } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .eq('is_published', true)
        .single();
      if (data) setCourse(data);
      else setNotFound(true);
      setLoading(false);
    }
    fetchCourse();
  }, [id]);

  const color = course?.category ? (categoryColors[course.category] || 'var(--site-primary)') : 'var(--site-primary)';

  if (loading) {
    return (
      <PublicLayout>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh', gap: 12, color: 'var(--site-text-secondary)' }}>
          <Loader2 size={24} style={{ animation: 'spin 1s linear infinite' }} />
          <span>Carregando curso...</span>
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
          <h2 style={{ fontSize: '1.6rem' }}>Curso não encontrado</h2>
          <p style={{ color: 'var(--site-text-secondary)' }}>Este curso pode ter sido removido ou ainda não foi publicado.</p>
          <Link href="/cursos" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: 'var(--site-primary)', color: 'white', textDecoration: 'none', fontWeight: 600 }}>
            <ArrowLeft size={16} /> Ver todos os cursos
          </Link>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <main className="animate-fade-up" style={{ background: 'var(--site-bg)' }}>

        {/* HERO */}
        <section style={{ position: 'relative', overflow: 'hidden', minHeight: 420, display: 'flex', alignItems: 'flex-end' }}>
          {/* Background image or gradient */}
          {course!.image_url ? (
            <>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${course!.image_url})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.3) 100%)' }} />
            </>
          ) : (
            <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, ${color}22 0%, var(--site-bg) 100%)` }} />
          )}

          <div className="container" style={{ position: 'relative', zIndex: 1, padding: '120px 0 56px' }}>
            <Link href="/cursos" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: course!.image_url ? 'rgba(255,255,255,0.8)' : 'var(--site-text-secondary)', fontSize: '0.9rem', textDecoration: 'none', marginBottom: 24, transition: 'opacity 0.2s' }}>
              <ArrowLeft size={16} /> Voltar para Cursos
            </Link>

            {course!.category && (
              <div style={{ display: 'inline-flex', alignItems: 'center', marginBottom: 16, padding: '5px 14px', background: `${color}25`, color, fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.07em', borderRadius: 0 }}>
                {course!.category}
              </div>
            )}

            <h1 style={{
              fontSize: 'clamp(1.8rem, 4vw, 3rem)',
              lineHeight: 1.2,
              marginBottom: 16,
              color: course!.image_url ? 'white' : 'var(--site-text-primary)',
              maxWidth: 760,
            }}>
              {course!.title}
            </h1>

            {/* Meta badges */}
            {(course!.duration || course!.level || course!.modality) && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {course!.duration && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: course!.image_url ? 'rgba(255,255,255,0.15)' : 'var(--site-surface)', border: `1px solid ${course!.image_url ? 'rgba(255,255,255,0.2)' : 'var(--site-border)'}`, color: course!.image_url ? 'white' : 'var(--site-text-secondary)', fontSize: '0.82rem', backdropFilter: 'blur(8px)' }}>
                    <Clock size={13} /> {course!.duration}
                  </span>
                )}
                {course!.level && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: course!.image_url ? 'rgba(255,255,255,0.15)' : 'var(--site-surface)', border: `1px solid ${course!.image_url ? 'rgba(255,255,255,0.2)' : 'var(--site-border)'}`, color: course!.image_url ? 'white' : 'var(--site-text-secondary)', fontSize: '0.82rem', backdropFilter: 'blur(8px)' }}>
                    <BarChart2 size={13} /> {course!.level}
                  </span>
                )}
                {course!.modality && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', background: course!.image_url ? 'rgba(255,255,255,0.15)' : 'var(--site-surface)', border: `1px solid ${course!.image_url ? 'rgba(255,255,255,0.2)' : 'var(--site-border)'}`, color: course!.image_url ? 'white' : 'var(--site-text-secondary)', fontSize: '0.82rem', backdropFilter: 'blur(8px)' }}>
                    <Monitor size={13} /> {course!.modality}
                  </span>
                )}
              </div>
            )}
          </div>
        </section>

        {/* CONTENT */}
        <section className="glass-section-white" style={{ padding: '64px 0 100px' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 320px', gap: 48, alignItems: 'start' }}>

            {/* Main content */}
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                <BookOpen size={20} color={color} /> Sobre o Curso
              </h2>

              {course!.description ? (
                <div style={{ fontSize: '1.05rem', lineHeight: 1.8, color: 'var(--site-text-secondary)', whiteSpace: 'pre-wrap' }}>
                  {course!.description}
                </div>
              ) : (
                <p style={{ color: 'var(--site-text-tertiary)', fontStyle: 'italic' }}>
                  Descrição detalhada em breve.
                </p>
              )}
            </div>

            {/* Sidebar card */}
            <div className="glass-panel" style={{ padding: 28, position: 'sticky', top: 88 }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: 20, fontWeight: 700 }}>Informações do Curso</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {course!.category && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--site-text-tertiary)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Área</span>
                    <span style={{ fontSize: '0.95rem', color: 'var(--site-text-primary)', fontWeight: 600 }}>{course!.category}</span>
                  </div>
                )}
                {course!.duration && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--site-text-tertiary)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Carga Horária</span>
                    <span style={{ fontSize: '0.95rem', color: 'var(--site-text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}><Clock size={14} color={color} /> {course!.duration}</span>
                  </div>
                )}
                {course!.level && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--site-text-tertiary)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Nível</span>
                    <span style={{ fontSize: '0.95rem', color: 'var(--site-text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}><BarChart2 size={14} color={color} /> {course!.level}</span>
                  </div>
                )}
                {course!.modality && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--site-text-tertiary)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Modalidade</span>
                    <span style={{ fontSize: '0.95rem', color: 'var(--site-text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}><Monitor size={14} color={color} /> {course!.modality}</span>
                  </div>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--site-text-tertiary)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Publicado em</span>
                  <span style={{ fontSize: '0.95rem', color: 'var(--site-text-primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Calendar size={14} color={color} />
                    {new Date(course!.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>

              <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid var(--site-border)' }}>
                <button
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  Quero me Inscrever
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* BACK LINK */}
        <div className="container" style={{ paddingBottom: 60 }}>
          <Link href="/cursos" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--site-text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>
            <ArrowLeft size={15} /> Ver todos os cursos
          </Link>
        </div>
      </main>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 800px) {
          .container > div[style*="grid-template-columns"] { grid-template-columns: 1fr !important; }
          .container > div[style*="grid-template-columns"] > div:last-child { position: static !important; }
        }
      `}</style>
    </PublicLayout>
  );
}
