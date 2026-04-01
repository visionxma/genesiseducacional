'use client';
import { supabase } from '@/lib/supabase';
import { createPortal } from 'react-dom';
import { useEffect, useState, useRef } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Trash2,
  Copy,
  CheckCircle2,
  AlertCircle,
  Loader2,
  FolderOpen,
  Search,
  Grid3X3,
  List,
  FileImage,
  X,
  ExternalLink,
  Edit2,
  Save,
} from 'lucide-react';

/**
 * Gestão de Mídia — Upload & Galeria Premium
 * Upload para Supabase Storage com galeria visual.
 * Instituto Gênesis
 */

interface MediaFile {
  name: string;
  id: string;
  created_at: string;
  metadata: {
    size: number;
    mimetype: string;
  };
  url: string;
}

const BUCKET_NAME = 'images';

export default function MediaAdmin() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [previewImage, setPreviewImage] = useState<MediaFile | null>(null);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState('');
  const [renamingId, setRenamingId] = useState<string | null>(null);

  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; name: string }>({ isOpen: false, name: '' });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  async function fetchFiles() {
    setLoading(true);
    const { data, error } = await supabase.storage.from(BUCKET_NAME).list('', {
      sortBy: { column: 'created_at', order: 'desc' },
    });

    if (data) {
      const mediaFiles: MediaFile[] = data
        .filter((f: any) => f.name !== '.emptyFolderPlaceholder')
        .map((f: any) => ({
          name: f.name,
          id: f.id || f.name,
          created_at: f.created_at || '',
          metadata: {
            size: (f.metadata as any)?.size || 0,
            mimetype: (f.metadata as any)?.mimetype || 'image/*',
          },
          url: supabase.storage.from(BUCKET_NAME).getPublicUrl(f.name).data.publicUrl,
        }));
      setFiles(mediaFiles);
    }
    if (error) {
      setNotification({ type: 'error', message: 'Erro ao buscar mídia: ' + error.message });
    }
    setLoading(false);
  }

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const fileExt = file.name.split('.').pop();
    const safeName = `${Date.now()}-${file.name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9.-]+/g, '-')}`;

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(safeName, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (data) {
      setNotification({ type: 'success', message: `"${file.name}" uploaded com sucesso!` });
      fetchFiles();
    } else {
      setNotification({
        type: 'error',
        message: error?.message || 'Erro no upload. Verifique o bucket.',
      });
    }

    setUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  async function handleRename() {
    if (!previewImage || !newName.trim()) return;
    
    const finalName = newName.trim();
    if (formatDisplayName(previewImage.name) === finalName) {
      setIsRenaming(false);
      return;
    }

    setRenamingId(previewImage.name);
    
    // Preserva a extensão da imagem original para evitar arquivos corrompidos
    const ext = previewImage.name.split('.').pop() || '';
    let nameWithExt = finalName;
    if (!nameWithExt.endsWith(`.${ext}`)) nameWithExt += `.${ext}`;

    const safeName = `${Date.now()}-${nameWithExt
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9.-]+/g, '-')}`;

    // A API move renomeia o arquivo ou move-o internamente.
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .move(previewImage.name, safeName);

    if (error) {
       setNotification({ type: 'error', message: 'Erro ao renomear: ' + error.message });
    } else {
       setNotification({ type: 'success', message: 'Mídia renomeada com sucesso!' });
       setIsRenaming(false);
       setPreviewImage(null); // Force repainting / closing para não exibir a URL que se quebrou
       fetchFiles();
    }
    setRenamingId(null);
  }

  function handleDelete(name: string) {
    setDeleteConfirm({ isOpen: true, name });
  }

  async function confirmDelete() {
    const name = deleteConfirm.name;
    setDeleteConfirm({ isOpen: false, name: '' });
    if (!name) return;

    setDeletingId(name);
    const { error } = await supabase.storage.from(BUCKET_NAME).remove([name]);
    if (!error) {
      setFiles((prev) => prev.filter((f) => f.name !== name));
      setNotification({ type: 'success', message: 'Arquivo removido.' });
      if (previewImage?.name === name) setPreviewImage(null);
    } else {
      setNotification({ type: 'error', message: 'Erro: ' + error.message });
    }
    setDeletingId(null);
  }

  function copyUrl(url: string) {
    navigator.clipboard.writeText(url);
    setNotification({ type: 'success', message: 'URL copiada para a área de transferência!' });
  }

  function formatSize(bytes: number): string {
    if (!bytes) return '—';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  const formatDisplayName = (name: string) => name.replace(/^\d+-/, '');

  const filteredFiles = files.filter((f) =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* ── Notification Toast ──────────────── */}
      {notification && typeof document !== 'undefined' && createPortal(
        <div
          className="admin-animate-in"
          style={{
            position: 'fixed',
            bottom: 40,
            right: 40,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '14px 20px',
            borderRadius: 'var(--admin-radius-md)',
            background:
              notification.type === 'success' ? 'var(--admin-success-bg)' : 'var(--admin-danger-bg)',
            color:
              notification.type === 'success' ? 'var(--admin-success)' : 'var(--admin-danger)',
            border: `1px solid ${
              notification.type === 'success' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'
            }`,
            fontSize: '0.85rem',
            fontWeight: 600,
            boxShadow: 'var(--admin-shadow-lg)',
          }}
        >
          {notification.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          {notification.message}
        </div>,
        document.body
      )}

      {/* ── Upload / Action Bar ─────────────── */}
      <div
        className="admin-animate-in"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        {/* Search */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '0 14px',
            height: 42,
            borderRadius: 'var(--admin-radius-md)',
            background: 'var(--admin-surface)',
            border: '1px solid var(--admin-border)',
            flex: 1,
            maxWidth: 320,
          }}
        >
          <Search size={16} style={{ color: 'var(--admin-text-tertiary)', flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Buscar arquivos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              border: 'none',
              background: 'none',
              outline: 'none',
              fontFamily: 'inherit',
              fontSize: '0.85rem',
              color: 'var(--admin-text-primary)',
              width: '100%',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {/* View toggle */}
          <div
            style={{
              display: 'flex',
              borderRadius: 'var(--admin-radius-sm)',
              overflow: 'hidden',
              border: '1px solid var(--admin-border)',
            }}
          >
            <button
              className="admin-btn admin-btn-icon"
              style={{
                borderRadius: 0,
                background: viewMode === 'grid' ? 'var(--admin-primary-subtle)' : 'transparent',
                color: viewMode === 'grid' ? 'var(--admin-primary)' : 'var(--admin-text-secondary)',
              }}
              onClick={() => setViewMode('grid')}
              title="Grade"
            >
              <Grid3X3 size={16} />
            </button>
            <button
              className="admin-btn admin-btn-icon"
              style={{
                borderRadius: 0,
                background: viewMode === 'list' ? 'var(--admin-primary-subtle)' : 'transparent',
                color: viewMode === 'list' ? 'var(--admin-primary)' : 'var(--admin-text-secondary)',
              }}
              onClick={() => setViewMode('list')}
              title="Lista"
            >
              <List size={16} />
            </button>
          </div>

          <span
            style={{
              fontSize: '0.78rem',
              color: 'var(--admin-text-tertiary)',
              fontWeight: 500,
            }}
          >
            {files.length} arquivo{files.length !== 1 ? 's' : ''}
          </span>

          {/* Upload Button */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            style={{ display: 'none' }}
            id="file-upload"
          />
          <button
            className="admin-btn admin-btn-primary"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            style={{
              opacity: uploading ? 0.6 : 1,
              cursor: uploading ? 'not-allowed' : 'pointer',
            }}
          >
            {uploading ? (
              <>
                <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                Enviando...
              </>
            ) : (
              <>
                <Upload size={16} />
                Upload de Imagem
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Gallery / Files ─────────────────── */}
      <div className="glass-card admin-animate-in-delay-1">
        <div className="glass-card-body">
          {loading ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: 16,
              }}
            >
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="admin-skeleton"
                  style={{ height: 160, borderRadius: 'var(--admin-radius-md)' }}
                />
              ))}
            </div>
          ) : filteredFiles.length === 0 ? (
            <div className="admin-empty-state">
              <div className="admin-empty-state-icon">
                <FolderOpen size={24} />
              </div>
              <div className="admin-empty-state-text">
                {files.length === 0 ? 'Nenhum arquivo carregado' : 'Nenhum resultado'}
              </div>
              <div className="admin-empty-state-hint">
                {files.length === 0
                  ? 'Faça upload da sua primeira imagem usando o botão acima.'
                  : 'Tente outra busca.'}
              </div>
            </div>
          ) : viewMode === 'grid' ? (
            /* Grid View */
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: 16,
              }}
            >
              {filteredFiles.map((file) => (
                <div
                  key={file.name}
                  style={{
                    borderRadius: 'var(--admin-radius-md)',
                    border: '1px solid var(--admin-border)',
                    overflow: 'hidden',
                    transition: 'all var(--admin-transition)',
                    cursor: 'pointer',
                    position: 'relative',
                    background: 'var(--admin-bg)',
                  }}
                  onClick={() => setPreviewImage(file)}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'var(--admin-shadow-md)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = 'none';
                    (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                  }}
                >
                  {/* Thumbnail */}
                  <div
                    style={{
                      height: 140,
                      background: `url(${file.url}) center/cover no-repeat`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {!file.url && (
                      <FileImage size={32} style={{ color: 'var(--admin-text-tertiary)' }} />
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ padding: '10px 12px' }}>
                    <div
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        color: 'var(--admin-text-primary)',
                      }}
                    >
                      {formatDisplayName(file.name)}
                    </div>
                    <div
                      style={{
                        fontSize: '0.68rem',
                        color: 'var(--admin-text-tertiary)',
                        marginTop: 2,
                      }}
                    >
                      {formatSize(file.metadata.size)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Arquivo</th>
                  <th>Tamanho</th>
                  <th>Tipo</th>
                  <th style={{ textAlign: 'right' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.map((file) => (
                  <tr key={file.name}>
                    <td className="cell-primary">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 'var(--admin-radius-sm)',
                            background: `url(${file.url}) center/cover`,
                            flexShrink: 0,
                            border: '1px solid var(--admin-border)',
                          }}
                        />
                        <span
                          style={{
                            fontSize: '0.85rem',
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: 240,
                          }}
                        >
                          {formatDisplayName(file.name)}
                        </span>
                      </div>
                    </td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--admin-text-secondary)' }}>
                      {formatSize(file.metadata.size)}
                    </td>
                    <td>
                      <span className="admin-tag" style={{ fontSize: '0.7rem' }}>
                        {file.metadata.mimetype || 'image/*'}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 4 }}>
                        <button
                          className="admin-btn admin-btn-icon"
                          title="Copiar URL"
                          onClick={() => copyUrl(file.url)}
                        >
                          <Copy size={16} />
                        </button>
                        <button
                          className="admin-btn admin-btn-icon"
                          title="Abrir"
                          onClick={() => window.open(file.url, '_blank')}
                        >
                          <ExternalLink size={16} />
                        </button>
                        <button
                          className="admin-btn admin-btn-icon"
                          title="Remover"
                          style={{ color: 'var(--admin-danger)' }}
                          onClick={() => handleDelete(file.name)}
                          disabled={deletingId === file.name}
                        >
                          {deletingId === file.name ? (
                            <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                          ) : (
                            <Trash2 size={16} />
                          )}
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

      {/* ── Image Preview Modal ─────────────── */}
      {previewImage && typeof document !== 'undefined' && createPortal(
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9900,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          {/* Fundo Desfocado (Backdrop) */}
          <div
            onClick={() => {
              if (!isRenaming) setPreviewImage(null);
            }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(13, 12, 27, 0.7)',
              backdropFilter: 'blur(12px)',
              animation: 'adminFadeIn 0.2s ease forwards',
            }}
          />

          {/* Container do Modal */}
          <div
            className="admin-animate-in"
            style={{
              position: 'relative',
              zIndex: 9910,
              background: 'var(--admin-surface)',
              borderRadius: 'var(--admin-radius-2xl)',
              overflow: 'hidden',
              maxWidth: 720,
              width: '100%',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--admin-shadow-glass), 0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Preview Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 24px',
                borderBottom: '1px solid var(--admin-border)',
                background: 'var(--admin-bg)',
              }}
            >
              {isRenaming ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1, marginRight: 16 }}>
                  <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    autoFocus
                    style={{
                      padding: '8px 12px',
                      borderRadius: 'var(--admin-radius-sm)',
                      border: '1px solid var(--admin-primary)',
                      background: 'var(--admin-surface)',
                      color: 'var(--admin-text-primary)',
                      outline: 'none',
                      width: '100%',
                      maxWidth: 320,
                      fontSize: '0.9rem'
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && handleRename()}
                  />
                  <button
                    className="admin-btn admin-btn-primary"
                    onClick={handleRename}
                    disabled={renamingId === previewImage.name}
                    style={{ height: '36px', padding: '0 12px' }}
                  >
                    {renamingId === previewImage.name ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={16} />}
                  </button>
                  <button
                    className="admin-btn admin-btn-icon"
                    onClick={() => setIsRenaming(false)}
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <span
                  style={{
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '60%',
                    color: 'var(--admin-text-primary)'
                  }}
                >
                  {formatDisplayName(previewImage.name)}
                </span>
              )}

              {!isRenaming && (
                <div style={{ display: 'flex', gap: 8 }}>
                  <button
                    className="admin-btn admin-btn-icon"
                    title="Renomear"
                    onClick={() => {
                      setNewName(formatDisplayName(previewImage.name).replace(/\.[^/.]+$/, "")); // Remove a extensão pra ficar só o nome puro
                      setIsRenaming(true);
                    }}
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    className="admin-btn admin-btn-icon"
                    title="Excluir Definitivamente"
                    style={{ color: 'var(--admin-danger)' }}
                    onClick={() => handleDelete(previewImage.name)}
                  >
                    {deletingId === previewImage.name ? (
                      <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                  <div style={{ width: 1, background: 'var(--admin-border)', margin: '0 4px' }} />
                  <button
                    className="admin-btn admin-btn-icon"
                    title="Copiar Link Original"
                    onClick={() => copyUrl(previewImage.url)}
                  >
                    <Copy size={16} />
                  </button>
                  <button
                    className="admin-btn admin-btn-icon"
                    title="Link Direto da Imagem"
                    onClick={() => window.open(previewImage.url, '_blank')}
                  >
                    <ExternalLink size={16} />
                  </button>
                  <button
                    className="admin-btn admin-btn-icon"
                    onClick={() => {
                      setPreviewImage(null);
                      setIsRenaming(false);
                    }}
                    style={{ border: '1px solid var(--admin-border)', background: 'var(--admin-surface)' }}
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Image */}
            <div
              style={{
                flex: 1,
                overflow: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '32px 24px',
                background: 'var(--admin-surface)', 
                backgroundImage: 'repeating-linear-gradient(45deg, var(--admin-border) 25%, transparent 25%, transparent 75%, var(--admin-border) 75%, var(--admin-border)), repeating-linear-gradient(45deg, var(--admin-border) 25%, var(--admin-surface) 25%, var(--admin-surface) 75%, var(--admin-border) 75%, var(--admin-border))',
                backgroundPosition: '0 0, 10px 10px',
                backgroundSize: '20px 20px'
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewImage.url}
                alt={formatDisplayName(previewImage.name)}
                style={{
                  maxWidth: '100%',
                  maxHeight: '65vh',
                  borderRadius: 'var(--admin-radius-md)',
                  objectFit: 'contain',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                }}
              />
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ── Delete Confirmation Modal ─────────────── */}
      {deleteConfirm.isOpen && typeof document !== 'undefined' && createPortal(
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9950,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
        >
          {/* Backdrop */}
          <div
            onClick={() => setDeleteConfirm({ isOpen: false, name: '' })}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(13, 12, 27, 0.7)',
              backdropFilter: 'blur(8px)',
              animation: 'adminFadeIn 0.2s ease forwards',
            }}
          />
          {/* Modal Container */}
          <div
            className="admin-animate-in"
            style={{
               position: 'relative',
               zIndex: 9960,
               background: 'var(--admin-surface)',
               borderRadius: 'var(--admin-radius-2xl)',
               padding: '36px 32px',
               maxWidth: 420,
               width: '100%',
               boxShadow: 'var(--admin-shadow-glass), 0 25px 50px -12px rgba(0, 0, 0, 0.5)',
               textAlign: 'center',
            }}
          >
            <div style={{
              width: 72, height: 72, borderRadius: '50%', background: 'var(--admin-danger-bg)', 
              color: 'var(--admin-danger)', display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 24px',
              border: '1px solid rgba(239, 68, 68, 0.2)'
            }}>
              <Trash2 size={36} />
            </div>
            
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--admin-text-primary)', marginBottom: 12 }}>
              Excluir Arquivo?
            </h3>
            
            <p style={{ color: 'var(--admin-text-secondary)', fontSize: '0.95rem', marginBottom: 32, lineHeight: 1.6 }}>
              Tem certeza de que deseja apagar a imagem <br/>
              <strong style={{ color: 'var(--admin-text-primary)' }}>{formatDisplayName(deleteConfirm.name)}</strong>?<br/><br/>
              Esta ação <span style={{ color: 'var(--admin-danger)', fontWeight: 600 }}>não poderá ser desfeita</span>.
            </p>
            
            <div style={{ display: 'flex', gap: 14 }}>
              <button
                className="admin-btn"
                onClick={() => setDeleteConfirm({ isOpen: false, name: '' })}
                style={{ 
                  flex: 1, 
                  padding: '12px 0', 
                  border: '1px solid #cbd5e1', 
                  backgroundColor: '#f8fafc', 
                  color: '#334155', 
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  borderRadius: '8px'
                }}
              >
                Cancelar
              </button>
              <button
                className="admin-btn"
                onClick={confirmDelete}
                style={{ 
                  flex: 1, 
                  padding: '12px 0', 
                  backgroundColor: '#ef4444', 
                  color: '#ffffff', 
                  border: 'none', 
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.4)'
                }}
              >
                Sim, excluir
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
