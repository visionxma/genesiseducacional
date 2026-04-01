'use client';

import { useState, useEffect, useCallback } from 'react';
import { BookOpen, Leaf, Users, HeartHandshake, Laptop, LineChart, ChevronLeft, ChevronRight } from 'lucide-react';

const pilares = [
  {
    icon: BookOpen,
    title: 'Cursos Técnicos & Pós-Técnico',
    desc: 'Formações técnicas e pós-técnicas com polos estruturados no interior do Maranhão, Pará e todo o Brasil, levando educação profissional de qualidade para onde ela é mais necessária.',
    color: '#0044CC',
    image: 'https://static.poder360.com.br/2024/05/ead-garota-professora-ensino-a-distancia-2-848x477.png', // Universidade / Biblioteca
  },
  {
    icon: Leaf,
    title: 'Agricultura Regenerativa',
    desc: 'Assistência técnica e acompanhamento direto para quintais produtivos e propriedades agroecológicas, promovendo soberania alimentar e sustentabilidade ambiental.',
    color: '#059669',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&q=80',
  },
  {
    icon: Users,
    title: 'Educação Popular',
    desc: 'Cursos técnicos desenvolvidos com foco na realidade das comunidades rurais, quilombolas e ribeirinhas, respeitando seus saberes e fortalecendo sua autonomia.',
    color: '#D97706',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1600&q=80',
  },
  {
    icon: HeartHandshake,
    title: 'Economia Solidária',
    desc: 'Gestão de cooperativas, redes de escoamento da produção familiar e articulação de mercados justos que valorizam o trabalho coletivo e a produção sustentável.',
    color: '#7C3AED',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600&q=80',
  },
  {
    icon: Laptop,
    title: 'Inclusão Digital Jovem',
    desc: 'Capacitação em informática básica, produção digital e autonomia tecnológica para jovens rurais, abrindo portas para o mercado de trabalho e o empreendedorismo.',
    color: '#0891B2',
    image: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=1600&q=80',
  },
  {
    icon: LineChart,
    title: 'Consultoria Estratégica',
    desc: 'Planejamento metodológico, elaboração de projetos e captação de recursos para prefeituras, OSCs e movimentos sociais que buscam impacto real e sustentável.',
    color: '#DB2777',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80',
  },
];

export default function PilaresCarousel() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback((index: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 300);
  }, [animating]);

  const prev = () => goTo((current - 1 + pilares.length) % pilares.length);
  const next = useCallback(() => goTo((current + 1) % pilares.length), [current, goTo]);

  // Auto-advance every 6s
  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

  const pilar = pilares[current];
  const Icon = pilar.icon;

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '80vh',
      minHeight: 520,
      overflow: 'hidden',
      borderRadius: '0',
    }}>
      {/* Background Image */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${pilar.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'opacity 0.5s ease',
        opacity: animating ? 0 : 1,
      }} />

      {/* Dark overlay for readability */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(135deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 100%)',
      }} />

      {/* Color accent strip at bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: 4,
        background: pilar.color,
        transition: 'background 0.4s ease',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 8%',
        maxWidth: 900,
        opacity: animating ? 0 : 1,
        transform: animating ? 'translateY(12px)' : 'translateY(0)',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
      }}>
        {/* Icon */}
        <div style={{
          width: 72, height: 72, borderRadius: 0,
          background: pilar.color,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 28,
          boxShadow: `0 8px 24px ${pilar.color}60`,
        }}>
          <Icon size={34} color="white" strokeWidth={1.8} />
        </div>

        {/* Slide counter */}
        <div style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', marginBottom: 12, textTransform: 'uppercase' }}>
          {String(current + 1).padStart(2, '0')} / {String(pilares.length).padStart(2, '0')}
        </div>

        <h2 style={{ color: 'white', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, marginBottom: 20, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          {pilar.title}
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.15rem', lineHeight: 1.7, maxWidth: 600 }}>
          {pilar.desc}
        </p>
      </div>

      {/* Navigation Arrows */}
      <button onClick={prev} style={{
        position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)',
        zIndex: 3, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)',
        borderRadius: 0, width: 52, height: 52,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', cursor: 'pointer', transition: 'all 0.2s ease',
      }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
      >
        <ChevronLeft size={22} />
      </button>

      <button onClick={next} style={{
        position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)',
        zIndex: 3, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.25)',
        borderRadius: 0, width: 52, height: 52,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'white', cursor: 'pointer', transition: 'all 0.2s ease',
      }}
        onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.25)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
      >
        <ChevronRight size={22} />
      </button>

      {/* Dot Indicators */}
      <div style={{
        position: 'absolute', bottom: 28, right: 32,
        zIndex: 3, display: 'flex', gap: 8, alignItems: 'center',
      }}>
        {pilares.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{
            width: i === current ? 28 : 8,
            height: 8, borderRadius: 0,
            background: i === current ? 'white' : 'rgba(255,255,255,0.4)',
            border: 'none', cursor: 'pointer', padding: 0,
            transition: 'all 0.3s ease',
          }} />
        ))}
      </div>
    </div>
  );
}
