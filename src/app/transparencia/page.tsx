'use client';

import { useState, useEffect } from 'react';
import PublicLayout from '../components/PublicLayout';
import { supabase } from '@/lib/supabase';
import { Search, Loader2, FolderOpen, ExternalLink } from 'lucide-react';

interface TransparencyRecord {
  id: string;
  proponente: string | null;
  parlamentar: string | null;
  modalidade: string | null;
  objeto: string | null;
  orgao_concedente: string | null;
  num_instrumento: string | null;
  num_emenda: string | null;
  ano_emenda: string | null;
  valor: string | null;
  valor_emenda: string | null;
  prestacao_contas: string | null;
  created_at: string;
}

function isUrl(str: string) {
  try { return Boolean(new URL(str)); } catch { return false; }
}

export default function Transparencia() {
  const [records, setRecords] = useState<TransparencyRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchRecords() {
      const { data } = await supabase
        .from('transparency_records')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setRecords(data);
      setLoading(false);
    }
    fetchRecords();
  }, []);

  const filtered = records.filter(r => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      (r.proponente || '').toLowerCase().includes(q) ||
      (r.parlamentar || '').toLowerCase().includes(q) ||
      (r.objeto || '').toLowerCase().includes(q) ||
      (r.orgao_concedente || '').toLowerCase().includes(q) ||
      (r.modalidade || '').toLowerCase().includes(q) ||
      (r.num_instrumento || '').toLowerCase().includes(q) ||
      (r.num_emenda || '').toLowerCase().includes(q) ||
      (r.ano_emenda || '').toLowerCase().includes(q)
    );
  });

  return (
    <PublicLayout>
      <main className="animate-fade-up" style={{ background: 'var(--site-bg)' }}>

        {/* HERO */}
        <section className="glass-section-white" style={{ padding: '100px 0 56px', textAlign: 'center' }}>
          <div className="container">
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              color: 'var(--site-primary)', padding: '6px 16px', borderRadius: 0,
              fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em',
              marginBottom: 20, border: '1px solid var(--site-border)', background: 'var(--site-surface)',
            }}>
              ACESSO PÚBLICO
            </div>
            <h1 style={{ fontSize: '3rem', marginBottom: 16 }}>Transparência</h1>
            <p style={{ fontSize: '1.1rem', color: 'var(--site-text-secondary)', maxWidth: 620, margin: '0 auto 40px', lineHeight: 1.6 }}>
              Informações sobre convênios, emendas parlamentares e prestações de contas do Instituto Gênesis, em cumprimento aos princípios da gestão pública transparente.
            </p>

            <div style={{ maxWidth: 520, margin: '0 auto', position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--site-text-tertiary)', pointerEvents: 'none' }} />
              <input
                type="text"
                placeholder="Buscar por proponente, parlamentar, objeto..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', padding: '14px 16px 14px 46px', border: '1px solid var(--site-border)', background: 'var(--site-surface)', borderRadius: 0, fontSize: '0.95rem', color: 'var(--site-text-primary)', outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>
        </section>

        {/* TABLE */}
        <section className="glass-section-white" style={{ borderTop: 'none', padding: '60px 0 100px' }}>
          <div className="container">

            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '80px 0', gap: 12, color: 'var(--site-text-secondary)' }}>
                <Loader2 size={24} style={{ animation: 'spin 1s linear infinite' }} />
                <span>Carregando registros...</span>
              </div>
            ) : records.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--site-text-tertiary)' }}>
                <FolderOpen size={48} style={{ marginBottom: 16, opacity: 0.4 }} />
                <p style={{ fontSize: '1.1rem' }}>Nenhum registro disponível no momento.</p>
              </div>
            ) : (
              <>
                <p style={{ color: 'var(--site-text-tertiary)', fontSize: '0.9rem', marginBottom: 20 }}>
                  {filtered.length} registro{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
                </p>

                {filtered.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--site-text-tertiary)' }}>
                    <p>Nenhum registro encontrado para essa busca.</p>
                  </div>
                ) : (
                  <div style={{ overflowX: 'auto', borderRadius: 0, border: '1px solid var(--site-border)', background: 'var(--site-surface)' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', minWidth: 960 }}>
                      <thead>
                        <tr style={{ background: 'var(--site-primary)' }}>
                          {['Proponente', 'Parlamentar', 'Modalidade', 'Objeto', 'Órgão Concedente', 'Nº Instrumento', 'Nº Emenda', 'Ano', 'Valor', 'Valor Emenda', 'Prestação de Contas'].map(col => (
                            <th key={col} style={{
                              padding: '14px 16px', textAlign: 'left', fontWeight: 700,
                              fontSize: '0.75rem', letterSpacing: '0.04em', textTransform: 'uppercase',
                              color: 'rgba(255,255,255,0.9)', whiteSpace: 'nowrap',
                              borderRight: '1px solid rgba(255,255,255,0.1)',
                            }}>
                              {col}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filtered.map((r, idx) => (
                          <tr key={r.id} style={{ background: idx % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.018)', borderBottom: '1px solid var(--site-border)' }}>
                            {[r.proponente, r.parlamentar, r.modalidade].map((val, i) => (
                              <td key={i} style={{ padding: '13px 16px', color: 'var(--site-text-primary)', fontWeight: i === 0 ? 600 : 400, borderRight: '1px solid var(--site-border)', whiteSpace: 'nowrap' }}>
                                {val || <span style={{ color: 'var(--site-text-tertiary)' }}>—</span>}
                              </td>
                            ))}
                            <td style={{ padding: '13px 16px', color: 'var(--site-text-secondary)', borderRight: '1px solid var(--site-border)', maxWidth: 220, wordBreak: 'break-word' }}>
                              {r.objeto || <span style={{ color: 'var(--site-text-tertiary)' }}>—</span>}
                            </td>
                            {[r.orgao_concedente, r.num_instrumento, r.num_emenda, r.ano_emenda].map((val, i) => (
                              <td key={i} style={{ padding: '13px 16px', color: 'var(--site-text-secondary)', borderRight: '1px solid var(--site-border)', whiteSpace: 'nowrap' }}>
                                {val || <span style={{ color: 'var(--site-text-tertiary)' }}>—</span>}
                              </td>
                            ))}
                            {[r.valor, r.valor_emenda].map((val, i) => (
                              <td key={i} style={{ padding: '13px 16px', color: 'var(--site-text-primary)', fontWeight: 600, borderRight: '1px solid var(--site-border)', whiteSpace: 'nowrap' }}>
                                {val || <span style={{ color: 'var(--site-text-tertiary)', fontWeight: 400 }}>—</span>}
                              </td>
                            ))}
                            <td style={{ padding: '13px 16px' }}>
                              {r.prestacao_contas
                                ? isUrl(r.prestacao_contas)
                                  ? <a href={r.prestacao_contas} target="_blank" rel="noopener noreferrer"
                                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--site-primary)', fontWeight: 600, fontSize: '0.82rem', textDecoration: 'none' }}
                                      onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
                                      onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}>
                                      Ver documento <ExternalLink size={13} />
                                    </a>
                                  : <span style={{ color: 'var(--site-text-secondary)', fontSize: '0.85rem' }}>{r.prestacao_contas}</span>
                                : <span style={{ color: 'var(--site-text-tertiary)' }}>—</span>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
