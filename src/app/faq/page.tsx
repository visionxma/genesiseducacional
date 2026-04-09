'use client';

import { useState } from 'react';
import PublicLayout from '../components/PublicLayout';
import { ChevronDown, HelpCircle, BookOpen, GraduationCap, FileText, Users, CreditCard } from 'lucide-react';

const faqCategories = [
  {
    label: 'Geral',
    icon: HelpCircle,
    color: 'var(--site-primary)',
    questions: [
      {
        q: 'O que é o Instituto Gênesis Educacional?',
        a: 'O Instituto Gênesis Educacional é uma organização dedicada à formação, inovação e desenvolvimento social para comunidades do Maranhão e Pará desde 2013. Atuamos em capacitação profissional, consultoria pedagógica e projetos de impacto social.'
      },
      {
        q: 'Onde o Instituto Gênesis está localizado?',
        a: 'Atuamos principalmente nas regiões do Maranhão e Pará, com projetos em diversas comunidades e municípios. Para saber nosso endereço físico e pontos de atendimento, visite nossa página de Contato.'
      },
      {
        q: 'O Instituto Gênesis é uma ONG?',
        a: 'Sim, somos uma Organização da Sociedade Civil (OSC) sem fins lucrativos, com atuação voltada para o desenvolvimento educacional e social de comunidades.'
      },
    ],
  },
  {
    label: 'Cursos',
    icon: GraduationCap,
    color: '#8B5CF6',
    questions: [
      {
        q: 'Quais tipos de cursos são oferecidos?',
        a: 'Oferecemos cursos de capacitação profissional em diversas áreas, incluindo gestão, empreendedorismo, tecnologia, agricultura familiar, entre outros. Consulte nossa página de Cursos para ver as opções disponíveis.'
      },
      {
        q: 'Os cursos são gratuitos?',
        a: 'A maioria dos nossos cursos de capacitação comunitária são gratuitos, financiados por parcerias com prefeituras e programas governamentais. Alguns cursos especializados podem ter valores acessíveis. Verifique as condições na página de cada curso.'
      },
      {
        q: 'Recebo certificado ao concluir um curso?',
        a: 'Sim! Todos os nossos cursos emitem certificado de conclusão reconhecido, com carga horária especificada. O certificado é emitido após a conclusão de todas as atividades previstas no programa.'
      },
      {
        q: 'Como faço para me inscrever em um curso?',
        a: 'Acesse a página de Cursos, escolha o curso desejado e clique em "Inscreva-se". Você também pode entrar em contato conosco pelo WhatsApp para tirar dúvidas antes da inscrição.'
      },
    ],
  },
  {
    label: 'Consultoria',
    icon: BookOpen,
    color: '#10B981',
    questions: [
      {
        q: 'O que é a Consultoria Estratégica Educacional?',
        a: 'É um serviço personalizado de assessoria para prefeituras, OSCs e instituições privadas. Realizamos diagnóstico, planejamento metodológico e acompanhamento técnico de projetos educacionais e de impacto social.'
      },
      {
        q: 'A consultoria é voltada para quais públicos?',
        a: 'Atendemos prefeituras municipais, organizações da sociedade civil, instituições de ensino, cooperativas e entidades que buscam desenvolver projetos educacionais e sociais em suas regiões.'
      },
      {
        q: 'Como agendar uma reunião de consultoria?',
        a: 'Você pode agendar uma reunião especializada pelo nosso WhatsApp ou pela página de Consultoria. Nossa equipe entrará em contato para entender suas necessidades e apresentar as soluções mais adequadas.'
      },
    ],
  },
  {
    label: 'Transparência',
    icon: FileText,
    color: '#F59E0B',
    questions: [
      {
        q: 'Onde posso acessar os documentos institucionais?',
        a: 'Todos os documentos institucionais, relatórios de atividades, balanços e prestações de contas estão disponíveis na nossa página de Transparência, organizados por categoria e ano.'
      },
      {
        q: 'O Instituto publica prestação de contas?',
        a: 'Sim, mantemos total transparência sobre nossos recursos e atividades. Publicamos periodicamente relatórios financeiros, demonstrativos contábeis e relatórios de impacto social na página de Transparência.'
      },
    ],
  },
  {
    label: 'Parcerias',
    icon: Users,
    color: '#EC4899',
    questions: [
      {
        q: 'Como posso ser parceiro do Instituto Gênesis?',
        a: 'Estamos sempre abertos a novas parcerias! Entre em contato pelo nosso WhatsApp ou página de Contato informando sua proposta. Trabalhamos com parcerias públicas, privadas e do terceiro setor.'
      },
      {
        q: 'O Instituto aceita doações?',
        a: 'Sim, aceitamos doações que são direcionadas integralmente para nossos projetos educacionais e sociais. Entre em contato para saber como contribuir e conheça nossos projetos ativos.'
      },
    ],
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderBottom: '1px solid var(--site-border)',
        transition: 'background 0.2s',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          gap: 16,
        }}
      >
        <span
          style={{
            fontSize: '1.05rem',
            fontWeight: 600,
            color: 'var(--site-text-primary)',
            fontFamily: 'var(--font-outfit)',
            lineHeight: 1.4,
          }}
        >
          {question}
        </span>
        <ChevronDown
          size={20}
          style={{
            color: 'var(--site-text-tertiary)',
            transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            flexShrink: 0,
          }}
        />
      </button>
      <div
        style={{
          overflow: 'hidden',
          maxHeight: open ? 300 : 0,
          opacity: open ? 1 : 0,
          transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
        }}
      >
        <p
          style={{
            padding: '0 0 20px',
            fontSize: '0.98rem',
            color: 'var(--site-text-secondary)',
            lineHeight: 1.7,
          }}
        >
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <PublicLayout>
      <main className="animate-fade-up" style={{ background: 'var(--site-bg)' }}>
        {/* HERO */}
        <section
          className="glass-section-white"
          style={{
            position: 'relative',
            overflow: 'hidden',
            padding: '100px 0 60px',
            textAlign: 'center',
          }}
        >
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div
              style={{
                width: 72,
                height: 72,
                background: 'rgba(0, 68, 204, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
              }}
            >
              <HelpCircle size={36} strokeWidth={1.5} style={{ color: 'var(--site-primary)' }} />
            </div>
            <h1 style={{ maxWidth: 700, margin: '0 auto 16px' }}>
              Perguntas <span style={{ color: 'var(--site-primary)' }}>Frequentes</span>
            </h1>
            <p
              style={{
                maxWidth: 600,
                margin: '0 auto',
                fontSize: '1.15rem',
                color: 'var(--site-text-secondary)',
                lineHeight: 1.6,
              }}
            >
              Encontre respostas rápidas sobre nossos cursos, consultoria, parcerias e mais.
            </p>
          </div>
        </section>

        {/* FAQ CONTENT */}
        <section className="glass-section-white" style={{ borderTop: 'none', padding: '60px 0 100px' }}>
          <div className="container">
            {/* Category Tabs */}
            <div
              style={{
                display: 'flex',
                gap: 8,
                marginBottom: 48,
                overflowX: 'auto',
                paddingBottom: 8,
              }}
            >
              {faqCategories.map((cat, i) => {
                const Icon = cat.icon;
                const isActive = activeCategory === i;
                return (
                  <button
                    key={cat.label}
                    onClick={() => setActiveCategory(i)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '10px 20px',
                      border: isActive ? `2px solid ${cat.color}` : '2px solid var(--site-border)',
                      background: isActive ? `${cat.color}10` : 'transparent',
                      color: isActive ? cat.color : 'var(--site-text-secondary)',
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      fontFamily: 'var(--font-inter)',
                    }}
                  >
                    <Icon size={16} />
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Questions */}
            <div className="glass-panel" style={{ padding: '8px 32px' }}>
              {faqCategories[activeCategory].questions.map((item, i) => (
                <FAQItem key={i} question={item.q} answer={item.a} />
              ))}
            </div>

            {/* CTA */}
            <div
              style={{
                textAlign: 'center',
                marginTop: 64,
                padding: '48px 32px',
                background: 'rgba(0, 68, 204, 0.04)',
                border: '1px solid var(--site-border)',
              }}
            >
              <p
                style={{
                  fontSize: '1.1rem',
                  color: 'var(--site-text-secondary)',
                  marginBottom: 20,
                }}
              >
                Não encontrou o que procurava?
              </p>
              <a
                href="/contato"
                className="btn btn-primary"
                style={{ padding: '14px 36px', fontSize: '1rem', textDecoration: 'none' }}
              >
                Fale Conosco
              </a>
            </div>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
