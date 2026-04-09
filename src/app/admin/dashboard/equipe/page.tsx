'use client';
import { supabase } from '@/lib/supabase';
import { createPortal } from 'react-dom';
import { useEffect, useState, useRef } from 'react';
import {
  Users,
  Plus,
  Trash2,
  Edit3,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Search,
  Upload,
  X,
  Save,
  GripVertical,
  Mail,
  Phone,
} from 'lucide-react';

interface Membro {
  id: string;
  nome: string;
  funcao: string;
  foto_url: string | null;
  whatsapp: string | null;
  email: string | null;
  ordem: number;
}

const BUCKET_NAME = 'images';

export default function EquipeAdmin() {
  const [membros, setMembros] = useState<Membro[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditor, setShowEditor] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const [editingMembro, setEditingMembro] = useState<Membro | null>(null);
  const [formNome, setFormNome] = useState('');
  const [formFuncao, setFormFuncao] = useState('');
  const [formWhatsapp, setFormWhatsapp] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formFotoUrl, setFormFotoUrl] = useState('');
  const [formOrdem, setFormOrdem] = useState(0);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { fetchData(); }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  async function fetchData() {
    setLoading(true);
    const { data } = await supabase.from('equipe').select('*').order('ordem', { ascending: true });
    if (data) setMembros(data);
    setLoading(false);
  }

  function openNew() {
    setEditingMembro(null);
    setFormNome('');
    setFormFuncao('');
    setFormWhatsapp('');
    setFormEmail('');
    setFormFotoUrl('');
    setFormOrdem(membros.length + 1);
    setShowEditor(true);
  }

  function openEdit(m: Membro) {
    setEditingMembro(m);
    setFormNome(m.nome);
    setFormFuncao(m.funcao);
    setFormWhatsapp(m.whatsapp || '');
    setFormEmail(m.email || '');
    setFormFotoUrl(m.foto_url || '');
    setFormOrdem(m.ordem);
    setShowEditor(true);
  }

  function closeEditor() {
    setShowEditor(false);
    setEditingMembro(null);
    setUploading(false);
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const safeName = `equipe/${Date.now()}-${file.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9.-]+/g, '-')}`;

    const { data, error } = await supabase.storage.from(BUCKET_NAME).upload(safeName, file);

    if (data) {
      const { data: { publicUrl } } = supabase.storage.from(BUCKET_NAME).getPublicUrl(safeName);
      setFormFotoUrl(publicUrl);
      setNotification({ type: 'success', message: 'Foto carregada!' });
    } else {
      setNotification({ type: 'error', message: error?.message || 'Erro no upload.' });
    }

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!formNome.trim() || !formFuncao.trim()) return;

    setSaving(true);
    const payload = {
      nome: formNome.trim(),
      funcao: formFuncao.trim(),
      whatsapp: formWhatsapp.trim() || null,
      email: formEmail.trim() || null,
      foto_url: formFotoUrl || null,
      ordem: formOrdem,
    };

    if (editingMembro) {
      const { error } = await supabase.from('equipe').update(payload).eq('id', editingMembro.id);
      if (!error) {
        setMembros(prev => prev.map(m => m.id === editingMembro.id ? { ...m, ...payload } : m));
        setNotification({ type: 'success', message: 'Membro atualizado!' });
        closeEditor();
      } else {
        setNotification({ type: 'error', message: 'Erro: ' + error.message });
      }
    } else {
      const { data, error } = await supabase.from('equipe').insert([payload]).select();
      if (data && data.length > 0) {
        setMembros(prev => [...prev, data[0]].sort((a, b) => a.ordem - b.ordem));
        setNotification({ type: 'success', message: `"${formNome.trim()}" adicionado!` });
        closeEditor();
      } else {
        setNotification({ type: 'error', message: error?.message || 'Erro ao adicionar.' });
      }
    }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    const { error } = await supabase.from('equipe').delete().eq('id', id);
    if (!error) {
      setMembros(prev => prev.filter(m => m.id !== id));
      setNotification({ type: 'success', message: 'Membro removido.' });
    } else {
      setNotification({ type: 'error', message: 'Erro ao remover.' });
    }
    setDeletingId(null);
  }

  const filtered = membros.filter(m =>
    m.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.funcao.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const labelStyle: React.CSSProperties = {
    display: 'block', fontSize: '0.82rem', fontWeight: 600,
    color: 'var(--admin-text-secondary)', marginBottom: 6, letterSpacing: '0.03em',
  };
  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '12px 14px', fontSize: '0.92rem',
    border: '1px solid var(--admin-border)', borderRadius: 'var(--admin-radius-md)',
    background: 'var(--admin-surface)', color: 'var(--admin-text-primary)',
    outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
    fontFamily: 'inherit',
  };

  return (
    <>
      {/* Notification */}
      {notification && (
        <div style={{
          position: 'fixed', top: 24, right: 24, zIndex: 9999, padding: '14px 22px',
          borderRadius: 'var(--admin-radius-md)',
          background: notification.type === 'success' ? 'var(--admin-success)' : 'var(--admin-danger)',
          color: 'white', display: 'flex', alignItems: 'center', gap: 10,
          fontSize: '0.9rem', fontWeight: 600,
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)', animation: 'slideIn 0.3s ease',
        }}>
          {notification.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {notification.message}
        </div>
      )}

      {/* Header actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 28 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, flex: '1 1 300px',
          background: 'var(--admin-surface)', border: '1px solid var(--admin-border)',
          borderRadius: 'var(--admin-radius-md)', padding: '0 14px',
        }}>
          <Search size={16} style={{ color: 'var(--admin-text-tertiary)', flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Buscar membro..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{
              ...inputStyle,
              border: 'none', padding: '12px 0', background: 'transparent',
            }}
          />
        </div>
        <button onClick={openNew} className="admin-btn-primary" style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px',
          fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer',
          background: 'var(--admin-primary)', color: 'white', border: 'none',
          borderRadius: 'var(--admin-radius-md)', transition: 'all 0.2s',
        }}>
          <Plus size={18} /> Novo Membro
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
        <div className="stat-card" style={{ flex: '1 1 200px', padding: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div className="stat-card-icon" style={{ background: 'rgba(42, 62, 243, 0.1)', color: 'var(--admin-primary)' }}>
            <Users size={22} />
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--admin-text-primary)' }}>{membros.length}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--admin-text-secondary)' }}>Membros cadastrados</div>
          </div>
        </div>
      </div>

      {/* Grid de membros */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--admin-text-tertiary)' }}>
          <Loader2 size={28} style={{ animation: 'spin 1s linear infinite', margin: '0 auto 12px', display: 'block' }} />
          Carregando equipe...
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <Users size={40} style={{ color: 'var(--admin-text-tertiary)', margin: '0 auto 12px', display: 'block' }} />
          <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--admin-text-secondary)', marginBottom: 4 }}>
            {searchTerm ? 'Nenhum resultado encontrado' : 'Nenhum membro cadastrado'}
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--admin-text-tertiary)' }}>
            {searchTerm ? 'Tente outro termo de busca.' : 'Clique em "Novo Membro" para adicionar.'}
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 20,
        }}>
          {filtered.map(m => (
            <div key={m.id} className="glass-card" style={{ padding: 0, overflow: 'hidden', transition: 'all 0.2s' }}>
              {/* Foto */}
              <div style={{
                width: '100%', aspectRatio: '4 / 3',
                background: 'linear-gradient(135deg, rgba(42,62,243,0.08), rgba(42,62,243,0.03))',
                overflow: 'hidden', position: 'relative',
              }}>
                {m.foto_url ? (
                  <img src={m.foto_url} alt={m.nome} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{
                    width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '4rem', fontWeight: 800, color: 'var(--admin-primary)', opacity: 0.15,
                  }}>
                    {m.nome.charAt(0).toUpperCase()}
                  </div>
                )}
                {/* Ordem badge */}
                <div style={{
                  position: 'absolute', top: 10, left: 10,
                  background: 'rgba(0,0,0,0.6)', color: 'white',
                  fontSize: '0.7rem', fontWeight: 700, padding: '4px 10px',
                  borderRadius: 'var(--admin-radius-sm)',
                  display: 'flex', alignItems: 'center', gap: 4,
                }}>
                  <GripVertical size={12} /> #{m.ordem}
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: '16px 20px 20px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--admin-text-primary)', marginBottom: 2 }}>
                  {m.nome}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--admin-primary)', fontWeight: 500, marginBottom: 12 }}>
                  {m.funcao}
                </p>

                {/* Contatos inline */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 16, fontSize: '0.8rem', color: 'var(--admin-text-secondary)' }}>
                  {m.whatsapp && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Phone size={12} /> {m.whatsapp}
                    </span>
                  )}
                  {m.email && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <Mail size={12} /> {m.email}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    onClick={() => openEdit(m)}
                    style={{
                      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      padding: '10px 0', fontSize: '0.82rem', fontWeight: 600,
                      background: 'rgba(42, 62, 243, 0.08)', color: 'var(--admin-primary)',
                      border: '1px solid rgba(42, 62, 243, 0.15)', borderRadius: 'var(--admin-radius-sm)',
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}
                  >
                    <Edit3 size={14} /> Editar
                  </button>
                  <button
                    onClick={() => handleDelete(m.id)}
                    disabled={deletingId === m.id}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      padding: '10px 14px', fontSize: '0.82rem',
                      background: 'rgba(239, 68, 68, 0.08)', color: '#EF4444',
                      border: '1px solid rgba(239, 68, 68, 0.15)', borderRadius: 'var(--admin-radius-sm)',
                      cursor: deletingId === m.id ? 'not-allowed' : 'pointer',
                      opacity: deletingId === m.id ? 0.5 : 1, transition: 'all 0.2s',
                    }}
                  >
                    {deletingId === m.id ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Trash2 size={14} />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Editor Modal */}
      {showEditor && typeof document !== 'undefined' && createPortal(
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9000,
          background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 20, animation: 'fadeIn 0.2s ease',
        }} onClick={closeEditor}>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--admin-surface)', borderRadius: 'var(--admin-radius-lg)',
              width: '100%', maxWidth: 520, maxHeight: '90vh', overflowY: 'auto',
              boxShadow: '0 24px 48px rgba(0,0,0,0.25)', animation: 'slideUp 0.3s ease',
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '20px 24px', borderBottom: '1px solid var(--admin-border)',
            }}>
              <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--admin-text-primary)' }}>
                {editingMembro ? 'Editar Membro' : 'Novo Membro'}
              </h2>
              <button onClick={closeEditor} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--admin-text-tertiary)', padding: 4,
              }}>
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSave} style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
              {/* Foto */}
              <div>
                <label style={labelStyle}>Foto</label>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{
                    width: 80, height: 80, borderRadius: 'var(--admin-radius-md)',
                    border: '1px solid var(--admin-border)', overflow: 'hidden',
                    background: 'linear-gradient(135deg, rgba(42,62,243,0.08), rgba(42,62,243,0.03))',
                    flexShrink: 0,
                  }}>
                    {formFotoUrl ? (
                      <img src={formFotoUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{
                        width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--admin-text-tertiary)',
                      }}>
                        <Users size={28} />
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px',
                        fontSize: '0.82rem', fontWeight: 600, cursor: uploading ? 'not-allowed' : 'pointer',
                        background: 'var(--admin-bg)', border: '1px solid var(--admin-border)',
                        borderRadius: 'var(--admin-radius-sm)', color: 'var(--admin-text-secondary)',
                        transition: 'all 0.2s',
                      }}
                    >
                      {uploading ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Upload size={14} />}
                      {uploading ? 'Enviando...' : 'Enviar foto'}
                    </button>
                    {formFotoUrl && (
                      <button
                        type="button"
                        onClick={() => setFormFotoUrl('')}
                        style={{
                          marginTop: 6, fontSize: '0.75rem', color: '#EF4444',
                          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                        }}
                      >
                        Remover foto
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Nome */}
              <div>
                <label style={labelStyle}>Nome completo *</label>
                <input
                  type="text" required value={formNome}
                  onChange={e => setFormNome(e.target.value)}
                  placeholder="Nome do membro"
                  style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = 'var(--admin-primary)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(42,62,243,0.1)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'var(--admin-border)'; e.currentTarget.style.boxShadow = 'none'; }}
                />
              </div>

              {/* Função */}
              <div>
                <label style={labelStyle}>Função / Cargo *</label>
                <input
                  type="text" required value={formFuncao}
                  onChange={e => setFormFuncao(e.target.value)}
                  placeholder="Ex: Coordenadora Pedagógica"
                  style={inputStyle}
                  onFocus={e => { e.currentTarget.style.borderColor = 'var(--admin-primary)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(42,62,243,0.1)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'var(--admin-border)'; e.currentTarget.style.boxShadow = 'none'; }}
                />
              </div>

              {/* WhatsApp + Email */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={labelStyle}>WhatsApp</label>
                  <input
                    type="text" value={formWhatsapp}
                    onChange={e => setFormWhatsapp(e.target.value)}
                    placeholder="(98) 99999-9999"
                    style={inputStyle}
                    onFocus={e => { e.currentTarget.style.borderColor = 'var(--admin-primary)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(42,62,243,0.1)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'var(--admin-border)'; e.currentTarget.style.boxShadow = 'none'; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>E-mail</label>
                  <input
                    type="email" value={formEmail}
                    onChange={e => setFormEmail(e.target.value)}
                    placeholder="email@exemplo.com"
                    style={inputStyle}
                    onFocus={e => { e.currentTarget.style.borderColor = 'var(--admin-primary)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(42,62,243,0.1)'; }}
                    onBlur={e => { e.currentTarget.style.borderColor = 'var(--admin-border)'; e.currentTarget.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>

              {/* Ordem */}
              <div>
                <label style={labelStyle}>Ordem de exibição</label>
                <input
                  type="number" min={1} value={formOrdem}
                  onChange={e => setFormOrdem(Number(e.target.value))}
                  style={{ ...inputStyle, maxWidth: 120 }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'var(--admin-primary)'; e.currentTarget.style.boxShadow = '0 0 0 3px rgba(42,62,243,0.1)'; }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'var(--admin-border)'; e.currentTarget.style.boxShadow = 'none'; }}
                />
              </div>

              {/* Submit */}
              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button type="button" onClick={closeEditor} style={{
                  flex: 1, padding: '12px 0', fontSize: '0.9rem', fontWeight: 600,
                  background: 'var(--admin-bg)', border: '1px solid var(--admin-border)',
                  borderRadius: 'var(--admin-radius-md)', cursor: 'pointer',
                  color: 'var(--admin-text-secondary)', transition: 'all 0.2s',
                }}>
                  Cancelar
                </button>
                <button type="submit" disabled={saving} style={{
                  flex: 2, padding: '12px 0', fontSize: '0.9rem', fontWeight: 700,
                  background: 'var(--admin-primary)', color: 'white', border: 'none',
                  borderRadius: 'var(--admin-radius-md)', cursor: saving ? 'not-allowed' : 'pointer',
                  opacity: saving ? 0.7 : 1, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: 8, transition: 'all 0.2s',
                }}>
                  {saving ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={16} />}
                  {saving ? 'Salvando...' : editingMembro ? 'Atualizar' : 'Adicionar'}
                </button>
              </div>
            </form>
          </div>

          <style>{`
            @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
            @keyframes slideUp { from { opacity: 0; transform: translateY(20px) } to { opacity: 1; transform: translateY(0) } }
            @keyframes slideIn { from { opacity: 0; transform: translateX(20px) } to { opacity: 1; transform: translateX(0) } }
            @keyframes spin { to { transform: rotate(360deg) } }
          `}</style>
        </div>,
        document.body
      )}
    </>
  );
}
