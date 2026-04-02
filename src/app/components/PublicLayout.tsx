'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Menu, X } from "lucide-react";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 12,
          zIndex: 100,
          maxWidth: 1200,
          width: 'calc(100% - 24px)',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--site-primary)',
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '40px 40px',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: 0,
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 4px 24px rgba(0, 68, 204, 0.25)',
          transition: 'all 0.3s ease',
        }}
      >
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '56px',
        }}>
          {/* LOGO */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src="/logo.PNG"
              alt="Instituto Gênesis"
              style={{ height: 40, width: 'auto', objectFit: 'contain' }}
            />
          </Link>

          {/* DESKTOP NAV */}
          <nav
            style={{
              display: 'none',
              gap: '28px',
              fontWeight: 500,
              fontSize: '0.95rem',
              color: 'rgba(255,255,255,0.85)',
            }}
            className="md-flex"
          >
            {[
              { label: 'Início', path: '/' },
              { label: 'Cursos', path: '/cursos' },
              { label: 'Consultoria', path: '/consultoria' },
              { label: 'Blog', path: '/blog' },
              { label: 'Transparência', path: '/transparencia' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.path}
                style={{
                  color: isActive(item.path) ? 'white' : 'rgba(255,255,255,0.75)',
                  fontWeight: isActive(item.path) ? 700 : 500,
                  transition: 'color 0.2s',
                  position: 'relative'
                }}
              >
                {item.label}
                {isActive(item.path) && (
                  <div style={{
                    position: 'absolute', bottom: -16, left: 0, right: 0,
                    height: 3, background: 'white',
                    borderRadius: '4px 4px 0 0'
                  }} />
                )}
              </Link>
            ))}
          </nav>

          {/* ACTIONS E BOTÃO MOBILE */}
          <div style={{ display: 'flex', gap: 16 }}>
            <button
               className="mobile-only"
               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
               style={{
                 background: 'transparent',
                 border: 'none',
                 color: 'white',
                 cursor: 'pointer',
                 display: 'flex',
                 alignItems: 'center',
                 padding: 8
               }}
            >
               {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* MOBILE NAV DROPDOWN */}
        {isMobileMenuOpen && (
          <div className="mobile-only" style={{
            position: 'absolute',
            top: '68px',
            left: 0,
            right: 0,
            background: 'var(--site-primary)',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            borderRadius: '0 0 12px 12px',
            zIndex: 90
          }}>
            {[
              { label: 'Início', path: '/' },
              { label: 'Cursos', path: '/cursos' },
              { label: 'Consultoria', path: '/consultoria' },
              { label: 'Blog', path: '/blog' },
              { label: 'Transparência', path: '/transparencia' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  color: isActive(item.path) ? 'white' : 'rgba(255,255,255,0.75)',
                  fontWeight: isActive(item.path) ? 700 : 500,
                  fontSize: '1.2rem',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  textDecoration: 'none'
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
        
        {/* Helper class inline specifically for this layout usando forma segura */}
        <style>{`
          @media (min-width: 900px) { 
            .md-flex { display: flex !important; } 
            .mobile-only { display: none !important; }
          }
        `}</style>
      </header>

      {/* Rende os componentes da página (fade in) */}
      <div style={{ minHeight: 'calc(100vh - 80px - 340px)' }}>
        {children}
      </div>

      <footer
        className="glass-section-white"
        style={{ borderTop: '1px solid var(--site-border)', padding: '72px 0 40px' }}
      >
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 48,
          marginBottom: 64,
        }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: 'inline-block', marginBottom: 16 }}>
              <img src="/logo.PNG" alt="Instituto Gênesis" style={{ height: 44, width: 'auto', objectFit: 'contain', filter: 'brightness(0) saturate(100%)' }} />
            </Link>
            <p style={{ color: 'var(--site-text-secondary)', fontSize: '0.92rem', lineHeight: 1.65, maxWidth: 280 }}>
              Formação, Inovação e Desenvolvimento Social para comunidades do Maranhão e Pará desde 2013.
            </p>
          </div>

          {/* Institucional */}
          <div>
            <h4 style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--site-text-tertiary)', marginBottom: 20 }}>
              Institucional
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Início', href: '/' },
                { label: 'Transparência', href: '/transparencia' },
                { label: 'Blog e Notícias', href: '/blog' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} style={{ color: 'var(--site-text-secondary)', fontSize: '0.93rem', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--site-text-primary)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--site-text-secondary)')}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Educação */}
          <div>
            <h4 style={{ fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--site-text-tertiary)', marginBottom: 20 }}>
              Educação
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { label: 'Cursos de Capacitação', href: '/cursos' },
                { label: 'Consultoria', href: '/consultoria' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} style={{ color: 'var(--site-text-secondary)', fontSize: '0.93rem', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--site-text-primary)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--site-text-secondary)')}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="container" style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 16, paddingTop: 28,
          borderTop: '1px solid var(--site-border)',
          color: 'var(--site-text-tertiary)', fontSize: '0.82rem',
        }}>
          <p>&copy; {new Date().getFullYear()} Instituto Gênesis. Educação que transforma.</p>
          <a
            href="https://visionxma.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', gap: 5, textDecoration: 'none', color: 'var(--site-text-tertiary)' }}
          >
            Desenvolvido por{' '}
            <span style={{
              fontWeight: 800,
              letterSpacing: '0.05em',
              background: 'linear-gradient(90deg, #2B44FF, #7C3AED)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              VisionX
            </span>
          </a>
        </div>
      </footer>
    </>
  );
}
