'use client';
import { supabase } from '@/lib/supabase';
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
        .filter((f) => f.name !== '.emptyFolderPlaceholder')
        .map((f) => ({
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

  async function handleDelete(name: string) {
    if (!confirm(`Remover "${name}"?`)) return;

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

  const filteredFiles = files.filter((f) =>
    f.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* ── Notification Toast ──────────────── */}
      {notification && (
        <div
          className="admin-animate-in"
          style={{
            position: 'fixed',
            top: 90,
            right: 40,
            zIndex: 200,
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
        </div>
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
                      {file.name}
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
                          {file.name}
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
      {previewImage && (
        <>
          <div
            onClick={() => setPreviewImage(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(13, 12, 27, 0.7)',
              backdropFilter: 'blur(12px)',
              zIndex: 100,
              animation: 'adminFadeIn 0.2s ease forwards',
            }}
          />
          <div
            className="admin-animate-in"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 110,
              background: 'var(--admin-surface)',
              borderRadius: 'var(--admin-radius-2xl)',
              overflow: 'hidden',
              maxWidth: 720,
              width: '90%',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 'var(--admin-shadow-glass)',
            }}
          >
            {/* Preview Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderBottom: '1px solid var(--admin-border)',
              }}
            >
              <span
                style={{
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '60%',
                }}
              >
                {previewImage.name}
              </span>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  className="admin-btn admin-btn-icon"
                  title="Copiar URL"
                  onClick={() => copyUrl(previewImage.url)}
                >
                  <Copy size={16} />
                </button>
                <button
                  className="admin-btn admin-btn-icon"
                  title="Abrir em nova aba"
                  onClick={() => window.open(previewImage.url, '_blank')}
                >
                  <ExternalLink size={16} />
                </button>
                <button
                  className="admin-btn admin-btn-icon"
                  onClick={() => setPreviewImage(null)}
                  style={{ border: '1px solid var(--admin-border)' }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Image */}
            <div
              style={{
                flex: 1,
                overflow: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20,
                background: 'var(--admin-bg)',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewImage.url}
                alt={previewImage.name}
                style={{
                  maxWidth: '100%',
                  maxHeight: '60vh',
                  borderRadius: 'var(--admin-radius-md)',
                  objectFit: 'contain',
                }}
              />
            </div>

            {/* URL bar */}
            <div
              style={{
                padding: '12px 20px',
                borderTop: '1px solid var(--admin-border)',
                fontSize: '0.75rem',
                color: 'var(--admin-text-tertiary)',
                fontFamily: 'monospace',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {previewImage.url}
            </div>
          </div>
        </>
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
