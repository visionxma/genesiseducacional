'use client';
import { BarChart3, TrendingUp, Calendar, ArrowLeft, Download, Eye, Users, MousePointer2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Dados mockados para demonstração do gráfico completo
  const monthlyData = [
    { month: 'Jan', views: 12500, users: 3200 },
    { month: 'Fev', views: 18200, users: 4100 },
    { month: 'Mar', views: 25400, users: 6500 },
    { month: 'Abr', views: 22100, users: 5800 },
    { month: 'Mai', views: 31000, users: 8900 },
    { month: 'Jun', views: 38500, users: 11200 },
    { month: 'Jul', views: 45200, users: 14500 },
  ];

  const maxViews = Math.max(...monthlyData.map(d => d.views));

  return (
    <div className="admin-animate-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header de Ações */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/admin/dashboard" className="admin-btn admin-btn-ghost" style={{ padding: '8px 16px' }}>
          <ArrowLeft size={16} />
          Voltar ao Dashboard
        </Link>
        
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="admin-btn" style={{ background: 'var(--admin-surface)', border: '1px solid var(--admin-border)', color: 'var(--admin-text-primary)' }}>
            <Calendar size={16} />
            Este Ano
          </button>
          <button className="admin-btn admin-btn-primary">
            <Download size={16} />
            Exportar Relatório
          </button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="content-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        {[
          { label: 'Total Visualizações', value: '192.9k', trend: '+24%', icon: Eye, color: 'var(--admin-primary)' },
          { label: 'Visitantes Únicos', value: '54.2k', trend: '+18%', icon: Users, color: 'var(--admin-success)' },
          { label: 'Taxa de Rejeição', value: '28.4%', trend: '-2.1%', icon: MousePointer2, color: 'var(--admin-warning)' },
          { label: 'Tempo Médio', value: '4m 12s', trend: '+15s', icon: TrendingUp, color: 'var(--admin-info)' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className={`glass-card admin-animate-in-delay-${i + 1}`} style={{ padding: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <div style={{ 
                  width: 40, height: 40, borderRadius: 'var(--admin-radius-md)', 
                  background: `${stat.color}15`, color: stat.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Icon size={20} strokeWidth={2.5} />
                </div>
                <div className="stat-card-badge up" style={{ fontSize: '0.75rem' }}>
                  <TrendingUp size={12} /> {stat.trend}
                </div>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--admin-text-secondary)', fontWeight: 600, marginBottom: 4 }}>
                {stat.label}
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--admin-text-primary)', fontFamily: 'Outfit, sans-serif' }}>
                {stat.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Gráfico Principal Expansivo */}
      <div className="glass-card admin-animate-in-delay-3" style={{ padding: 24, minHeight: 400 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 30 }}>
          <BarChart3 size={20} color="var(--admin-primary)" />
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--admin-text-primary)' }}>Evolução de Acesso (Visão Anual)</h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 280, paddingBottom: 20, borderBottom: '1px solid var(--admin-border)' }}>
          {monthlyData.map((data, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, height: '100%', justifyContent: 'flex-end' }}>
              <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'flex-end' }}>
                {/* Views Bar */}
                <div 
                  style={{ 
                    width: '40%', 
                    background: 'var(--admin-primary)', 
                    borderRadius: '4px 4px 0 0',
                    height: mounted ? `${(data.views / maxViews) * 100}%` : '0%',
                    transition: 'height 1s cubic-bezier(0.22, 1, 0.36, 1)',
                    transitionDelay: `${i * 0.1}s`,
                    minHeight: 10
                  }} 
                />
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--admin-text-secondary)' }}>{data.month}</span>
            </div>
          ))}
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: 'var(--admin-text-secondary)' }}>
            <span style={{ width: 12, height: 12, borderRadius: 2, background: 'var(--admin-primary)' }}></span> Visualizações Totais
          </div>
        </div>
      </div>

    </div>
  );
}
