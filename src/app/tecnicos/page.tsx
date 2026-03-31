import PublicLayout from '../components/PublicLayout';
import { ArrowRight, Wrench, Laptop, Anchor } from 'lucide-react';

export const metadata = {
  title: 'Cursos Técnicos | Instituto Gênesis',
};

export default function Tecnicos() {
  const cursosRef = [
    { icon: Wrench, title: "Técnico em Agropecuária", desc: "Formação com ênfase em inovações sociais, gerenciamento de unidades de produção familiar em prol das famílias quilombolas e tradicionais.", color: "#10B981" },
    { icon: Laptop, title: "Técnico em Informática Básica", desc: "Essencial para a juventude rural adquirir bases sólidas de autonomia digital de trabalho e inclusão produtiva digital.", color: "#2B44FF" },
    { icon: Anchor, title: "Gestão na Pesca Artesanal", desc: "Preificação, manuseio produtivo e abertura de portas nos canais legais como PAA e PNAE, essenciais na região dos Lençóis Maranhenses.", color: "#06B6D4" }
  ];

  return (
    <PublicLayout>
      <main className="animate-fade-up" style={{ background: 'var(--site-bg)' }}>
        {/* HERO */}
        <section className="glass-section-white" style={{ 
          position: 'relative', overflow: 'hidden', padding: '100px 0 80px',
          textAlign: 'center'
        }}>
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <h1 style={{ maxWidth: 900, margin: '0 auto 16px' }}>
              Cursos <span style={{ color: 'var(--site-primary)' }}>Técnicos e Profissionalizantes</span>
            </h1>
            <p style={{ maxWidth: 700, margin: '0 auto', fontSize: '1.25rem', color: 'var(--site-text-secondary)', lineHeight: 1.6 }}>
              Eixo crucial para empregabilidade imediata, oferecendo ferramentas diretas e claras para a juventude e agricultura familiar.
            </p>
          </div>
        </section>

        {/* LIST */}
        <section className="glass-section-white" style={{ borderTop: 'none', padding: '80px 0' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20 }}>
              {cursosRef.map((curso, i) => {
                const Icon = curso.icon;
                return (
                  <div key={i} className="glass-panel" style={{ padding: 32, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ width: 56, height: 56, borderRadius: 'var(--site-radius-md)', background: `${curso.color}15`, color: curso.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                      <Icon size={32} strokeWidth={1.5} />
                    </div>
                    <h3 style={{ fontSize: '1.4rem', marginBottom: 12 }}>{curso.title}</h3>
                    <p style={{ color: 'var(--site-text-secondary)', marginBottom: 24, lineHeight: 1.5, flex: 1 }}>{curso.desc}</p>
                    <button className="btn btn-glass" style={{ width: '100%' }}>
                      Previsão de Turmas <ArrowRight size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
