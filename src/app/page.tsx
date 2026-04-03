import PublicLayout from './components/PublicLayout';
import Link from 'next/link';
import PilaresCarousel from './components/PilaresCarousel';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Home() {
  return (
    <PublicLayout>
      <main className="animate-fade-up" style={{ display: 'flex', flexDirection: 'column', background: 'var(--site-bg)' }}>

        {/* HERO — imagem pura com botões sobrepostos */}
        <section style={{ width: '100%', position: 'relative' }}>
          <picture>
            <source media="(max-width: 767px)" srcSet="/HeroCelular.jpg" />
            <img
              src="/Hero-Carousel - Copia.jpg"
              alt="Gênesis Educacional — Conquiste sua melhor versão"
              style={{ width: '100%', display: 'block', objectFit: 'cover' }}
            />
          </picture>
          <div className="hero-btns">
            <Link href="/cursos" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '0.9rem' }}>
              Conhecer Nossos Cursos <ArrowRight size={16} />
            </Link>
            <Link href="/blog" className="btn" style={{ padding: '12px 24px', fontSize: '0.9rem', background: 'white', color: 'var(--site-primary)', border: 'none' }}>
              Blog
            </Link>
          </div>
          <Link href="/cursos" className="hero-btn-mobile" >
            Conhecer Nossos Cursos <ArrowRight size={16} />
          </Link>
          <style>{`
            .hero-btns {
              display: none;
            }
            @media (min-width: 768px) {
              .hero-btns {
                display: flex;
                gap: 12px;
                position: absolute;
                top: 78%;
                right: 8%;
                transform: translateY(-50%);
              }
            }
            .hero-btn-mobile {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 8px;
              position: absolute;
              top: 80%;
              left: 50%;
              transform: translateX(-50%);
              background: white;
              color: var(--site-primary);
              font-weight: 700;
              font-size: 1rem;
              padding: 14px 32px;
              white-space: nowrap;
              text-decoration: none;
              border: none;
              box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            }
            @media (min-width: 768px) {
              .hero-btn-mobile { display: none; }
            }
          `}</style>
        </section>

        {/* TICKER — Barra rolante */}
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

        {/* 2. METODOLOGIA — Glass White */}
        <section className="glass-section-white section-padding">
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(380px, 100%), 1fr))', gap: 80, alignItems: 'center' }}>
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

        {/* 3. PILARES — Carrossel com foto de fundo */}
        <section style={{ overflow: 'hidden' }}>
          <PilaresCarousel />
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
              <Link href="/cursos" className="btn" style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.35)', color: 'white', padding: '15px 36px' }}>
                Matrículas Abertas
              </Link>
            </div>
          </div>
        </section>

      </main>
    </PublicLayout>
  );
}
