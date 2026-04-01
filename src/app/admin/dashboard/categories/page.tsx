'use client';
import { supabase } from '@/lib/supabase';
import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import {
  Tag,
  Plus,
  Trash2,
  Hash,
  Loader2,
  FolderOpen,
  AlertCircle,
  CheckCircle2,
  Search,
} from 'lucide-react';

/**
 * Gestão de Categorias — CRUD Premium
 * Interface Enterprise para organização de conteúdos.
 * Instituto Gênesis
 */

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState<any[]>([]);
  const [newCategory, setNewCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  async function fetchCategories() {
    setLoading(true);
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    if (data) setCategories(data);
    if (error) {
      setNotification({ type: 'error', message: 'Erro ao buscar categorias: ' + error.message });
    }
    setLoading(false);
  }

  async function handleAddCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!newCategory.trim()) return;

    setAdding(true);
    const slug = newCategory
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const { data, error } = await supabase
      .from('categories')
      .insert([{ name: newCategory.trim(), slug }])
      .select();

    if (data && data.length > 0) {
      setCategories((prev) => [...prev, data[0]].sort((a, b) => a.name.localeCompare(b.name)));
      setNewCategory('');
      setNotification({ type: 'success', message: `Categoria "${newCategory.trim()}" criada com sucesso!` });
    } else {
      setNotification({
        type: 'error',
        message: error?.message || "Erro ao criar categoria. Verifique o banco.",
      });
    }
    setAdding(false);
  }

  async function handleDeleteCategory(id: string, name: string) {
    if (!confirm(`Tem certeza que deseja remover "${name}"?`)) return;

    setDeletingId(id);
    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (!error) {
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      setNotification({ type: 'success', message: `Categoria "${name}" removida.` });
    } else {
      setNotification({ type: 'error', message: 'Erro ao remover: ' + error.message });
    }
    setDeletingId(null);
  }

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* ── Notification Toast ───────────────── */}
      {notification && typeof document !== 'undefined' && createPortal(
        <div
          className="admin-animate-in"
          style={{
            position: 'fixed',
            top: 90,
            right: 40,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '14px 20px',
            borderRadius: 'var(--admin-radius-md)',
            background:
              notification.type === 'success'
                ? 'var(--admin-success-bg)'
                : 'var(--admin-danger-bg)',
            color:
              notification.type === 'success'
                ? 'var(--admin-success)'
                : 'var(--admin-danger)',
            border: `1px solid ${
              notification.type === 'success'
                ? 'rgba(16, 185, 129, 0.2)'
                : 'rgba(239, 68, 68, 0.2)'
            }`,
            fontSize: '0.85rem',
            fontWeight: 600,
            boxShadow: 'var(--admin-shadow-lg)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {notification.type === 'success' ? (
            <CheckCircle2 size={18} />
          ) : (
            <AlertCircle size={18} />
          )}
          {notification.message}
        </div>,
        document.body
      )}

      {/* ── Two-Column Layout ────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 380px) 1fr',
          gap: '28px',
          alignItems: 'start',
        }}
      >
        {/* LEFT: Add Category Form */}
        <div className="admin-form-card admin-animate-in-delay-1">
          <div className="admin-form-card-title">
            <div className="admin-form-card-title-icon">
              <Plus size={16} strokeWidth={2.2} />
            </div>
            Nova Categoria
          </div>
          <form
            onSubmit={handleAddCategory}
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <div>
              <label className="admin-form-label" htmlFor="catName">
                Nome da Categoria
              </label>
              <input
                id="catName"
                type="text"
                className="admin-input"
                placeholder="Ex: Educação Rural"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                disabled={adding}
              />
            </div>

            {newCategory.trim() && (
              <div style={{ fontSize: '0.78rem', color: 'var(--admin-text-tertiary)' }}>
                <span style={{ fontWeight: 600 }}>Slug: </span>
                <span
                  style={{
                    fontFamily: 'monospace',
                    background: 'var(--admin-primary-subtle)',
                    padding: '2px 8px',
                    borderRadius: 4,
                    color: 'var(--admin-primary)',
                    fontWeight: 600,
                  }}
                >
                  {newCategory
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/^-|-$/g, '')}
                </span>
              </div>
            )}

            <button
              type="submit"
              className="admin-btn admin-btn-primary"
              disabled={adding || !newCategory.trim()}
              style={{
                opacity: adding || !newCategory.trim() ? 0.6 : 1,
                cursor: adding || !newCategory.trim() ? 'not-allowed' : 'pointer',
              }}
            >
              {adding ? (
                <>
                  <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                  Criando...
                </>
              ) : (
                <>
                  <Plus size={16} />
                  Adicionar Categoria
                </>
              )}
            </button>
          </form>

          {/* Stats mini */}
          <div
            style={{
              marginTop: 24,
              paddingTop: 20,
              borderTop: '1px solid var(--admin-border)',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.78rem',
              color: 'var(--admin-text-tertiary)',
            }}
          >
            <span>Total registrado</span>
            <span
              style={{
                fontWeight: 700,
                color: 'var(--admin-primary)',
                fontSize: '1rem',
                fontFamily: 'Outfit, sans-serif',
              }}
            >
              {categories.length}
            </span>
          </div>
        </div>

        {/* RIGHT: Categories Table */}
        <div className="glass-card admin-animate-in-delay-2">
          <div className="glass-card-header">
            <div className="glass-card-title">
              <div className="glass-card-title-icon">
                <Tag size={16} strokeWidth={2.2} />
              </div>
              Categorias Ativas
            </div>

            {/* Search */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '0 12px',
                height: 36,
                borderRadius: 'var(--admin-radius-sm)',
                background: 'var(--admin-bg)',
                border: '1px solid var(--admin-border)',
                fontSize: '0.8rem',
              }}
            >
              <Search size={14} style={{ color: 'var(--admin-text-tertiary)', flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Filtrar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  border: 'none',
                  background: 'none',
                  outline: 'none',
                  fontFamily: 'inherit',
                  fontSize: 'inherit',
                  color: 'var(--admin-text-primary)',
                  width: 120,
                }}
              />
            </div>
          </div>

          <div className="glass-card-body">
            {loading ? (
              /* Skeleton loading state */
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="admin-skeleton"
                    style={{ height: 20, width: `${80 - i * 10}%` }}
                  />
                ))}
              </div>
            ) : filteredCategories.length === 0 ? (
              <div className="admin-empty-state">
                <div className="admin-empty-state-icon">
                  <FolderOpen size={24} />
                </div>
                <div className="admin-empty-state-text">
                  {categories.length === 0
                    ? 'Nenhuma categoria cadastrada'
                    : 'Nenhum resultado encontrado'}
                </div>
                <div className="admin-empty-state-hint">
                  {categories.length === 0
                    ? 'Crie sua primeira categoria usando o formulário ao lado.'
                    : 'Tente buscar com outro termo.'}
                </div>
              </div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th style={{ paddingLeft: 0 }}>Nome da Categoria</th>
                    <th>Slug / ID</th>
                    <th style={{ textAlign: 'right', paddingRight: 0 }}>Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCategories.map((cat) => (
                    <tr key={cat.id}>
                      <td className="cell-primary" style={{ paddingLeft: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 'var(--admin-radius-sm)',
                              background: 'var(--admin-primary-subtle)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'var(--admin-primary)',
                              flexShrink: 0,
                            }}
                          >
                            <Hash size={14} />
                          </div>
                          {cat.name}
                        </div>
                      </td>
                      <td className="cell-secondary">
                        {cat.slug || `#${cat.id?.slice(0, 8)}`}
                      </td>
                      <td style={{ textAlign: 'right', paddingRight: 0 }}>
                        <button
                          className="admin-btn admin-btn-danger-text"
                          onClick={() => handleDeleteCategory(cat.id, cat.name)}
                          disabled={deletingId === cat.id}
                          style={{
                            opacity: deletingId === cat.id ? 0.5 : 1,
                            cursor: deletingId === cat.id ? 'not-allowed' : 'pointer',
                          }}
                        >
                          {deletingId === cat.id ? (
                            <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />
                          ) : (
                            <Trash2 size={14} />
                          )}
                          Remover
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Inline keyframes for spin animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
