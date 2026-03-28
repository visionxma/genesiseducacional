import PublicLayout from '../components/PublicLayout';
import Link from 'next/link';
import { BookOpen, Sprout, Lightbulb, HeartHandshake, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Cursos | Instituto Gênesis',
};

export default function Cursos() {
  const categories = [
    { icon: Sprout, title: "Agroecologia e Sementes Crioulas", desc: "Aprenda técnicas de manejo e preservação para fortalecimento da agricultura familiar e resiliência climática.", color: "#10B981" },
    { icon: Lightbulb, title: "Gestão de Projetos Sociais", desc: "Formação para elaboração e monitoramento de projetos comunitários de impacto e captação de recursos.", color: "#8B5CF6" },
    { icon: HeartHandshake, title: "Empreendedorismo Feminino", desc: "Apoio para mulheres iniciarem e expandirem negócios baseados em economia solidária de base comunitária.", color: "#F59E0B" }
  ];

  return (
    <PublicLayout>
      <main className="animate-fade-up">
        {/* HERO */}
        <section style={{ 
          position: 'relative', overflow: 'hidden', padding: '60px 0 80px',
          background: 'linear-gradient(180deg, var(--site-bg) 0%, var(--site-surface-alt) 100%)',
          textAlign: 'center'
        }}>
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'var(--site-surface)', border: '1px solid var(--site-border)', borderRadius: 100, fontSize: '0.85rem', fontWeight: 600, color: 'var(--site-primary)', marginBottom: 20, boxShadow: 'var(--site-shadow-sm)' }}>
              <BookOpen size={14} /> Cursos de Capacitação
            </div>
            <h1 style={{ maxWidth: 900, margin: '0 auto 16px' }}>
              Catálogo de <span style={{ color: 'var(--site-primary)' }}>Cursos Abertos</span>
            </h1>
            <p style={{ maxWidth: 680, margin: '0 auto', fontSize: '1.25rem', color: 'var(--site-text-secondary)' }}>
              Educação voltada para a prática, focada nas necessidades das comunidades e no desenvolvimento local sustentável.
            </p>
          </div>
        </section>

        {/* CURSOS GRID */}
        <section className="section-padding" style={{ background: 'var(--site-surface)' }}>
          <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
              <h2 style={{ fontSize: '2rem' }}>Explorar Categorias</h2>
              <select style={{ padding: '12px 20px', borderRadius: 'var(--site-radius-full)', border: '1px solid var(--site-border)', background: 'var(--site-bg)', fontFamily: 'var(--font-inter)', fontSize: '0.95rem', fontWeight: 500, color: 'var(--site-text-primary)', outline: 'none', cursor: 'pointer', boxShadow: 'var(--site-shadow-sm)' }}>
                <option>Todos os cursos</option>
                <option>Agricultura</option>
                <option>Inovação</option>
                <option>Empoderamento</option>
              </select>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
              {categories.map((curso, i) => {
                const Icon = curso.icon;
                return (
                  <div key={i} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    <div style={{ height: 180, background: 'var(--site-bg)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div style={{ width: 64, height: 64, borderRadius: '50%', background: `${curso.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: curso.color }}>
                        <Icon size={32} strokeWidth={1.5} />
                      </div>
                    </div>
                    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', flex: 1 }}>
                      <h3 style={{ fontSize: '1.4rem', marginBottom: 12 }}>{curso.title}</h3>
                      <p style={{ color: 'var(--site-text-secondary)', marginBottom: 20, lineHeight: 1.5, flex: 1 }}>
                        {curso.desc}
                      </p>
                      <button className="btn btn-glass" style={{ width: '100%', justifyContent: 'space-between' }}>
                        Ver Conteúdo do Curso <ArrowRight size={16} />
                      </button>
                    </div>
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
