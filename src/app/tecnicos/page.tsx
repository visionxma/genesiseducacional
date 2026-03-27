export const metadata = {
  title: 'Cursos Técnicos | Instituto Gênesis',
};

export default function Tecnicos() {
  return (
    <main className="animate-fade-in-up">
      <section className="bg-dark section-padding text-center">
        <div className="container" style={{color: '#fff'}}>
          <h1 style={{fontSize: '3rem', marginBottom: '20px', color: '#fff'}}>Cursos Técnicos e Profissionalizantes</h1>
          <p style={{fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', opacity: 0.9}}>
            Eixo crucial para empregabilidade imediata, os cursos técnicos do Instituto Gênesis oferecem ferramentas claras para a juventude e agricultura familiar.
          </p>
        </div>
      </section>

      <section className="bg-light section-padding">
        <div className="container">
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px'}}>
            
            <div style={{background: '#fff', borderRadius: '16px', padding: '30px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)'}}>
              <div style={{color: 'var(--color-primary)', fontSize: '2rem', marginBottom: '15px'}}>🚜</div>
              <h3 style={{marginBottom: '8px'}}>Técnico em Agropecuária</h3>
              <p style={{color: 'var(--color-text-secondary)', marginBottom: '20px'}}>
                Formação com ênfase em inovações sociais, visando gerenciar unidades de produção familiar e aplicar o conhecimento em prol das famílias quilombolas e tradicionais.
              </p>
              <button className="btn-secondary">Saber Mais</button>
            </div>

            <div style={{background: '#fff', borderRadius: '16px', padding: '30px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)'}}>
              <div style={{color: 'var(--color-primary)', fontSize: '2rem', marginBottom: '15px'}}>💻</div>
              <h3 style={{marginBottom: '8px'}}>Técnico em Informática Básica</h3>
              <p style={{color: 'var(--color-text-secondary)', marginBottom: '20px'}}>
                Essencial para jovens rurais, o instituto apresenta equipamentos à disposição ensinando a construir bases sólidas de autonomia digital de trabalho.
              </p>
              <button className="btn-secondary">Saber Mais</button>
            </div>

            <div style={{background: '#fff', borderRadius: '16px', padding: '30px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)'}}>
              <div style={{color: 'var(--color-primary)', fontSize: '2rem', marginBottom: '15px'}}>🎣</div>
              <h3 style={{marginBottom: '8px'}}>Gestão na Pesca Artesanal</h3>
              <p style={{color: 'var(--color-text-secondary)', marginBottom: '20px'}}>
                Conforme as necessidades de Lençóis Maranhenses, ensinamos precificação, manuseio produtivo e abertura de portas nos canais legais como PAA e PNAE.
              </p>
              <button className="btn-secondary">Saber Mais</button>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
