export const metadata = {
  title: 'Blog Instiucional | Instituto Gênesis',
};

export default function Blog() {
  return (
    <main className="animate-fade-in-up">
      <section className="bg-primary section-padding text-center">
        <div className="container" style={{color: '#fff'}}>
          <h1 style={{fontSize: '3.5rem', marginBottom: '20px', color: '#fff'}}>Notícias e Relatos</h1>
          <p style={{fontSize: '1.2rem'}}>Acompanhe os projetos, histórias de comunidades e impactos do Instituto Gênesis.</p>
        </div>
      </section>

      <section className="bg-white section-padding">
        <div className="container">
          
          {/* Main Feature Article */}
          <div style={{display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '60px'}}>
            <div style={{width: '100%', height: '400px', borderRadius: '16px', backgroundColor: 'var(--color-background)'}}></div>
            <div style={{maxWidth: '800px'}}>
              <span style={{color: 'var(--color-primary)', fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '1px'}}>NOVOS PROJETOS • 10 MAR 2024</span>
              <h2 style={{fontSize: '2.5rem', margin: '10px 0'}}>Implantação de Quintais Agroecológicos apoiados pelo MDA</h2>
              <p style={{color: 'var(--color-text-secondary)', fontSize: '1.1rem'}}>Mais de 2 projetos recentemente aprovados para implementação de Unidades Ecológicas começam a impactar 5 municípios no Maranhão...</p>
              <button className="btn-primary" style={{marginTop: '20px'}}>Ler Artigo Completo</button>
            </div>
          </div>

          {/* Grid 3 colunas */}
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px'}}>
            
            <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
              <div style={{height: '220px', borderRadius: '12px', backgroundColor: 'var(--color-background)'}}></div>
              <span style={{color: 'var(--color-primary)', fontSize: '0.8rem'}}>DOCUMENTÁRIO • 2019</span>
              <h3>O Sucesso de "Catadores: Da Invisibilidade ao Protagonismo"</h3>
              <p style={{color: 'var(--color-text-secondary)'}}>Como evidenciamos a vida real e as dores e forças dessas comunidades através do audiovisual...</p>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
              <div style={{height: '220px', borderRadius: '12px', backgroundColor: 'var(--color-background)'}}></div>
              <span style={{color: 'var(--color-primary)', fontSize: '0.8rem'}}>ECONOMIA SOLIDÁRIA • 2022</span>
              <h3>Grupos de mulheres avançam criando produtos de alta renda</h3>
              <p style={{color: 'var(--color-text-secondary)'}}>Sementes crioulas preservadas pelas mulheres do campo se tornam base para negócios sustentáveis...</p>
            </div>

            <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
              <div style={{height: '220px', borderRadius: '12px', backgroundColor: 'var(--color-background)'}}></div>
              <span style={{color: 'var(--color-primary)', fontSize: '0.8rem'}}>AÇÕES • 2024</span>
              <h3>Início das turmas do Polo Técnico de Godofredo Viana</h3>
              <p style={{color: 'var(--color-text-secondary)'}}>Iniciando com jovens locais buscando oportunidades através de parcerias com Prefeituras...</p>
            </div>

          </div>

        </div>
      </section>
    </main>
  );
}
