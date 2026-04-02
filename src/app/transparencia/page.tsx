'use client';

import { useState, useEffect } from 'react';
import PublicLayout from '../components/PublicLayout';
import { supabase } from '@/lib/supabase';
import { FileText, Download, Search, Loader2, FolderOpen } from 'lucide-react';

interface TransparencyDoc {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  file_url: string | null;
  file_size: string | null;
  doc_date: string | null;
  created_at: string;
}

const categoryColors: Record<string, string> = {
  'Relatórios Financeiros': '#2B44FF',
  'Projetos e Convênios': '#10B981',
  'Atas e Reuniões': '#F59E0B',
  'Estatuto e Regimentos': '#8B5CF6',
  'Prestação de Contas': '#EF4444',
};

export default function Transparencia() {
  const [docs, setDocs] = useState<TransparencyDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [search, setSearch] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function fetchDocs() {
      const { data } = await supabase
        .from('transparency_docs')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) {
        setDocs(data);
        const cats = Array.from(new Set(data.map((d: TransparencyDoc) => d.category).filter(Boolean))) as string[];
        setCategories(cats);
      }
      setLoading(false);
    }
    fetchDocs();
  }, []);

  const filtered = docs.filter(doc => {
    const matchCategory = selectedCategory === 'Todos' || doc.category === selectedCategory;
    const matchSearch =
      search === '' ||
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      (doc.description || '').toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const allCategories = ['Todos', ...categories];

  return (
    <PublicLayout>
      <main className="animate-fade-up" style={{ background: 'var(--site-bg)' }}>

        {/* HEADER */}
        <section className="glass-section-white" style={{ padding: '100px 0 56px', textAlign: 'center' }}>
          <div className="container">
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'var(--site-primary-glow)', color: 'var(--site-primary)',
              padding: '6px 16px', borderRadius: 0, fontSize: '0.8rem',
              fontWeight: 700, letterSpacing: '0.08em', marginBottom: 20,
            }}>
              ACESSO PÚBLICO
            </div>
            <h1 style={{ fontSize: '3rem', marginBottom: 16 }}>Transparência</h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--site-text-secondary)', maxWidth: 600, margin: '0 auto 40px' }}>
              Acreditar em uma gestão aberta e responsável é parte da nossa missão. Aqui você encontra todos os documentos institucionais, relatórios e prestações de contas do Instituto Gênesis.
            </p>

            {/* SEARCH */}
            <div style={{ maxWidth: 520, margin: '0 auto', position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--site-text-tertiary)', pointerEvents: 'none' }} />
              <input
                type="text"
                placeholder="Buscar documento..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', padding: '14px 16px 14px 46px', border: '1px solid var(--site-border)', background: 'var(--site-surface)', borderRadius: 'var(--site-radius-sm)', fontSize: '0.95rem', color: 'var(--site-text-primary)', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="glass-section-white" style={{ borderTop: 'none', padding: '60px 0 100px' }}>
          <div className="container">

            {/* CATEGORY FILTERS */}
            {!loading && categories.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 40 }}>
                {allCategories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: '8px 18px',
                      border: selectedCategory === cat ? '1.5px solid var(--site-primary)' : '1.5px solid var(--site-border)',
                      background: selectedCategory === cat ? 'var(--site-primary-glow)' : 'var(--site-surface)',
                      color: selectedCategory === cat ? 'var(--site-primary)' : 'var(--site-text-secondary)',
                      borderRadius: 0, cursor: 'pointer',
                      fontWeight: selectedCategory === cat ? 700 : 500,
                      fontSize: '0.9rem', transition: 'all 0.2s',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '80px 0', gap: 12, color: 'var(--site-text-secondary)' }}>
                <Loader2 size={24} style={{ animation: 'spin 1s linear infinite' }} />
                <span>Carregando documentos...</span>
              </div>
            ) : docs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--site-text-tertiary)' }}>
                <FolderOpen size={48} style={{ marginBottom: 16, opacity: 0.4 }} />
                <p style={{ fontSize: '1.1rem' }}>Nenhum documento disponível no momento.</p>
              </div>
            ) : (
              <>
                <p style={{ color: 'var(--site-text-tertiary)', fontSize: '0.9rem', marginBottom: 24 }}>
                  {filtered.length} documento{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
                </p>

                {filtered.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--site-text-tertiary)' }}>
                    <FileText size={40} style={{ marginBottom: 12, opacity: 0.3 }} />
                    <p>Nenhum documento encontrado para essa busca.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {filtered.map(doc => {
                      const color = categoryColors[doc.category || ''] || 'var(--site-primary)';
                      return (
                        <div key={doc.id} className="glass-panel" style={{
                          padding: '24px 28px', display: 'flex', alignItems: 'center',
                          gap: 20, flexWrap: 'wrap',
                          borderLeft: `4px solid ${color}`,
                        }}>
                          {/* Icon */}
                          <div style={{ width: 48, height: 48, flexShrink: 0, background: 'var(--site-surface)', border: '1px solid var(--site-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--site-radius-sm)' }}>
                            <FileText size={22} color={color} />
                          </div>

                          {/* Info */}
                          <div style={{ flex: 1, minWidth: 200 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                              {doc.category && (
                                <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em', color, textTransform: 'uppercase' }}>
                                  {doc.category}
                                </span>
                              )}
                              {doc.doc_date && <span style={{ color: 'var(--site-text-tertiary)', fontSize: '0.82rem' }}>• {doc.doc_date}</span>}
                            </div>
                            <h3 style={{ fontSize: '1.05rem', marginBottom: 6, color: 'var(--site-text-primary)', wordBreak: 'break-word', overflowWrap: 'break-word' }}>{doc.title}</h3>
                            {doc.description && (
                              <p style={{ fontSize: '0.9rem', color: 'var(--site-text-secondary)', lineHeight: 1.55, wordBreak: 'break-word', overflowWrap: 'break-word' }}>
                                {doc.description.length > 200 ? doc.description.slice(0, 200) + '…' : doc.description}
                              </p>
                            )}
                          </div>

                          {/* Download */}
                          <div style={{ flexShrink: 0, textAlign: 'right' }}>
                            {doc.file_size && <p style={{ fontSize: '0.8rem', color: 'var(--site-text-tertiary)', marginBottom: 10 }}>PDF • {doc.file_size}</p>}
                            {doc.file_url ? (
                              <a
                                href={doc.file_url}
                                download
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'var(--site-primary)', color: 'white', borderRadius: 0, fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none', transition: 'opacity 0.2s' }}
                                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                              >
                                <Download size={15} /> Baixar
                              </a>
                            ) : (
                              <span style={{ fontSize: '0.82rem', color: 'var(--site-text-tertiary)', fontStyle: 'italic' }}>Arquivo não disponível</span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </PublicLayout>
  );
}
