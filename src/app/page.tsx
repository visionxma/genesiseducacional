import styles from './page.module.css';

export default function Home() {
  return (
    <main className="animate-fade-in-up">
      {/* 1. HERO */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroText}>
              <h1>O começo de novas possibilidades através da educação</h1>
              <p>Formação, inovação e desenvolvimento social para comunidades do Maranhão e Pará.</p>
              <div className={styles.heroActions}>
                <button className="btn-white">Explorar cursos</button>
                <button className="btn-secondary" style={{borderColor: '#fff', color: '#fff'}}>Falar no WhatsApp</button>
              </div>
            </div>
            <div className={styles.heroImage}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/hero.svg"
                alt="Instituto Gênesis Educação em Comunidade"
                width={800}
                height={600}
                style={{width: '100%', height: 'auto', display: 'block'}}
                fetchPriority="high"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. ESSÊNCIA DA MARCA */}
      <section className={styles.essence}>
        <div className="container">
          <h2>"Gênese é criação. Educação é inteligência. Ciência é base."</h2>
        </div>
      </section>

      {/* 3. SOBRE O INSTITUTO (Timeline) */}
      <section className="bg-light section-padding">
        <div className="container">
          <h2 className={styles.sectionTitle}>Nossa Trajetória</h2>
          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <h3>2013 • Fundação</h3>
              <p>Criado para viabilizar educação popular acessível para comunidades rurais e quilombolas de baixa renda.</p>
            </div>
            <div className={styles.timelineItem}>
              <h3>2014 • Brasil Sem Miséria</h3>
              <p>Apoio técnico e pedagógico para 500 beneficiários de 18 comunidades no MA.</p>
            </div>
            <div className={styles.timelineItem}>
              <h3>2015 • Alto Turi</h3>
              <p>Parcerias com as secretarias de Agricultura apoiando acesso a programas como PAA e PNAE.</p>
            </div>
            <div className={styles.timelineItem}>
              <h3>2018 • Economia Solidária</h3>
              <p>Programa Maranhão Mais Justo, acompanhando grupos em diagnósticos e projetos produtivos.</p>
            </div>
            <div className={styles.timelineItem}>
              <h3>2019 • O Documentário</h3>
              <p>Criação do aclamado material "Catadores: da Invisibilidade ao Protagonismo".</p>
            </div>
            <div className={styles.timelineItem}>
              <h3>2024 • Expansão</h3>
              <p>Implantação de Unidade Agroecológica e Quintais Agroecológicos com MDA.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ÁREAS DE ATUAÇÃO */}
      <section className="bg-white section-padding">
        <div className="container">
          <h2 className={styles.sectionTitle}>Eixos de Atuação</h2>
          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>✏️</div>
              <h3>Educação no campo</h3>
              <p>Capacitação e acompanhamento técnico adaptado para as realidades locais.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>🌱</div>
              <h3>Agricultura regenerativa</h3>
              <p>Implantação de sistemas de base agroecológica, focando na preservação e sementes crioulas.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>💡</div>
              <h3>Inovação social</h3>
              <p>Fomento a oportunidades reais para pessoas e povos em situação de vulnerabilidade.</p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardIcon}>👩🏽</div>
              <h3>Empoderamento</h3>
              <p>Projetos que visam primeiramente o empoderamento feminino e o protagonismo jovem.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. IMPACTO */}
      <section className="bg-light section-padding">
        <div className="container">
          <div className={styles.impactGrid}>
            <div className={styles.impactCard}>
              <h3>+500</h3>
              <p>Beneficiários no Campo</p>
            </div>
            <div className={styles.impactCard}>
              <h3>+18</h3>
              <p>Comunidades Quilombolas</p>
            </div>
            <div className={styles.impactCard}>
              <h3>MA e PA</h3>
              <p>Estados de Atuação</p>
            </div>
            <div className={styles.impactCard}>
              <h3>+10</h3>
              <p>Anos de Experiência Redes</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className={styles.finalCta}>
        <div className="container">
          <h2>Comece sua jornada com a Gênesis</h2>
          <p style={{marginBottom: '30px', opacity: 0.9, fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 40px'}}>Educação que transforma. Projetos que impulsionam o desenvolvimento sustentável com equidade de gênero.</p>
          <button className="btn-white">Conhecer nossos programas</button>
        </div>
      </section>
    </main>
  );
}
