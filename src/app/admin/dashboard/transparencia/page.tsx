'use client';
import { supabase } from '@/lib/supabase';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import {
  ShieldCheck,
  Plus,
  Trash2,
  Edit3,
  Calendar,
  Loader2,
  FolderOpen,
  AlertCircle,
  CheckCircle2,
  Search,
  FileText,
  X,
  Save,
  Download,
} from 'lucide-react';

/**
 * Gestão de Documentos — Transparência — Instituto Gênesis
 * CRUD completo para documentos públicos de prestação de contas.
 *
 * Tabela Supabase necessária:
 *   CREATE TABLE transparency_docs (
 *     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 *     title text NOT NULL,
 *     description text,
 *     category text,
 *     file_url text,
 *     file_size text,
 *     doc_date text,
 *     created_at timestamptz DEFAULT now()
 *   );
 */

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

const DOC_CATEGORIES = [
  'Relatórios Financeiros',
  'Projetos e Convênios',
  'Atas e Reuniões',
  'Estatuto e Regimentos',
  'Prestação de Contas',
];

const categoryColors: Record<string, string> = {
  'Relatórios Financeiros': '#2B44FF',
  'Projetos e Convênios': '#10B981',
  'Atas e Reuniões': '#F59E0B',
  'Estatuto e Regimentos': '#8B5CF6',
  'Prestação de Contas': '#EF4444',
};


export default function TransparenciaAdmin() {
  const [docs, setDocs] = useState<TransparencyDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [editingDoc, setEditingDoc] = useState<TransparencyDoc | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formCategory, setFormCategory] = useState('');
  const [formFileUrl, setFormFileUrl] = useState('');
  const [formFileSize, setFormFileSize] = useState('');
  const [formDocDate, setFormDocDate] = useState('');

  useEffect(() => { fetchDocs(); }, []);

  useEffect(() => {
    if (notification) {
      const t = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(t);
    }
  }, [notification]);

  async function fetchDocs() {
    setLoading(true);
    const { data } = await supabase.from('transparency_docs').select('*').order('created_at', { ascending: false });
    if (data) setDocs(data);
    setLoading(false);
  }

  function openNew() {
    setEditingDoc(null);
    setFormTitle(''); setFormDescription(''); setFormCategory('');
    setFormFileUrl(''); setFormFileSize(''); setFormDocDate('');
    setShowEditor(true);
  }

  function openEdit(d: TransparencyDoc) {
    setEditingDoc(d);
    setFormTitle(d.title); setFormDescription(d.description || '');
    setFormCategory(d.category || ''); setFormFileUrl(d.file_url || '');
    setFormFileSize(d.file_size || ''); setFormDocDate(d.doc_date || '');
    setShowEditor(true);
  }

  function closeEditor() { setShowEditor(false); setEditingDoc(null); }


  async function handleSave(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formTitle.trim()) return;
    setSaving(true);
    const payload = {
      title: formTitle.trim(),
      description: formDescription || null,
      category: formCategory || null,
      file_url: formFileUrl || null,
      file_size: formFileSize || null,
      doc_date: formDocDate || null,
    };

    if (editingDoc) {
      const { error } = await supabase.from('transparency_docs').update(payload).eq('id', editingDoc.id);
      if (!error) {
        setDocs(prev => prev.map(d => d.id === editingDoc.id ? { ...d, ...payload } : d));
        setNotification({ type: 'success', message: 'Documento atualizado!' });
        closeEditor();
      } else {
        setNotification({ type: 'error', message: error.message });
      }
    } else {
      const { data, error } = await supabase.from('transparency_docs').insert([payload]).select();
      if (data?.[0]) {
        setDocs(prev => [data[0], ...prev]);
        setNotification({ type: 'success', message: `"${formTitle.trim()}" adicionado!` });
        closeEditor();
      } else {
        setNotification({ type: 'error', message: error?.message || 'Erro ao criar.' });
      }
    }
    setSaving(false);
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Remover documento "${title}"?`)) return;
    setDeletingId(id);
    const { error } = await supabase.from('transparency_docs').delete().eq('id', id);
    if (!error) {
      setDocs(prev => prev.filter(d => d.id !== id));
      setNotification({ type: 'success', message: 'Documento removido.' });
    } else {
      setNotification({ type: 'error', message: error.message });
    }
    setDeletingId(null);
  }

  function formatDate(d: string) {
    return new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  const filtered = docs.filter(d => {
    const matchSearch = d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (d.category || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (d.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchCat = !filterCategory || d.category === filterCategory;
    return matchSearch && matchCat;
  });

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
        <div style={{ display: 'flex', gap: 10, flex: 1, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', height: 42, borderRadius: 'var(--admin-radius-md)', background: 'var(--admin-surface)', border: '1px solid var(--admin-border)', flex: 1, maxWidth: 320 }}>
            <Search size={16} style={{ color: 'var(--admin-text-tertiary)', flexShrink: 0 }} />
            <input type="text" placeholder="Buscar documentos..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
              style={{ border: 'none', background: 'none', outline: 'none', fontFamily: 'inherit', fontSize: '0.85rem', color: 'var(--admin-text-primary)', width: '100%' }} />
          </div>
          <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}
            style={{ height: 42, padding: '0 14px', borderRadius: 'var(--admin-radius-md)', border: '1px solid var(--admin-border)', background: 'var(--admin-surface)', color: 'var(--admin-text-primary)', fontSize: '0.85rem', cursor: 'pointer' }}>
            <option value="">Todas as categorias</option>
            {DOC_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--admin-text-tertiary)', fontWeight: 500 }}>
            {docs.length} documento{docs.length !== 1 ? 's' : ''}
          </span>
          <button className="admin-btn admin-btn-primary" onClick={openNew}>
            <Plus size={16} /> Novo Documento
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card admin-animate-in-delay-1">
        <div className="glass-card-body" style={{ padding: '0 28px 28px' }}>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18, padding: '28px 0' }}>
              {[1,2,3,4].map(i => <div key={i} className="admin-skeleton" style={{ height: 24, width: `${90-i*8}%` }} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="admin-empty-state">
              <div className="admin-empty-state-icon"><FolderOpen size={24} /></div>
              <div className="admin-empty-state-text">{docs.length === 0 ? 'Nenhum documento adicionado' : 'Nenhum resultado'}</div>
              <div className="admin-empty-state-hint">{docs.length === 0 ? 'Adicione o primeiro documento público.' : 'Tente outra busca.'}</div>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Documento</th>
                  <th>Categoria</th>
                  <th>Data do Doc.</th>
                  <th>Arquivo</th>
                  <th>Adicionado em</th>
                  <th style={{ textAlign: 'right' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(doc => {
                  const color = categoryColors[doc.category || ''] || 'var(--admin-primary)';
                  return (
                    <tr key={doc.id}>
                      <td className="cell-primary">
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{ width: 40, height: 40, borderRadius: 'var(--admin-radius-sm)', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <FileText size={18} color={color} />
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.85rem' }}>{doc.title}</div>
                            {doc.description && (
                              <div style={{ fontSize: '0.72rem', color: 'var(--admin-text-tertiary)', marginTop: 2, maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {doc.description}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        {doc.category
                          ? <span className="admin-tag" style={{ borderLeft: `3px solid ${color}` }}>{doc.category}</span>
                          : <span style={{ color: 'var(--admin-text-tertiary)', fontSize: '0.8rem' }}>—</span>}
                      </td>
                      <td>
                        <span style={{ fontSize: '0.82rem', color: 'var(--admin-text-secondary)' }}>{doc.doc_date || '—'}</span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          {doc.file_url
                            ? <a href={doc.file_url} target="_blank" rel="noopener noreferrer" className="admin-btn admin-btn-icon" title="Visualizar" style={{ color: 'var(--admin-primary)' }}><Download size={14} /></a>
                            : <span style={{ fontSize: '0.78rem', color: 'var(--admin-text-tertiary)' }}>Sem arquivo</span>}
                          {doc.file_size && <span style={{ fontSize: '0.72rem', color: 'var(--admin-text-tertiary)' }}>{doc.file_size}</span>}
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem', color: 'var(--admin-text-secondary)' }}>
                          <Calendar size={14} />{formatDate(doc.created_at)}
                        </div>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 4 }}>
                          <button className="admin-btn admin-btn-icon" title="Editar" onClick={() => openEdit(doc)}><Edit3 size={16} /></button>
                          <button className="admin-btn admin-btn-icon" title="Remover"
                            style={{ color: deletingId === doc.id ? 'var(--admin-text-tertiary)' : 'var(--admin-danger)' }}
                            onClick={() => handleDelete(doc.id, doc.title)} disabled={deletingId === doc.id}>
                            {deletingId === doc.id ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Trash2 size={16} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Editor Panel */}
      {showEditor && typeof document !== 'undefined' && createPortal(
        <>
          <div onClick={closeEditor} style={{ position: 'fixed', inset: 0, background: 'rgba(13,12,27,0.5)', backdropFilter: 'blur(6px)', zIndex: 9900, animation: 'adminFadeIn 0.2s ease forwards' }} />
          <div className="admin-animate-in" style={{
            position: 'fixed', top: 0, right: 0, width: '100%', maxWidth: 620,
            height: '100vh', background: 'var(--admin-surface)', borderLeft: '1px solid var(--admin-border)',
            boxShadow: '-12px 0 40px rgba(13,12,27,0.12)', zIndex: 9910,
            display: 'flex', flexDirection: 'column', overflow: 'hidden',
          }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 28px', borderBottom: '1px solid var(--admin-border)' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'Outfit, sans-serif', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                <ShieldCheck size={18} style={{ color: 'var(--admin-primary)' }} />
                {editingDoc ? 'Editar Documento' : 'Novo Documento'}
              </h3>
              <button className="admin-btn admin-btn-icon" onClick={closeEditor} style={{ border: '1px solid var(--admin-border)' }}><X size={18} /></button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} style={{ flex: 1, overflow: 'auto', padding: 28, display: 'flex', flexDirection: 'column', gap: 20 }}>

              <div>
                <label className="admin-form-label">Título do Documento *</label>
                <input type="text" className="admin-input" placeholder="Ex: Relatório Financeiro Anual 2024" value={formTitle} onChange={e => setFormTitle(e.target.value.slice(0, 120))} required autoFocus />
                <div style={{ textAlign: 'right', marginTop: 4 }}>
                  <span style={{ fontSize: '0.7rem', color: formTitle.length >= 110 ? 'var(--admin-danger)' : 'var(--admin-text-tertiary)' }}>{formTitle.length}/120</span>
                </div>
              </div>

              <div>
                <label className="admin-form-label">Categoria</label>
                <select className="admin-input" value={formCategory} onChange={e => setFormCategory(e.target.value)} style={{ cursor: 'pointer' }}>
                  <option value="">Selecionar categoria...</option>
                  {DOC_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="admin-form-label">Descrição</label>
                <textarea className="admin-input" placeholder="Descreva brevemente o conteúdo do documento..." value={formDescription} onChange={e => setFormDescription(e.target.value.slice(0, 400))}
                  style={{ minHeight: 90, resize: 'vertical', lineHeight: 1.6 }} />
                <div style={{ textAlign: 'right', marginTop: 4 }}>
                  <span style={{ fontSize: '0.7rem', color: formDescription.length >= 380 ? 'var(--admin-danger)' : 'var(--admin-text-tertiary)' }}>{formDescription.length}/400</span>
                </div>
              </div>

              <div>
                <label className="admin-form-label">Data do Documento</label>
                <input type="text" className="admin-input" placeholder="Ex: Jan 2025, Mar 2024..." value={formDocDate} onChange={e => setFormDocDate(e.target.value)} />
              </div>

              <div>
                <label className="admin-form-label">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><FileText size={14} /> Link do Arquivo (PDF)</div>
                </label>

                <div style={{ position: 'relative' }}>
                  <input type="url" className="admin-input" placeholder="Ou cole a URL do arquivo..." value={formFileUrl}
                    onChange={e => setFormFileUrl(e.target.value)} style={{ paddingRight: 40 }} />
                  {formFileUrl && (
                    <button type="button" onClick={() => setFormFileUrl('')}
                      style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--admin-text-tertiary)', cursor: 'pointer', padding: 4 }}>
                      <X size={14} />
                    </button>
                  )}
                </div>

                {formFileUrl && (
                  <div style={{ marginTop: 10, padding: '10px 14px', borderRadius: 'var(--admin-radius-sm)', background: 'var(--admin-primary-subtle)', display: 'flex', alignItems: 'center', gap: 10 }}>
                    <FileText size={16} style={{ color: 'var(--admin-primary)', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.78rem', color: 'var(--admin-primary)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{formFileUrl}</span>
                    <a href={formFileUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--admin-primary)', flexShrink: 0 }}><Download size={14} /></a>
                  </div>
                )}
              </div>

              <div>
                <label className="admin-form-label">Tamanho do arquivo</label>
                <input type="text" className="admin-input" placeholder="Ex: 2,4 MB" value={formFileSize} onChange={e => setFormFileSize(e.target.value)} />
              </div>

              {/* Footer */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, paddingTop: 8 }}>
                <button type="button" className="admin-btn admin-btn-secondary" onClick={closeEditor}>Cancelar</button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving || !formTitle.trim()}
                  style={{ opacity: saving || !formTitle.trim() ? 0.6 : 1, cursor: saving || !formTitle.trim() ? 'not-allowed' : 'pointer' }}>
                  {saving ? <><Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />Salvando...</> : <><Save size={16} />{editingDoc ? 'Salvar Alterações' : 'Publicar Documento'}</>}
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
