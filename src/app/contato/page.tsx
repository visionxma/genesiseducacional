'use client';

import { useEffect, useState } from 'react';
import PublicLayout from '../components/PublicLayout';
import { Mail, Phone, MapPin, Clock, MessageCircle, Globe, ExternalLink, Users } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Membro {
  id: string;
  nome: string;
  funcao: string;
  foto_url: string | null;
  whatsapp: string | null;
  email: string | null;
  ordem: number;
}

const contactInfo = [
  {
    icon: Phone,
    label: 'Telefone / WhatsApp',
    value: '(98) 8462-0194',
    href: 'https://wa.me/5598984620194',
    color: '#25D366',
  },
  {
    icon: Mail,
    label: 'E-mail',
    value: 'contato@institutogenesis.org',
    href: 'mailto:contato@institutogenesis.org',
    color: '#0044CC',
  },
  {
    icon: MapPin,
    label: 'Localização',
    value: 'Maranhão / Pará, Brasil',
    href: null,
    color: '#EF4444',
  },
  {
    icon: Clock,
    label: 'Horário de Atendimento',
    value: 'Seg a Sex, 8h às 18h',
    href: null,
    color: '#F59E0B',
  },
];

const socials = [
  { icon: Globe, href: 'https://instagram.com/institutogenesis', color: '#E4405F', label: 'Instagram' },
  { icon: ExternalLink, href: 'https://facebook.com/institutogenesis', color: '#1877F2', label: 'Facebook' },
  { icon: MessageCircle, href: 'https://wa.me/5598984620194', color: '#25D366', label: 'WhatsApp' },
];

export default function Contato() {
  const [equipe, setEquipe] = useState<Membro[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('equipe')
      .select('*')
      .order('ordem', { ascending: true })
      .then(({ data }) => {
        if (data) setEquipe(data);
        setLoading(false);
      });
  }, []);

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
              <MessageCircle size={36} strokeWidth={1.5} style={{ color: 'var(--site-primary)' }} />
            </div>
            <h1 style={{ maxWidth: 700, margin: '0 auto 16px' }}>
              Entre em <span style={{ color: 'var(--site-primary)' }}>Contato</span>
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
              Estamos prontos para atender você. Fale conosco pelos nossos canais ou diretamente com nossa equipe.
            </p>
          </div>
        </section>

        {/* CANAIS + REDES — grid full-width */}
        <section className="glass-section-white" style={{ borderTop: 'none', padding: '60px 0 0' }}>
          <div className="container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: 16,
              }}
            >
              {contactInfo.map((info) => {
                const Icon = info.icon;
                const card = (
                  <div
                    key={info.label}
                    className="glass-panel"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 16,
                      padding: '24px',
                      transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                      cursor: info.href ? 'pointer' : 'default',
                    }}
                    onMouseEnter={(e) => {
                      if (info.href) e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div
                      style={{
                        width: 52,
                        height: 52,
                        background: `${info.color}14`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={24} style={{ color: info.color }} />
                    </div>
                    <div>
                      <p style={{ fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--site-text-tertiary)', marginBottom: 4 }}>
                        {info.label}
                      </p>
                      <p style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--site-text-primary)' }}>
                        {info.value}
                      </p>
                    </div>
                  </div>
                );

                return info.href ? (
                  <a key={info.label} href={info.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                    {card}
                  </a>
                ) : (
                  <div key={info.label}>{card}</div>
                );
              })}
            </div>

            {/* Redes sociais inline */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 32, flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--site-text-tertiary)' }}>
                Redes Sociais
              </span>
              <div style={{ display: 'flex', gap: 10 }}>
                {socials.map((social) => {
                  const SIcon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.label}
                      style={{
                        width: 44,
                        height: 44,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid var(--site-border)',
                        background: 'white',
                        color: social.color,
                        transition: 'all 0.25s',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = social.color;
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.borderColor = social.color;
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'white';
                        e.currentTarget.style.color = social.color;
                        e.currentTarget.style.borderColor = 'var(--site-border)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <SIcon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* NOSSA EQUIPE */}
        <section className="glass-section-white" style={{ borderTop: 'none', padding: '80px 0 100px' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  background: 'rgba(0, 68, 204, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                }}
              >
                <Users size={28} strokeWidth={1.5} style={{ color: 'var(--site-primary)' }} />
              </div>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', marginBottom: 8 }}>Nossa Equipe</h2>
              <p style={{ color: 'var(--site-text-secondary)', fontSize: '1.05rem', maxWidth: 500, margin: '0 auto' }}>
                Conheça os profissionais que fazem a diferença nas comunidades.
              </p>
            </div>

            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--site-text-tertiary)' }}>
                <div style={{
                  width: 36, height: 36, border: '3px solid var(--site-border)',
                  borderTopColor: 'var(--site-primary)', borderRadius: '50%',
                  animation: 'spin 0.8s linear infinite', margin: '0 auto 12px',
                }} />
                Carregando equipe...
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            ) : equipe.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--site-text-tertiary)', fontSize: '0.95rem' }}>
                Em breve você conhecerá nossa equipe.
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                  gap: 24,
                }}
              >
                {equipe.map((membro) => (
                  <div
                    key={membro.id}
                    className="glass-panel"
                    style={{
                      padding: 0,
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.boxShadow = 'var(--site-shadow-md)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'var(--site-shadow-sm)';
                    }}
                  >
                    {/* Foto */}
                    <div style={{
                      width: '100%',
                      aspectRatio: '1 / 1',
                      background: 'linear-gradient(135deg, rgba(0,68,204,0.08), rgba(0,68,204,0.03))',
                      overflow: 'hidden',
                      position: 'relative',
                    }}>
                      {membro.foto_url ? (
                        <img
                          src={membro.foto_url}
                          alt={membro.nome}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <div style={{
                          width: '100%', height: '100%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '3rem', fontWeight: 700, color: 'var(--site-primary)', opacity: 0.3,
                          fontFamily: 'var(--font-outfit)',
                        }}>
                          {membro.nome.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div style={{ padding: '20px 20px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 4, color: 'var(--site-text-primary)', fontFamily: 'var(--font-outfit)' }}>
                        {membro.nome}
                      </h3>
                      <p style={{ fontSize: '0.88rem', color: 'var(--site-primary)', fontWeight: 500, marginBottom: 16 }}>
                        {membro.funcao}
                      </p>

                      <div style={{ marginTop: 'auto', display: 'flex', gap: 8 }}>
                        {membro.whatsapp && (
                          <a
                            href={`https://wa.me/${membro.whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                            style={{
                              flex: 1,
                              padding: '10px 0',
                              fontSize: '0.85rem',
                              textDecoration: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 6,
                            }}
                          >
                            <MessageCircle size={15} />
                            WhatsApp
                          </a>
                        )}
                        {membro.email && (
                          <a
                            href={`mailto:${membro.email}`}
                            className="btn btn-glass"
                            style={{
                              flex: 1,
                              padding: '10px 0',
                              fontSize: '0.85rem',
                              textDecoration: 'none',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 6,
                              color: 'var(--site-primary)',
                            }}
                          >
                            <Mail size={15} />
                            E-mail
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA WhatsApp */}
        <section style={{
          background: 'var(--site-primary)',
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          padding: '64px 0',
          textAlign: 'center',
        }}>
          <div className="container">
            <h2 style={{ color: 'white', fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: 12, fontFamily: 'var(--font-outfit)' }}>
              Prefere falar diretamente com nossa equipe?
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', marginBottom: 28 }}>
              Estamos disponíveis de segunda a sexta, das 8h às 18h.
            </p>
            <a
              href="https://wa.me/5598984620194?text=Olá! Gostaria de mais informações sobre o Instituto Gênesis."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '16px 40px',
                background: 'white',
                color: 'var(--site-primary)',
                fontWeight: 700,
                fontSize: '1.05rem',
                textDecoration: 'none',
                transition: 'all 0.25s',
                border: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <MessageCircle size={20} />
              Chamar no WhatsApp
            </a>
          </div>
        </section>
      </main>
    </PublicLayout>
  );
}
