import PublicLayout from './components/PublicLayout';
import Link from 'next/link';
import PilaresCarousel from './components/PilaresCarousel';
import { ArrowRight, Zap, CheckCircle2 } from 'lucide-react';

export default function Home() {
  return (
    <PublicLayout>
      <main className="animate-fade-up" style={{ display: 'flex', flexDirection: 'column', background: 'var(--site-bg)' }}>

        <section className="glass-section-white" style={{ 
          padding: '120px 0 0',
          position: 'relative', 
          overflow: 'hidden',
          background: 'none'
        }}>
          {/* BACKGROUND BACKGROUND */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: "url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            opacity: 0.4,
          }} />
          <div className="hero-overlay" />
          <div className="glow-point" style={{ top: '-10%', left: '10%' }} />
          <div className="glow-point" style={{ bottom: '-10%', right: '10%' }} />

          <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
            <div className="animate-float" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'white', border: '1px solid var(--site-border)', borderRadius: 0, fontSize: '0.9rem', fontWeight: 600, color: 'var(--site-primary)', marginBottom: 24, boxShadow: 'var(--site-shadow-sm)' }}>
              <Zap size={16} fill="var(--site-primary)" /> Novos Polos EAD Abertos no Maranhão
            </div>

            <h1 style={{ maxWidth: 940, margin: '0 auto 20px', fontSize: 'clamp(2.5rem, 6vw, 4.4rem)', lineHeight: 1.05 }}>
              Referência em <span style={{ color: 'var(--site-primary)' }}>Impacto Social</span> e Formação Profissional
            </h1>

            <p style={{ maxWidth: 720, margin: '0 auto 40px', fontSize: '1.35rem', color: 'var(--site-text-secondary)', fontWeight: 400, transform: 'translateY(10px)' }}>
              Metodologias inovadoras e programas acadêmicos reconhecidos, construindo caminhos reais para a juventude e a agricultura do campo.
            </p>

            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 60 }}>
              <Link href="/cursos" className="btn btn-primary" style={{ padding: '18px 44px', fontSize: '1.1rem' }}>
                Conhecer Nossos Cursos <ArrowRight size={20} />
              </Link>
              <Link href="/graduacao" className="btn btn-glass" style={{ padding: '18px 44px', fontSize: '1.1rem' }}>
                Estudar na Gênesis
              </Link>
            </div>

          </div>
          
          {/* Infinite Metrics Ticker — Full Width Divider */}
          <div className="ticker-wrap">
            <div className="ticker">
              {[
                { label: 'Unidades Ativas', value: '18' },
                { label: 'Alunos Impactados', value: '+5.000' },
                { label: 'Rede de Polos EAD', value: '+30' },
                { label: 'Anos de Tradição', value: '11' },
              ].concat([
                { label: 'Unidades Ativas', value: '18' },
                { label: 'Alunos Impactados', value: '+5.000' },
                { label: 'Rede de Polos EAD', value: '+30' },
                { label: 'Anos de Tradição', value: '11' },
              ]).map((stat, i) => (
                <div key={i} className="ticker-item">
                  <span className="ticker-item-label">{stat.label}</span>
                  <span className="ticker-item-value">{stat.value}</span>
                  <div className="ticker-dot" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. PILARES — Carrossel com foto de fundo */}
        <section style={{ overflow: 'hidden' }}>
          <PilaresCarousel />
        </section>

        {/* 3. METODOLOGIA — Glass White */}
        <section className="glass-section-white section-padding">
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: 80, alignItems: 'center' }}>
            <div>
              <h2 style={{ marginBottom: 20, fontSize: '2.2rem' }}>Aprenda no seu ritmo, de qualquer lugar do Brasil.</h2>
              <p style={{ fontSize: '1.1rem', color: 'var(--site-text-secondary)', marginBottom: 36, lineHeight: 1.7 }}>
                Nossa metodologia híbrida combina o melhor do Ensino a Distância (EAD) com encontros presenciais práticos nos polos e acompanhamento técnico direto em campo.
              </p>

              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 18 }}>
                {['Acesso vitalício aos materiais de apoio', 'Certificado reconhecido pelo MEC', 'Apoio de tutores presencial e online', 'Projetos aplicados à sua realidade regional'].map((item, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: '1rem', color: 'var(--site-text-primary)', fontWeight: 500 }}>
                    <CheckCircle2 color="var(--site-primary)" size={22} /> {item}
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: 40 }}>
                <Link href="/cursos" className="btn btn-primary">Ver Catálogo de Cursos</Link>
              </div>
            </div>

            <div>
              <div className="glass-panel" style={{ height: 400, padding: 16, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src="/images/planejamento.png"
                  alt="Metodologia Híbrida de Ensino do Instituto Gênesis"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 0 }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* 4. CTA — Azul sólido */}
        <section style={{
          background: 'var(--site-primary)',
          backgroundImage: `
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: '40px 40px',
          padding: '100px 0',
          textAlign: 'center',
        }}>
          <div className="container">
            <h2 style={{ color: 'white', marginBottom: 16, fontSize: '2.4rem' }}>Transforme seu futuro hoje.</h2>
            <p style={{ maxWidth: 560, margin: '0 auto 36px', fontSize: '1.15rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
              Junte-se a milhares de parceiros, alunos e produtores rurais que já deram o próximo passo rumo ao desenvolvimento social sustentável.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/contato" className="btn" style={{ background: 'white', color: 'var(--site-primary)', padding: '15px 36px' }}>
                Fale com a Gênesis
              </Link>
              <Link href="/graduacao" className="btn" style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.35)', color: 'white', padding: '15px 36px' }}>
                Matrículas Abertas
              </Link>
            </div>
          </div>
        </section>

      </main>
    </PublicLayout>
  );
}
