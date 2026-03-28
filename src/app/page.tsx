import PublicLayout from './components/PublicLayout';
import Link from 'next/link';
import { ArrowRight, BookOpen, GraduationCap, Leaf, Users, Zap, CheckCircle2, HeartHandshake, Laptop, LineChart } from 'lucide-react';

export default function Home() {
  return (
    <PublicLayout>
      <main className="animate-fade-up">
        {/* 1. HERO SECTION (Premium SaaS Style) */}
        <section style={{ 
          position: 'relative', overflow: 'hidden', padding: '30px 0 70px',
          background: 'linear-gradient(180deg, var(--site-bg) 0%, var(--site-surface-alt) 100%)'
        }}>
          {/* Glass Glow Effect Background */}
          <div style={{
            position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)',
            width: '80%', height: 420, background: 'var(--site-primary)',
            filter: 'blur(160px)', opacity: 0.15, borderRadius: '50%', zIndex: 0
          }} />

          <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'var(--site-surface)', border: '1px solid var(--site-border)', borderRadius: 100, fontSize: '0.85rem', fontWeight: 600, color: 'var(--site-primary)', marginBottom: 20, boxShadow: 'var(--site-shadow-sm)' }}>
              <Zap size={14} fill="var(--site-primary)" /> Novos Polos EAD Abertos
            </div>
            
            <h1 style={{ maxWidth: 900, margin: '0 auto 16px', letterSpacing: '-0.03em' }}>
              Ecossistema Educacional de <span style={{ color: 'var(--site-primary)' }}>Excelência e Impacto</span>
            </h1>
            
            <p style={{ maxWidth: 680, margin: '0 auto 32px', fontSize: '1.25rem', color: 'var(--site-text-secondary)', lineHeight: 1.6 }}>
              Formação de alta qualidade, inovação agroecológica e desenvolvimento social sustentável para o Maranhão, Pará e todo o Brasil.
            </p>
            
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/cursos" className="btn btn-primary" style={{ padding: '16px 36px', fontSize: '1.05rem' }}>
                Explorar Programas <ArrowRight size={18} />
              </Link>
              <Link href="/sobre" className="btn btn-glass" style={{ padding: '16px 36px', fontSize: '1.05rem' }}>
                Conhecer o Instituto
              </Link>
            </div>

            {/* Impact Metrics Row */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 60, marginTop: 48, flexWrap: 'wrap', opacity: 0.9 }}>
              {[
                { label: 'Famílias Atingidas', value: '+5k' },
                { label: 'Unidades Agroecológicas', value: '18' },
                { label: 'Polos EAD', value: '+30' },
                { label: 'Anos de Atuação', value: '+10' },
              ].map((stat, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'var(--font-outfit)', color: 'var(--site-text-primary)' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--site-text-tertiary)' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. EIXOS DE ATUAÇÃO (Features Grid) */}
        <section className="section-padding" style={{ background: 'var(--site-surface)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 80, maxWidth: 800, margin: '0 auto 80px' }}>
              <h2 style={{ marginBottom: 16 }}>Pilares da Nossa Atuação</h2>
              <p style={{ color: 'var(--site-text-secondary)', fontSize: '1.1rem' }}>
                Atuamos em múltiplas frentes para garantir educação superior, suporte técnico e emancipação financeira.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 32 }}>
              {[
                { icon: BookOpen, title: 'Ensino Superior & EAD', desc: 'Graduações e Pós-graduações com polos estruturados no interior.', color: 'var(--site-primary)' },
                { icon: Leaf, title: 'Agricultura Regenerativa', desc: 'Assistência técnica para quintais e propriedades agroecológicas.', color: '#10B981' },
                { icon: Users, title: 'Educação Popular', desc: 'Cursos técnicos focados na realidade de comunidades rurais e quilombolas.', color: '#F59E0B' },
                { icon: HeartHandshake, title: 'Economia Solidária', desc: 'Gestão de cooperativas e escoamento da produção familiar.', color: '#8B5CF6' },
                { icon: Laptop, title: 'Inclusão Digital Jovem', desc: 'Capacitação em informática básica e autonomia produtiva para jovens rurais.', color: '#06B6D4' },
                { icon: LineChart, title: 'Consultoria Estratégica', desc: 'Planejamento metodológico e elaboração de projetos para prefeituras e OSCs.', color: '#EC4899' }
              ].map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div key={i} className="glass-panel" style={{ padding: 40 }}>
                    <div style={{ 
                      width: 56, height: 56, borderRadius: 'var(--site-radius-md)',
                      background: `${feature.color}15`, color: feature.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: 24
                    }}>
                      <Icon size={28} strokeWidth={2.2} />
                    </div>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: 12 }}>{feature.title}</h3>
                    <p style={{ color: 'var(--site-text-secondary)', lineHeight: 1.6 }}>{feature.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* 3. A PLATAFORMA (Metodologia) */}
        <section className="section-padding" style={{ background: 'var(--site-bg)', borderTop: '1px solid var(--site-border)' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 80, alignItems: 'center' }}>
            <div>
              <h2 style={{ marginBottom: 24, fontSize: '2.5rem' }}>Aprenda no seu ritmo, de qualquer lugar do Brasil.</h2>
              <p style={{ fontSize: '1.15rem', color: 'var(--site-text-secondary)', marginBottom: 40, lineHeight: 1.7 }}>
                Nossa metodologia híbrida combina o melhor do Ensino a Distância (EAD) com encontros presenciais práticos nos polos e acompanhamento técnico direto em campo.
              </p>
              
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 20 }}>
                {['Acesso vitalício aos materiais de apoio', 'Certificado reconhecido pelo MEC', 'Apoio de tutores presencial e online', 'Projetos aplicados à sua realidade regional'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: '1.05rem', color: 'var(--site-text-primary)', fontWeight: 500 }}>
                    <CheckCircle2 color="var(--site-primary)" size={24} /> {item}
                  </li>
                ))}
              </ul>
              
              <div style={{ marginTop: 48 }}>
                <Link href="/cursos" className="btn btn-primary">Ver Catálogo de Cursos</Link>
              </div>
            </div>
            
            <div style={{ position: 'relative' }}>
              <div className="glass-panel" style={{ height: 440, padding: 24, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img 
                  src="/images/planejamento.png" 
                  alt="Metodologia Híbrida de Ensino do Instituto Gênesis" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'var(--site-radius-md)' }} 
                />
              </div>
            </div>
          </div>
        </section>

        {/* 4. CTA FINAL (Pricing Style) */}
        <section className="section-padding" style={{ background: 'var(--site-surface)' }}>
          <div className="container">
            <div className="glass-panel" style={{ padding: '80px 40px', textAlign: 'center', background: 'var(--site-primary)', color: 'white', border: 'none' }}>
              <h2 style={{ color: 'white', marginBottom: 20, fontSize: '2.8rem' }}>Transforme seu futuro hoje.</h2>
              <p style={{ maxWidth: 600, margin: '0 auto 40px', fontSize: '1.2rem', opacity: 0.9, lineHeight: 1.6 }}>
                Junte-se a milhares de parceiros, alunos e produtores rurais que já deram o próximo passo rumo ao desenvolvimento social sustentável.
              </p>
              <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
                <Link href="/contato" className="btn" style={{ background: 'white', color: 'var(--site-primary)', padding: '16px 40px' }}>
                  Fale com a Gênesis
                </Link>
                <Link href="/graduacao" className="btn" style={{ background: 'rgba(255, 255, 255, 0.1)', border: '1px solid rgba(255, 255, 255, 0.4)', color: 'white', padding: '16px 40px' }}>
                  Matrículas Abertas
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}

// Icons used in features (not available straight from lucide default imports without destructing sometimes)
const UserCircle = ({ size, color, strokeWidth }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><circle cx="12" cy="12" r="10"/></svg>
);
const HandsHelping = ({ size, color, strokeWidth }: any) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><path d="M11 12h2a2 2 0 1 0 0-4h-3c-2.76 0-5 2.24-5 5v5c0 2.21 1.79 4 4 4h9.5c1.38 0 2.5-1.12 2.5-2.5 0-1.14-.76-2.11-1.84-2.4l-2.03-.54c-1.25-.33-2.13-1.46-2.13-2.75V11"/></svg>
);
