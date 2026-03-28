import PublicLayout from '../components/PublicLayout';
import { Search, PenTool, Users, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Consultoria Pedagógica | Instituto Gênesis',
};

export default function Consultoria() {
  const steps = [
    { num: "01", icon: Search, title: "Diagnóstico e Levantamentos", desc: "Assim como fizemos nas comunidades de Itapecuru, mapeamos e realizamos um rigoroso diagnóstico: forças locais, gargalos, mercado regional e metas factíveis.", color: "var(--site-primary)" },
    { num: "02", icon: PenTool, title: "Planejamento Metodológico", desc: "Desenhamos a esteira educacional e auxiliamos na elaboração de projetos e acessos a financiamento (PAA, PNAE, PRONAF) para prefeituras e OSCs.", color: "#8B5CF6" },
    { num: "03", icon: Users, title: "Acompanhamento Técnico", desc: "Nossa equipe atua em campo garantindo que a metodologia rende frutos reais em projetos de empoderamento feminino e social.", color: "#10B981" }
  ];

  return (
    <PublicLayout>
      <main className="animate-fade-up">
        {/* HERO */}
        <section style={{ 
          position: 'relative', overflow: 'hidden', padding: '80px 0 100px',
          background: 'linear-gradient(135deg, var(--site-surface-alt) 0%, var(--site-bg) 100%)',
          borderBottom: '1px solid var(--site-border)',
          textAlign: 'center'
        }}>
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <h1 style={{ maxWidth: 900, margin: '0 auto 20px' }}>
              Consultoria <span style={{ color: 'var(--site-primary)' }}>Estratégica Educacional</span>
            </h1>
            <p style={{ maxWidth: 700, margin: '0 auto 40px', fontSize: '1.25rem', color: 'var(--site-text-secondary)', lineHeight: 1.6 }}>
              Soluções educacionais customizadas para prefeituras, instituições privadas e projetos de alto impacto social.
            </p>
            <button className="btn btn-primary" style={{ padding: '16px 40px', fontSize: '1.1rem' }}>
              Agendar Reunião Especializada
            </button>
          </div>
        </section>

        {/* METODOLOGIA */}
        <section className="section-padding" style={{ background: 'var(--site-bg)' }}>
          <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="glass-panel" style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap', flexDirection: i % 2 !== 0 ? 'row-reverse' : 'row', padding: 32, position: 'relative', overflow: 'hidden' }}>
                  
                  {/* Etiqueta de Número Fundo */}
                  <div style={{ position: 'absolute', top: -40, right: i % 2 === 0 ? 40 : 'auto', left: i % 2 !== 0 ? 40 : 'auto', fontSize: '12rem', fontWeight: 800, color: step.color, opacity: 0.03, fontFamily: 'var(--font-outfit)' }}>
                    {step.num}
                  </div>

                  <div style={{ flex: '1 1 400px', position: 'relative', zIndex: 1 }}>
                    <div style={{ width: 64, height: 64, borderRadius: 'var(--site-radius-md)', background: `${step.color}15`, color: step.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                      <Icon size={32} strokeWidth={1.5} />
                    </div>
                    <h2 style={{ fontSize: '2rem', marginBottom: 12 }}>{step.title}</h2>
                    <p style={{ fontSize: '1.05rem', color: 'var(--site-text-secondary)', lineHeight: 1.6, marginBottom: 20 }}>
                      {step.desc}
                    </p>
                    <button className="btn btn-glass" style={{ color: step.color }}>
                      Entender esta etapa <ArrowRight size={16} />
                    </button>
                  </div>
                  
                  <div style={{ flex: '1 1 400px', height: 340, borderRadius: 'var(--site-radius-lg)', border: '1px solid var(--site-border)', boxShadow: 'var(--site-shadow-sm)', position: 'relative', zIndex: 1, overflow: 'hidden' }}>
                    <img 
                      src={`/images/${i === 0 ? 'diagnostico' : i === 1 ? 'planejamento' : 'acompanhamento'}.png`} 
                      alt={step.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
