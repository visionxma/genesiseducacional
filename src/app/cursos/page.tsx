import Image from 'next/image';

export const metadata = {
  title: 'Cursos | Instituto Gênesis',
};

export default function Cursos() {
  return (
    <main className="animate-fade-in-up">
      <section className="bg-primary section-padding" style={{textAlign: 'center', color: '#fff' }}>
        <div className="container">
          <h1 style={{fontSize: '3rem', marginBottom: '20px', color: '#fff'}}>Nossos Cursos</h1>
          <p style={{fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto'}}>Educação voltada para a prática, focada nas necessidades das comunidades e no desenvolvimento local sustentável.</p>
        </div>
      </section>

      <section className="bg-light" style={{padding: '72px 0'}}>
        <div className="container">
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px'}}>
            <h2>Explorar Categorias</h2>
            <select style={{padding: '10px 14px', borderRadius: '8px', border: '1px solid #ccc', fontFamily: 'var(--font-inter)', fontSize: '0.9rem', color: 'var(--color-secondary)', cursor: 'pointer', backgroundColor: 'var(--color-white)'}}>
              <option>Todos os cursos</option>
              <option>Agricultura</option>
              <option>Inovação</option>
              <option>Empoderamento</option>
            </select>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px'}}>
            {/* Example Card */}
            <div className="bg-white" style={{borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)'}}>
              <div style={{height: '220px', backgroundColor: '#e3e3f1', position: 'relative'}}>
                {/* Image placeholder */}
              </div>
              <div style={{padding: '24px 24px 28px'}}>
                <h3 style={{marginBottom: '12px'}}>Agroecologia e Sementes Crioulas</h3>
                <p style={{marginBottom: '20px', color: 'var(--color-text-secondary)'}}>Aprenda técnicas de manejo e preservação para fortalecimento da agricultura familiar.</p>
                <button className="btn-secondary" style={{width: '100%'}}>Saiba Mais</button>
              </div>
            </div>

            <div className="bg-white" style={{borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)'}}>
              <div style={{height: '220px', backgroundColor: '#ccc', position: 'relative'}}>
              </div>
              <div style={{padding: '24px 24px 28px'}}>
                <h3 style={{marginBottom: '12px'}}>Gestão de Projetos Sociais</h3>
                <p style={{marginBottom: '20px', color: 'var(--color-text-secondary)'}}>Formação para elaboração e monitoramento de projetos comunitários de impacto.</p>
                <button className="btn-secondary" style={{width: '100%'}}>Saiba Mais</button>
              </div>
            </div>

            <div className="bg-white" style={{borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)'}}>
              <div style={{height: '220px', backgroundColor: '#aaa', position: 'relative'}}>
              </div>
              <div style={{padding: '24px 24px 28px'}}>
                <h3 style={{marginBottom: '12px'}}>Empreendedorismo Feminino</h3>
                <p style={{marginBottom: '20px', color: 'var(--color-text-secondary)'}}>Apoio para mulheres iniciarem e expandirem negócios baseados em economia solidária.</p>
                <button className="btn-secondary" style={{width: '100%'}}>Saiba Mais</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
