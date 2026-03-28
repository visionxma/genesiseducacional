import PublicLayout from '../components/PublicLayout';
import Link from 'next/link';

export const metadata = {
  title: 'Blog Institucional | Instituto Gênesis',
};

export default function Blog() {
  const posts = [
    { type: "DOCUMENTÁRIO", date: "2019", title: "O Sucesso de 'Catadores: Da Invisibilidade ao Protagonismo'", desc: "Como evidenciamos a vida real e as forças das comunidades através do poder do audiovisual e narrativas verdadeiras.", color: "#F59E0B" },
    { type: "ECONOMIA SOLIDÁRIA", date: "2022", title: "Grupos avançam criando produtos de alta renda familiar", desc: "Sementes crioulas preservadas pelas mulheres do campo se tornam base forte para negócios coletivos sustentáveis.", color: "#10B981" },
    { type: "AÇÕES COMUNITÁRIAS", date: "2024", title: "Novas turmas de Polos Técnicos de Empregabilidade", desc: "Iniciando atividades curriculares com jovens buscando oportunidades reais nas associações de agricultura.", color: "#2B44FF" }
  ];

  return (
    <PublicLayout>
      <main className="animate-fade-up">
        {/* HEADER */}
        <section style={{ borderBottom: '1px solid var(--site-border)', padding: '30px 0', background: 'var(--site-surface)' }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: 12 }}>Notícias e Relatos</h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--site-text-secondary)' }}>Acompanhe os projetos, histórias e o impacto das ações do Instituto Gênesis.</p>
          </div>
        </section>

        {/* POSTS GRID */}
        <section className="section-padding" style={{ background: 'var(--site-bg)' }}>
          <div className="container">
            
            {/* FEATURED POST */}
            <div className="glass-panel" style={{ padding: 32, marginBottom: 40, display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 400px', height: 320, borderRadius: 'var(--site-radius-md)', overflow: 'hidden', border: '1px solid var(--site-border)' }}>
                <img src="/images/blog_destaque.png" alt="Featured Post" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: '1 1 400px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <span style={{ padding: '6px 12px', background: 'var(--site-primary-glow)', color: 'var(--site-primary)', fontSize: '0.75rem', fontWeight: 700, borderRadius: 100, letterSpacing: '0.05em' }}>NOVOS PROJETOS</span>
                  <span style={{ color: 'var(--site-text-tertiary)', fontSize: '0.9rem', fontWeight: 500 }}>10 MAR 2024</span>
                </div>
                <h2 style={{ fontSize: '2rem', lineHeight: 1.2, marginBottom: 16 }}>Implantação de Quintais Agroecológicos apoiados pelo MDA do Governo Federal.</h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--site-text-secondary)', lineHeight: 1.6, marginBottom: 24 }}>
                  Mais de dois projetos aprovados em grande escala para a implementação de novas Unidades de Conservação começam a impactar forte em 5 municípios diferentes.
                </p>
                <button className="btn btn-primary">Ler Artigo Completo</button>
              </div>
            </div>

            {/* LISTING */}
            <h3 style={{ fontSize: '1.6rem', marginBottom: 20 }}>Publicações Recentes</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
              {posts.map((post, i) => (
                <div key={i} className="glass-panel" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: 20 }}>
                  <div style={{ height: 180, borderRadius: 'var(--site-radius-sm)', marginBottom: 16, overflow: 'hidden', border: '1px solid var(--site-border)' }}>
                    <img 
                      src={`/images/${i === 0 ? 'blog_doc' : i === 1 ? 'blog_mulheres' : 'blog_destaque'}.png`} 
                      alt={post.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <span style={{ color: post.color, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.05em' }}>{post.type}</span>
                    <span style={{ color: 'var(--site-text-tertiary)', fontSize: '0.8rem' }}>• {post.date}</span>
                  </div>
                  <h4 style={{ fontSize: '1.4rem', marginBottom: 12, lineHeight: 1.3 }}>{post.title}</h4>
                  <p style={{ color: 'var(--site-text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>{post.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
