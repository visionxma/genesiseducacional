'use client';

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { ArrowRight, BookOpen, GraduationCap, Users, LayoutDashboard } from "lucide-react";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'var(--site-glass-bg)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--site-border)',
          transition: 'all 0.3s ease',
        }}
      >
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '80px',
        }}>
          {/* LOGO */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 36, height: 36,
              background: 'linear-gradient(135deg, var(--site-primary), #1A1933)',
              borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontWeight: 800, fontSize: '1.2rem',
              boxShadow: '0 4px 12px var(--site-primary-glow)'
            }}>
              G
            </div>
            <div style={{
              fontWeight: 800,
              color: 'var(--site-text-primary)',
              fontSize: '1.4rem',
              fontFamily: 'var(--font-outfit)',
              letterSpacing: '-0.02em',
            }}>
              GÊNESIS<span style={{ color: 'var(--site-primary)' }}>.</span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
          <nav
            style={{
              display: 'none',
              gap: '32px',
              fontWeight: 500,
              fontSize: '0.95rem',
              color: 'var(--site-text-secondary)',
            }}
            className="md-flex"
          >
            {[
              { label: 'Início', path: '/' },
              { label: 'Cursos', path: '/cursos' },
              { label: 'Graduação/Pós', path: '/graduacao' },
              { label: 'Técnicos', path: '/tecnicos' },
              { label: 'Consultoria', path: '/consultoria' },
              { label: 'Blog', path: '/blog' },
            ].map((item) => (
              <Link
                key={item.path}
                href={item.path}
                style={{
                  color: isActive(item.path) ? 'var(--site-primary)' : 'inherit',
                  fontWeight: isActive(item.path) ? 600 : 500,
                  transition: 'color 0.2s',
                  position: 'relative'
                }}
              >
                {item.label}
                {isActive(item.path) && (
                  <div style={{
                    position: 'absolute', bottom: -28, left: 0, right: 0,
                    height: 3, background: 'var(--site-primary)',
                    borderRadius: '4px 4px 0 0'
                  }} />
                )}
              </Link>
            ))}
          </nav>

          {/* ACTIONS */}
          <div style={{ display: 'flex', gap: 16 }}>
            <Link href="/admin">
              <button className="btn btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
                <LayoutDashboard size={16} />
                Portal do Aluno
              </button>
            </Link>
          </div>
        </div>
        
        {/* Helper class inline specifically for this layout */}
        <style dangerouslySetInnerHTML={{__html: `
          @media (min-width: 900px) { .md-flex { display: flex !important; } }
        `}} />
      </header>

      {/* Rende os componentes da página (fade in) */}
      <div style={{ minHeight: 'calc(100vh - 80px - 340px)' }}>
        {children}
      </div>

      <footer
        style={{
          backgroundColor: 'var(--site-surface-alt)',
          borderTop: '1px solid var(--site-border)',
          padding: '80px 0 40px',
        }}
      >
        <div className="container" style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 60, marginBottom: 80
        }}>
          {/* Brand Col */}
          <div>
            <div style={{
              fontWeight: 800, color: 'var(--site-text-primary)',
              fontSize: '1.4rem', fontFamily: 'var(--font-outfit)', 
              marginBottom: 20
            }}>
              GÊNESIS<span style={{ color: 'var(--site-primary)' }}>.</span>
            </div>
            <p style={{ color: 'var(--site-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: 24, maxWidth: 300 }}>
              Formação, Inovação e Desenvolvimento Social para comunidades do Maranhão e Pará desde 2013.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[BookOpen, GraduationCap, Users].map((Icon, i) => (
                <div key={i} style={{ 
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'var(--site-surface)', border: '1px solid var(--site-border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--site-text-secondary)', cursor: 'pointer'
                }}>
                  <Icon size={18} />
                </div>
              ))}
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: 24, color: 'var(--site-text-primary)' }}>Institucional</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, color: 'var(--site-text-secondary)', fontSize: '0.95rem' }}>
              <li><Link href="/" style={{ opacity: 0.8 }}>Sobre Nós</Link></li>
              <li><Link href="/" style={{ opacity: 0.8 }}>Impacto Social</Link></li>
              <li><Link href="/" style={{ opacity: 0.8 }}>Transparência</Link></li>
              <li><Link href="/blog" style={{ opacity: 0.8 }}>Blog e Notícias</Link></li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 style={{ fontSize: '1.1rem', marginBottom: 24, color: 'var(--site-text-primary)' }}>Educação</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, color: 'var(--site-text-secondary)', fontSize: '0.95rem' }}>
              <li><Link href="/cursos" style={{ opacity: 0.8 }}>Cursos de Capacitação</Link></li>
              <li><Link href="/tecnicos" style={{ opacity: 0.8 }}>Cursos Técnicos</Link></li>
              <li><Link href="/graduacao" style={{ opacity: 0.8 }}>Graduação e EAD</Link></li>
              <li><Link href="/consultoria" style={{ opacity: 0.8 }}>Consultorias</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="container" style={{ 
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 20, paddingTop: 30,
          borderTop: '1px solid var(--site-border)',
          color: 'var(--site-text-tertiary)', fontSize: '0.85rem'
        }}>
          <p>&copy; {new Date().getFullYear()} Instituto Gênesis. Educação que transforma.</p>
          <div style={{ display: 'flex', gap: 24 }}>
            <Link href="/" style={{ opacity: 0.8 }}>Termos de Uso</Link>
            <Link href="/" style={{ opacity: 0.8 }}>Política de Privacidade</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
