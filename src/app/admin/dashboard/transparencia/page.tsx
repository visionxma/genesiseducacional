'use client';

/**
 * Gestão de Transparência — Instituto Gênesis
 *
 * IMPORTANTE: Execute este SQL no Supabase antes de usar esta página:
 *
 *   CREATE TABLE transparency_records (
 *     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 *     proponente text,
 *     parlamentar text,
 *     modalidade text,
 *     objeto text,
 *     orgao_concedente text,
 *     num_instrumento text,
 *     num_emenda text,
 *     ano_emenda text,
 *     valor text,
 *     valor_emenda text,
 *     prestacao_contas text,
 *     created_at timestamptz DEFAULT now()
 *   );
 *
 *   ALTER TABLE transparency_records ENABLE ROW LEVEL SECURITY;
 *   CREATE POLICY "Public read" ON transparency_records FOR SELECT USING (true);
 *   CREATE POLICY "Admin write" ON transparency_records FOR ALL USING (auth.role() = 'authenticated');
 */

import { supabase } from '@/lib/supabase';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import {
  ShieldCheck, Plus, Trash2, Edit3, Loader2, FolderOpen,
  AlertCircle, CheckCircle2, Search, X, Save,
} from 'lucide-react';

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

const EMPTY_FORM = {
  proponente: '',
  parlamentar: '',
  modalidade: '',
  objeto: '',
  orgao_concedente: '',
  num_instrumento: '',
  num_emenda: '',
  ano_emenda: '',
  valor: '',
  valor_emenda: '',
  prestacao_contas: '',
};

export default function TransparenciaAdmin() {
  const [records, setRecords] = useState<TransparencyRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [editingRecord, setEditingRecord] = useState<TransparencyRecord | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => { fetchRecords(); }, []);

  useEffect(() => {
    if (notification) {
      const t = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(t);
    }
  }, [notification]);

  async function fetchRecords() {
    setLoading(true);
    setDbError(null);
    const { data, error } = await supabase.from('transparency_records').select('*').order('created_at', { ascending: false });
    if (error) {
      setDbError(error.message);
    } else if (data) {
      setRecords(data);
    }
    setLoading(false);
  }

  function field(key: keyof typeof EMPTY_FORM) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(f => ({ ...f, [key]: e.target.value }));
  }

  function openNew() {
    setEditingRecord(null);
    setForm(EMPTY_FORM);
    setShowEditor(true);
  }

  function openEdit(r: TransparencyRecord) {
    setEditingRecord(r);
    setForm({
      proponente: r.proponente || '',
      parlamentar: r.parlamentar || '',
      modalidade: r.modalidade || '',
      objeto: r.objeto || '',
      orgao_concedente: r.orgao_concedente || '',
      num_instrumento: r.num_instrumento || '',
      num_emenda: r.num_emenda || '',
      ano_emenda: r.ano_emenda || '',
      valor: r.valor || '',
      valor_emenda: r.valor_emenda || '',
      prestacao_contas: r.prestacao_contas || '',
    });
    setShowEditor(true);
  }

  function closeEditor() { setShowEditor(false); setEditingRecord(null); }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!form.proponente.trim() && !form.objeto.trim()) return;
    setSaving(true);

    const payload = {
      proponente: form.proponente || null,
      parlamentar: form.parlamentar || null,
      modalidade: form.modalidade || null,
      objeto: form.objeto || null,
      orgao_concedente: form.orgao_concedente || null,
      num_instrumento: form.num_instrumento || null,
      num_emenda: form.num_emenda || null,
      ano_emenda: form.ano_emenda || null,
      valor: form.valor || null,
      valor_emenda: form.valor_emenda || null,
      prestacao_contas: form.prestacao_contas || null,
    };

    if (editingRecord) {
      const { error } = await supabase.from('transparency_records').update(payload).eq('id', editingRecord.id);
      if (!error) {
        setRecords(prev => prev.map(r => r.id === editingRecord.id ? { ...r, ...payload } : r));
        setNotification({ type: 'success', message: 'Registro atualizado!' });
        closeEditor();
      } else {
        const msg = error.message.includes('row-level security')
          ? 'Sem permissão de escrita. Execute o supabase-setup.sql no painel do Supabase.'
          : error.message;
        setNotification({ type: 'error', message: msg });
      }
    } else {
      const { data, error } = await supabase.from('transparency_records').insert([payload]).select();
      if (data?.[0]) {
        setRecords(prev => [data[0], ...prev]);
        setNotification({ type: 'success', message: 'Registro adicionado!' });
        closeEditor();
      } else {
        const msg = error?.message?.includes('row-level security')
          ? 'Sem permissão de escrita. Execute o supabase-setup.sql no painel do Supabase.'
          : (error?.message || 'Erro ao criar.');
        setNotification({ type: 'error', message: msg });
      }
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Remover este registro?')) return;
    setDeletingId(id);
    const { error } = await supabase.from('transparency_records').delete().eq('id', id);
    if (!error) {
      setRecords(prev => prev.filter(r => r.id !== id));
      setNotification({ type: 'success', message: 'Registro removido.' });
    } else {
      setNotification({ type: 'error', message: error.message });
    }
    setDeletingId(null);
  }

  const filtered = records.filter(r => {
    if (!searchTerm) return true;
    const q = searchTerm.toLowerCase();
    return (
      (r.proponente || '').toLowerCase().includes(q) ||
      (r.parlamentar || '').toLowerCase().includes(q) ||
      (r.objeto || '').toLowerCase().includes(q) ||
      (r.num_emenda || '').toLowerCase().includes(q) ||
      (r.num_instrumento || '').toLowerCase().includes(q)
    );
  });

  const isFormValid = form.proponente.trim() || form.objeto.trim();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* Toast */}
      {notification && typeof document !== 'undefined' && createPortal(
        <div className="admin-animate-in" style={{
          position: 'fixed', top: 90, right: 40, zIndex: 9999,
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '14px 20px', borderRadius: 'var(--admin-radius-md)',
          background: notification.type === 'success' ? 'var(--admin-success-bg)' : 'var(--admin-danger-bg)',
          color: notification.type === 'success' ? 'var(--admin-success)' : 'var(--admin-danger)',
          border: `1px solid ${notification.type === 'success' ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`,
          fontSize: '0.85rem', fontWeight: 600, boxShadow: 'var(--admin-shadow-lg)',
        }}>
          {notification.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {notification.message}
        </div>,
        document.body
      )}

      {/* Action Bar */}
      <div className="admin-animate-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', height: 42, borderRadius: 'var(--admin-radius-md)', background: 'var(--admin-surface)', border: '1px solid var(--admin-border)', flex: 1, maxWidth: 360 }}>
          <Search size={16} style={{ color: 'var(--admin-text-tertiary)', flexShrink: 0 }} />
          <input type="text" placeholder="Buscar por proponente, parlamentar, objeto..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
            style={{ border: 'none', background: 'none', outline: 'none', fontFamily: 'inherit', fontSize: '0.85rem', color: 'var(--admin-text-primary)', width: '100%' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--admin-text-tertiary)', fontWeight: 500 }}>
            {records.length} registro{records.length !== 1 ? 's' : ''}
          </span>
          <button className="admin-btn admin-btn-primary" onClick={openNew}>
            <Plus size={16} /> Novo Registro
          </button>
        </div>
      </div>

      {/* DB Error Banner */}
      {dbError && (
        <div style={{ padding: '16px 20px', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 'var(--admin-radius-md)', color: 'var(--admin-danger)', fontSize: '0.85rem', lineHeight: 1.6 }}>
          <strong>Erro de banco de dados:</strong> {dbError}
          <br />
          <span style={{ fontSize: '0.78rem', opacity: 0.8 }}>
            Execute o arquivo <code>supabase-setup.sql</code> no SQL Editor do Supabase para configurar a tabela e as políticas de acesso.
          </span>
        </div>
      )}

      {/* Table */}
      <div className="glass-card admin-animate-in-delay-1">
        <div className="glass-card-body" style={{ padding: '0 0 28px', overflowX: 'auto' }}>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, padding: '28px' }}>
              {[1,2,3].map(i => <div key={i} className="admin-skeleton" style={{ height: 24, width: `${90-i*8}%` }} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="admin-empty-state">
              <div className="admin-empty-state-icon"><FolderOpen size={24} /></div>
              <div className="admin-empty-state-text">{records.length === 0 ? 'Nenhum registro adicionado' : 'Nenhum resultado'}</div>
              <div className="admin-empty-state-hint">{records.length === 0 ? 'Adicione o primeiro registro de transparência.' : 'Tente outra busca.'}</div>
            </div>
          ) : (
            <table className="admin-table" style={{ minWidth: 1100 }}>
              <thead>
                <tr>
                  <th>Proponente</th>
                  <th>Parlamentar</th>
                  <th>Modalidade</th>
                  <th>Objeto</th>
                  <th>Órgão Concedente</th>
                  <th>Nº Instrumento</th>
                  <th>Nº Emenda</th>
                  <th>Ano</th>
                  <th>Valor</th>
                  <th>Valor Emenda</th>
                  <th>Prestação de Contas</th>
                  <th style={{ textAlign: 'right' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(r => (
                  <tr key={r.id}>
                    <td className="cell-primary" style={{ whiteSpace: 'nowrap' }}>{r.proponente || '—'}</td>
                    <td style={{ whiteSpace: 'nowrap', color: 'var(--admin-text-secondary)', fontSize: '0.82rem' }}>{r.parlamentar || '—'}</td>
                    <td style={{ whiteSpace: 'nowrap', color: 'var(--admin-text-secondary)', fontSize: '0.82rem' }}>{r.modalidade || '—'}</td>
                    <td style={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: 'var(--admin-text-secondary)', fontSize: '0.82rem' }} title={r.objeto || ''}>{r.objeto || '—'}</td>
                    <td style={{ whiteSpace: 'nowrap', color: 'var(--admin-text-secondary)', fontSize: '0.82rem' }}>{r.orgao_concedente || '—'}</td>
                    <td style={{ whiteSpace: 'nowrap', fontSize: '0.82rem' }}>{r.num_instrumento || '—'}</td>
                    <td style={{ whiteSpace: 'nowrap', fontSize: '0.82rem' }}>{r.num_emenda || '—'}</td>
                    <td style={{ whiteSpace: 'nowrap', fontSize: '0.82rem' }}>{r.ano_emenda || '—'}</td>
                    <td style={{ whiteSpace: 'nowrap', fontWeight: 600, fontSize: '0.85rem' }}>{r.valor || '—'}</td>
                    <td style={{ whiteSpace: 'nowrap', fontWeight: 600, fontSize: '0.85rem' }}>{r.valor_emenda || '—'}</td>
                    <td style={{ fontSize: '0.82rem', whiteSpace: 'nowrap' }}>
                      {r.prestacao_contas
                        ? <span title={r.prestacao_contas} style={{
                            display: 'inline-block', padding: '3px 10px',
                            background: 'rgba(43,68,255,0.08)', color: 'var(--admin-primary)',
                            borderRadius: 'var(--admin-radius-sm)', fontWeight: 600, maxWidth: 180,
                            overflow: 'hidden', textOverflow: 'ellipsis', verticalAlign: 'middle',
                          }}>{r.prestacao_contas}</span>
                        : <span style={{ color: 'var(--admin-text-tertiary)' }}>—</span>}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 4 }}>
                        <button className="admin-btn admin-btn-icon" title="Editar" onClick={() => openEdit(r)}><Edit3 size={16} /></button>
                        <button className="admin-btn admin-btn-icon" title="Remover"
                          style={{ color: deletingId === r.id ? 'var(--admin-text-tertiary)' : 'var(--admin-danger)' }}
                          onClick={() => handleDelete(r.id)} disabled={deletingId === r.id}>
                          {deletingId === r.id ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Trash2 size={16} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Editor Panel */}
      {showEditor && typeof document !== 'undefined' && createPortal(
        <>
          <div onClick={closeEditor} style={{ position: 'fixed', inset: 0, background: 'rgba(13,12,27,0.5)', backdropFilter: 'blur(6px)', zIndex: 9900 }} />
          <div className="admin-animate-in" style={{
            position: 'fixed', top: 0, right: 0, width: '100%', maxWidth: 640,
            height: '100vh', background: 'var(--admin-surface)', borderLeft: '1px solid var(--admin-border)',
            boxShadow: '-12px 0 40px rgba(13,12,27,0.12)', zIndex: 9910,
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
          }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 28px', borderBottom: '1px solid var(--admin-border)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'Outfit, sans-serif', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                <ShieldCheck size={18} style={{ color: 'var(--admin-primary)' }} />
                {editingRecord ? 'Editar Registro' : 'Novo Registro'}
              </h3>
              <button className="admin-btn admin-btn-icon" onClick={closeEditor} style={{ border: '1px solid var(--admin-border)' }}><X size={18} /></button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} style={{ flex: 1, overflow: 'auto', padding: 28, display: 'flex', flexDirection: 'column', gap: 18 }}>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label className="admin-form-label">Proponente</label>
                  <input type="text" className="admin-input" placeholder="Nome do proponente" value={form.proponente} onChange={field('proponente')} autoFocus />
                </div>

                <div>
                  <label className="admin-form-label">Parlamentar</label>
                  <input type="text" className="admin-input" placeholder="Nome do parlamentar" value={form.parlamentar} onChange={field('parlamentar')} />
                </div>

                <div>
                  <label className="admin-form-label">Modalidade</label>
                  <input type="text" className="admin-input" placeholder="Ex: Convênio, Contrato..." value={form.modalidade} onChange={field('modalidade')} />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label className="admin-form-label">Objeto</label>
                  <textarea className="admin-input" placeholder="Descrição do objeto do convênio/emenda..." value={form.objeto} onChange={field('objeto')} style={{ minHeight: 80, resize: 'vertical', lineHeight: 1.6 }} />
                </div>

                <div style={{ gridColumn: '1 / -1' }}>
                  <label className="admin-form-label">Órgão Concedente</label>
                  <input type="text" className="admin-input" placeholder="Ex: Ministério da Educação" value={form.orgao_concedente} onChange={field('orgao_concedente')} />
                </div>

                <div>
                  <label className="admin-form-label">Nº Instrumento</label>
                  <input type="text" className="admin-input" placeholder="Ex: 900123/2024" value={form.num_instrumento} onChange={field('num_instrumento')} />
                </div>

                <div>
                  <label className="admin-form-label">Nº Emenda</label>
                  <input type="text" className="admin-input" placeholder="Ex: 20240001" value={form.num_emenda} onChange={field('num_emenda')} />
                </div>

                <div>
                  <label className="admin-form-label">Ano Emenda</label>
                  <input type="text" className="admin-input" placeholder="Ex: 2024" value={form.ano_emenda} onChange={field('ano_emenda')} />
                </div>

                <div style={{ gridColumn: '1 / -1', borderTop: '1px solid var(--admin-border)', paddingTop: 12, marginTop: 4 }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--admin-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Valores</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label className="admin-form-label">Valor</label>
                      <input type="text" className="admin-input" placeholder="Ex: R$ 150.000,00" value={form.valor} onChange={field('valor')} />
                    </div>
                    <div>
                      <label className="admin-form-label">Valor Emenda</label>
                      <input type="text" className="admin-input" placeholder="Ex: R$ 150.000,00" value={form.valor_emenda} onChange={field('valor_emenda')} />
                    </div>
                  </div>
                </div>

                <div style={{ gridColumn: '1 / -1', borderTop: '1px solid var(--admin-border)', paddingTop: 12, marginTop: 4 }}>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--admin-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Prestação de Contas</p>
                  <input type="text" className="admin-input" placeholder="Cole a URL do documento ou escreva o status (Ex: Em análise, Aprovada...)" value={form.prestacao_contas} onChange={field('prestacao_contas')} />
                  <p style={{ fontSize: '0.72rem', color: 'var(--admin-text-tertiary)', marginTop: 6 }}>
                    Se for uma URL, vira link clicável automaticamente na página pública.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 8 }}>
                <button type="button" className="admin-btn admin-btn-secondary" onClick={closeEditor}>Cancelar</button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving || !isFormValid}
                  style={{ opacity: saving || !isFormValid ? 0.6 : 1, cursor: saving || !isFormValid ? 'not-allowed' : 'pointer' }}>
                  {saving
                    ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />Salvando...</>
                    : <><Save size={16} />{editingRecord ? 'Salvar Alterações' : 'Adicionar Registro'}</>}
                </button>
              </div>
            </form>
          </div>
        </>,
        document.body
      )}

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
