export const metadata = {
  title: 'Consultoria Pedagógica | Instituto Gênesis',
};

export default function Consultoria() {
  return (
    <main className="animate-fade-in-up">
      {/* Hero */}
      <section className="bg-dark section-padding text-center">
        <div className="container">
          <h1 style={{fontSize: '3.5rem', marginBottom: '20px', color: '#fff'}}>Consultoria Pedagógica</h1>
          <p style={{fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto', opacity: 0.9}}>
            Soluções educacionais customizadas e metodologias para instituições públicas, privadas e projetos sociais que desejam maximizar seu impacto.
          </p>
          <button className="btn-primary" style={{marginTop: '40px'}}>Agendar Reunião</button>
        </div>
      </section>

      {/* Blocos Descritivos */}
      <section className="bg-white section-padding">
        <div className="container" style={{display: 'flex', flexDirection: 'column', gap: '80px'}}>
          
          <div style={{display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap'}}>
            <div style={{flex: '1 1 400px'}}>
              <h2 style={{fontSize: '2.5rem', marginBottom: '20px', color: 'var(--color-primary)'}}>1. Diagnóstico e Levantamentos</h2>
              <p style={{fontSize: '1.1rem', color: 'var(--color-text-secondary)', marginBottom: '20px'}}>
                Assim como fizemos nas comunidades rurais e quilombolas de Itapecuru Mirim e outras regiões, nós mapeamos e realizamos um diagnóstico completo e rigoroso para entender a realidade local.
              </p>
              <ul style={{listStyle: 'none', padding: 0}}>
                <li style={{marginBottom: '10px'}}>✔️ Levantamento das forças e gargalos das comunidades</li>
                <li style={{marginBottom: '10px'}}>✔️ Pesquisa de Mercado Regional</li>
                <li style={{marginBottom: '10px'}}>✔️ Definição de metas factíveis</li>
              </ul>
            </div>
            <div style={{flex: '1 1 400px', height: '300px', backgroundColor: 'var(--color-background)', borderRadius: '16px'}}></div>
          </div>

          <div style={{display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap', flexDirection: 'row-reverse'}}>
            <div style={{flex: '1 1 400px'}}>
              <h2 style={{fontSize: '2.5rem', marginBottom: '20px', color: 'var(--color-primary)'}}>2. Planejamento Metodológico</h2>
              <p style={{fontSize: '1.1rem', color: 'var(--color-text-secondary)', marginBottom: '20px'}}>
                Desenhamos a esteira educacional e auxiliamos na elaboração de projetos e acessos a programas de financiamento como PAA, PNAE, e elaboração de PRONAFS para grupos assistidos ou prefeituras.
              </p>
            </div>
            <div style={{flex: '1 1 400px', height: '300px', backgroundColor: 'var(--color-background)', borderRadius: '16px'}}></div>
          </div>

          <div style={{display: 'flex', gap: '40px', alignItems: 'center', flexWrap: 'wrap'}}>
            <div style={{flex: '1 1 400px'}}>
              <h2 style={{fontSize: '2.5rem', marginBottom: '20px', color: 'var(--color-primary)'}}>3. Capacitação e Acompanhamento</h2>
              <p style={{fontSize: '1.1rem', color: 'var(--color-text-secondary)', marginBottom: '20px'}}>
                O acompanhamento técnico não termina na sala de aula. Nossa equipe multidisciplinar atua diretamente em campo para garantir que a metodologia está sendo implantada e rendendo frutos reais, especialmente em projetos voltados ao empoderamento.
              </p>
            </div>
            <div style={{flex: '1 1 400px', height: '300px', backgroundColor: 'var(--color-background)', borderRadius: '16px'}}></div>
          </div>

        </div>
      </section>
    </main>
  );
}
