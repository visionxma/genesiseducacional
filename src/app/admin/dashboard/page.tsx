'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  Tag,
  Eye,
  Users,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Plus,
  Zap,
  BarChart3,
  Clock,
  ExternalLink,
  Newspaper,
  Upload,
  Sparkles,
} from 'lucide-react';

/**
 * Dashboard Central — Visão Geral Premium
 * KPIs Animados • Mini Charts • Activity Feed • Quick Actions
 * Instituto Gênesis
 */

interface Stat {
  label: string;
  value: string;
  icon: any;
  trend: string;
  trendDir: 'up' | 'down' | 'neutral';
  colorClass: string;
  progress: number;
}

const stats: Stat[] = [
  {
    label: 'Total de Posts',
    value: '24',
    icon: FileText,
    trend: '+8%',
    trendDir: 'up',
    colorClass: 'primary',
    progress: 65,
  },
  {
    label: 'Categorias Ativas',
    value: '12',
    icon: Tag,
    trend: 'Sincronizado',
    trendDir: 'neutral',
    colorClass: 'success',
    progress: 80,
  },
  {
    label: 'Visualizações',
    value: '45.2k',
    icon: Eye,
    trend: '+12%',
    trendDir: 'up',
    colorClass: 'warning',
    progress: 72,
  },
  {
    label: 'Leads Capturados',
    value: '1,240',
    icon: Users,
    trend: '+5%',
    trendDir: 'up',
    colorClass: 'info',
    progress: 55,
  },
];

const recentActions = [
  {
    type: 'Postagem',
    title: 'Educação Popular no Maranhão',
    date: 'Hoje, 14:20',
    status: 'Publicado',
    statusClass: 'published',
    dotClass: 'primary',
  },
  {
    type: 'Categoria',
    title: 'Sementes Crioulas',
    date: 'Ontem, 09:12',
    status: 'Criado',
    statusClass: 'created',
    dotClass: 'success',
  },
  {
    type: 'Mídia',
    title: 'hero-banner.jpg',
    date: 'Há 2 dias',
    status: 'Upload',
    statusClass: 'upload',
    dotClass: 'warning',
  },
  {
    type: 'Postagem',
    title: 'Agricultura Regenerativa: Novas Práticas',
    date: 'Há 3 dias',
    status: 'Publicado',
    statusClass: 'published',
    dotClass: 'primary',
  },
  {
    type: 'Categoria',
    title: 'Comunidades Tradicionais',
    date: 'Há 4 dias',
    status: 'Criado',
    statusClass: 'created',
    dotClass: 'success',
  },
];

const recentPosts = [
  {
    title: 'Educação Popular no Maranhão',
    category: 'Educação',
    date: '27 Mar 2026',
    status: 'published',
  },
  {
    title: 'Agricultura Regenerativa: Novas Práticas',
    category: 'Agricultura',
    date: '24 Mar 2026',
    status: 'published',
  },
  {
    title: 'Projeto: Empoderamento Quilombola',
    category: 'Social',
    date: '22 Mar 2026',
    status: 'draft',
  },
];

// Mini bar chart data (last 7 days)
const chartData = [35, 55, 28, 72, 48, 85, 62];
const maxChart = Math.max(...chartData);

export default function DashboardOverview() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* ── KPI Stat Cards ─────────────────────── */}
      <section className="stats-grid">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`stat-card admin-animate-in-delay-${index + 1}`}
            >
              <div className="stat-card-header">
                <div className={`stat-card-icon ${stat.colorClass}`}>
                  <Icon size={22} strokeWidth={2} />
                </div>
                <span className={`stat-card-badge ${stat.trendDir}`}>
                  {stat.trendDir === 'up' ? (
                    <TrendingUp size={12} />
                  ) : stat.trendDir === 'down' ? (
                    <TrendingDown size={12} />
                  ) : null}
                  {stat.trend}
                </span>
              </div>
              <div className="stat-card-label">{stat.label}</div>
              <div className="stat-card-value">{stat.value}</div>
              <div className="stat-card-progress">
                <div
                  className={`stat-card-progress-bar ${stat.colorClass}`}
                  style={{ width: mounted ? `${stat.progress}%` : '0%' }}
                />
              </div>
            </div>
          );
        })}
      </section>

      {/* ── Main Content Grid ──────────────────── */}
      <div className="content-grid cols-2">
        {/* LEFT: Recent Activity Feed */}
        <div className="glass-card admin-animate-in-delay-2">
          <div className="glass-card-header">
            <div className="glass-card-title">
              <div className="glass-card-title-icon">
                <Clock size={16} strokeWidth={2.2} />
              </div>
              Atividades Recentes
            </div>
            <Link href="/admin/dashboard/posts" className="glass-card-action">
              Ver todas <ArrowRight size={14} />
            </Link>
          </div>
          <div className="glass-card-body">
            <div className="activity-feed">
              {recentActions.map((action) => (
                <div key={action.title} className="activity-item">
                  <div className={`activity-dot ${action.dotClass}`} />
                  <div className="activity-content">
                    <div className="activity-title">{action.title}</div>
                    <div className="activity-meta">
                      {action.type} • {action.date}
                    </div>
                  </div>
                  <span className={`activity-status ${action.statusClass}`}>
                    {action.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Quick Actions (Dark Panel) */}
        <div className="quick-actions-panel admin-animate-in-delay-3">
          <div className="quick-actions-title">
            <Zap size={18} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 6 }} />
            Ações de Produção
          </div>
          <p className="quick-actions-desc">
            Otimize seu fluxo de trabalho publicando conteúdo direto para o portal do Instituto Gênesis.
          </p>
          <div className="quick-actions-list">
            <Link href="/admin/dashboard/posts" className="quick-action-btn primary">
              <Plus size={18} />
              Nova Postagem
            </Link>
            <Link href="/admin/dashboard/categories" className="quick-action-btn ghost">
              <Tag size={18} />
              Gerenciar Categorias
            </Link>
            <Link href="/admin/dashboard/media" className="quick-action-btn ghost">
              <Upload size={18} />
              Upload de Mídia
            </Link>
            <Link href="/admin/dashboard/analytics" className="quick-action-btn ghost">
              <BarChart3 size={18} />
              Relatório de Analytics
            </Link>
          </div>
        </div>
      </div>

      {/* ── Second Row ─────────────────────────── */}
      <div className="content-grid cols-equal">
        {/* LEFT: Mini Chart (Weekly Views) */}
        <div className="glass-card admin-animate-in-delay-3">
          <div className="glass-card-header">
            <div className="glass-card-title">
              <div className="glass-card-title-icon">
                <BarChart3 size={16} strokeWidth={2.2} />
              </div>
              Tráfego Semanal
            </div>
            <Link href="/admin/dashboard/analytics" className="glass-card-action">
              Detalhes <ArrowRight size={14} />
            </Link>
          </div>
          <div className="glass-card-body">
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 20 }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>
                6,482
              </span>
              <span className="stat-card-badge up" style={{ fontSize: '0.72rem' }}>
                <TrendingUp size={12} />
                +14.2%
              </span>
            </div>
            <div className="mini-chart">
              {chartData.map((val, i) => (
                <div
                  key={i}
                  className={`mini-chart-bar ${i === chartData.length - 2 ? 'active' : ''}`}
                  style={{
                    height: mounted ? `${(val / maxChart) * 100}%` : '0%',
                    transitionDelay: `${i * 0.08}s`,
                  }}
                />
              ))}
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: 8,
                fontSize: '0.68rem',
                color: 'var(--admin-text-tertiary)',
                fontWeight: 500,
              }}
            >
              {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day) => (
                <span key={day}>{day}</span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Recent Posts */}
        <div className="glass-card admin-animate-in-delay-4">
          <div className="glass-card-header">
            <div className="glass-card-title">
              <div className="glass-card-title-icon">
                <Newspaper size={16} strokeWidth={2.2} />
              </div>
              Publicações Recentes
            </div>
            <Link href="/admin/dashboard/posts" className="glass-card-action">
              Todas <ArrowRight size={14} />
            </Link>
          </div>
          <div className="glass-card-body">
            <div className="recent-posts-list">
              {recentPosts.map((post) => (
                <div key={post.title} className="recent-post-item">
                  <div className="recent-post-thumb">
                    <FileText size={20} />
                  </div>
                  <div className="recent-post-info">
                    <div className="recent-post-title">{post.title}</div>
                    <div className="recent-post-meta">
                      {post.category} • {post.date}
                    </div>
                  </div>
                  <span className={`recent-post-status ${post.status}`}>
                    {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Performance Overview Row ───────────── */}
      <div className="glass-card admin-animate-in-delay-4" style={{ marginBottom: 20 }}>
        <div className="glass-card-header">
          <div className="glass-card-title">
            <div className="glass-card-title-icon">
              <Sparkles size={16} strokeWidth={2.2} />
            </div>
            Desempenho do Portal
          </div>
        </div>
        <div className="glass-card-body">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 24,
            }}
          >
            {[
              { label: 'Taxa de Conversão', value: '3.8%', color: 'var(--admin-primary)', percent: 38 },
              { label: 'Tempo no Site', value: '4m 32s', color: 'var(--admin-success)', percent: 68 },
              { label: 'Taxa de Rejeição', value: '24%', color: 'var(--admin-warning)', percent: 24 },
              { label: 'Páginas/Sessão', value: '5.2', color: 'var(--admin-info)', percent: 52 },
            ].map((metric) => (
              <div key={metric.label} style={{ textAlign: 'center' }}>
                {/* Circular Progress Indicator */}
                <div style={{ position: 'relative', display: 'inline-flex', marginBottom: 12 }}>
                  <svg width="80" height="80" viewBox="0 0 80 80">
                    <circle
                      cx="40"
                      cy="40"
                      r="34"
                      fill="none"
                      stroke="var(--admin-border)"
                      strokeWidth="6"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r="34"
                      fill="none"
                      stroke={metric.color}
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 34}`}
                      strokeDashoffset={
                        mounted
                          ? `${2 * Math.PI * 34 * (1 - metric.percent / 100)}`
                          : `${2 * Math.PI * 34}`
                      }
                      transform="rotate(-90 40 40)"
                      style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.3s' }}
                    />
                  </svg>
                  <span
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      fontWeight: 800,
                      fontSize: '0.95rem',
                      fontFamily: 'Outfit, sans-serif',
                    }}
                  >
                    {metric.value}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: 'var(--admin-text-secondary)',
                  }}
                >
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
