import PublicLayout from '../components/PublicLayout';
import { GraduationCap, Award, Compass, Globe } from 'lucide-react';

export const metadata = {
  title: 'Graduação e Pós | Instituto Gênesis',
};

export default function Graduacao() {
  return (
    <PublicLayout>
      <main className="animate-fade-up" style={{ background: 'var(--site-bg)' }}>
        {/* HERO */}
        <section className="glass-section-white" style={{ 
          position: 'relative', overflow: 'hidden', padding: '100px 0 80px',
          textAlign: 'center'
        }}>
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'var(--site-surface)', border: '1px solid var(--site-border)', borderRadius: 0, fontSize: '0.85rem', fontWeight: 600, color: 'var(--site-primary)', marginBottom: 20, boxShadow: 'var(--site-shadow-sm)' }}>
              <GraduationCap size={14} /> Ensino Superior
            </div>
            <h1 style={{ maxWidth: 900, margin: '0 auto 16px' }}>
              <span style={{ color: 'var(--site-primary)' }}>Graduação</span> e Pós-Graduação
            </h1>
            <p style={{ maxWidth: 680, margin: '0 auto', fontSize: '1.25rem', color: 'var(--site-text-secondary)', lineHeight: 1.6 }}>
              Parcerias fortes com uma rede de organizações pelo Maranhão para facilitar o seu acesso ao ensino superior de qualidade certificada.
            </p>
          </div>
        </section>

        <section className="glass-section-white" style={{ borderTop: 'none', padding: '80px 0' }}>
          <div className="container">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 40, alignItems: 'center' }}>
              
              {/* Benefícios */}
              <div className="glass-panel" style={{ maxWidth: 900, width: '100%', padding: '32px 40px', display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ flex: '1 1 300px' }}>
                  <h2 style={{ fontSize: '1.8rem', marginBottom: 16 }}>Benefícios da Nossa Rede</h2>
                  <p style={{ color: 'var(--site-text-secondary)', fontSize: '1.05rem', marginBottom: 20 }}>
                    Nossos polos oferecem estrutura e programas de financiamento focados em democratizar o acesso à universidade para jovens do campo e da periferia.
                  </p>
                  <button className="btn btn-primary">Fazer Inscrição no Processo</button>
                </div>
                <div style={{ flex: '1 1 300px' }}>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {[
                      { icon: Award, text: "Acesso a bolsas e descontos exclusivos nas mensalidades." },
                      { icon: Compass, text: "Cursos alinhados com as demandas regionais do MA e PA." },
                      { icon: Globe, text: "Projeto acadêmico com aplicabilidade social imediata." }
                    ].map((item, i) => (
                      <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: '1rem', fontWeight: 500 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 0, background: 'var(--site-primary-glow)', color: 'var(--site-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <item.icon size={20} />
                        </div>
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Courses List */}
              <div style={{ maxWidth: 900, width: '100%' }}>
                <h2 style={{ fontSize: '1.8rem', marginBottom: 24, textAlign: 'center' }}>Cursos em Destaque</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 20 }}>
                  {[
                    { title: "Pedagogia", desc: "Licenciatura e práticas de educação popular.", color: "#8B5CF6" },
                    { title: "Gestão Ambiental", desc: "Foco em conservação, ESG e desenvolvimento.", color: "#10B981" },
                    { title: "Serviço Social", desc: "Práticas públicas e gestão do terceiro setor.", color: "#F59E0B" }
                  ].map((course, i) => (
                    <div key={i} className="glass-panel" style={{ padding: 24, borderTop: `4px solid ${course.color}` }}>
                      <h3 style={{ fontSize: '1.3rem', marginBottom: 8 }}>{course.title}</h3>
                      <p style={{ color: 'var(--site-text-secondary)', lineHeight: 1.5 }}>{course.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
