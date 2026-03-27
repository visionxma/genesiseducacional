export const metadata = {
  title: 'Graduação e Pós | Instituto Gênesis',
};

export default function Graduacao() {
  return (
    <main className="animate-fade-in-up">
      <section className="bg-primary section-padding text-center">
        <div className="container">
          <h1 style={{fontSize: '3rem', color: '#fff', marginBottom: '20px'}}>Graduação e Pós-Graduação</h1>
          <p style={{fontSize: '1.2rem', color: '#fff', opacity: 0.9, maxWidth: '600px', margin: '0 auto'}}>
            O Instituto Gênesis conta com parcerias fortes e rede de organizações (OSC) pelo estado do Maranhão para facilitar o seu acesso ao ensino superior de qualidade.
          </p>
        </div>
      </section>

      <section className="bg-light section-padding">
        <div className="container">
          <div style={{display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'center'}}>
            
            <div style={{maxWidth: '800px', width: '100%', background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)'}}>
              <h2 style={{color: 'var(--color-primary)', marginBottom: '15px'}}>Benefícios de Estudar com Nossas Parcerias</h2>
              <ul style={{listStyle: 'none', paddingLeft: 0, fontSize: '1.1rem', color: 'var(--color-text-secondary)', lineHeight: '1.8'}}>
                <li>🎓 Acesso a bolsas e descontos exclusivos nas mensalidades.</li>
                <li>🎯 Cursos alinhados com as demandas regionais do MA e PA.</li>
                <li>📝 Suporte da equipe Gênesis durante sua matrícula.</li>
                <li>🌐 Possibilidade de engajar em projetos sociais acadêmicos.</li>
              </ul>
            </div>

            <div style={{maxWidth: '800px', width: '100%'}}>
              <h3 style={{fontSize: '2rem', marginBottom: '20px', marginTop: '40px'}}>Cursos em Destaque</h3>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px'}}>
                <div style={{background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)'}}>
                  <h4 style={{fontSize: '1.3rem', marginBottom: '8px'}}>Pedagogia</h4>
                  <p style={{color: 'var(--color-text-secondary)'}}>Licenciatura e especializações.</p>
                </div>
                <div style={{background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)'}}>
                  <h4 style={{fontSize: '1.3rem', marginBottom: '8px'}}>Gestão Ambiental</h4>
                  <p style={{color: 'var(--color-text-secondary)'}}>Foco em conservação e desenvolvimento.</p>
                </div>
                <div style={{background: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)'}}>
                  <h4 style={{fontSize: '1.3rem', marginBottom: '8px'}}>Serviço Social</h4>
                  <p style={{color: 'var(--color-text-secondary)'}}>Práticas para o terceiro setor e políticas públicas.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
