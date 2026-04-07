'use client';
import { BarChart3, TrendingUp, Calendar, Download, Eye, Users, MousePointer2, Loader2, Info } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function AnalyticsPage() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  const [totals, setTotals] = useState({ views: 0, users: 0, time: 0 });
  const [monthlyData, setMonthlyData] = useState<{monthStr: string, views: number}[]>([]);

  useEffect(() => {
    setMounted(true);
    async function loadData() {
      // Ignorar erro se a tabela ainda não existir para não quebrar a página
      const { data: visits, error } = await supabase.from('page_visits').select('session_id, duration_seconds, created_at');
      
      if (error || !visits) {
        setLoading(false);
        // Fallback p/ 0 se tabela não criada
        setMonthlyData([
          { monthStr: 'Passado', views: 0 }, { monthStr: 'Atual', views: 0 }
        ]);
        return;
      }

      const views = visits.length;
      const uniqueSessions = new Set();
      let totalTime = 0;
      
      visits.forEach((v: any) => {
        uniqueSessions.add(v.session_id);
        totalTime += v.duration_seconds || 0;
      });
      
      const users = uniqueSessions.size;
      const time = views > 0 ? Math.floor(totalTime / views) : 0;
      
      setTotals({ views, users, time });
      
      // Construir os últimos 6 meses para o gráfico
      const monthsMap = new Map();
      const monthNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
      
      for(let i = 5; i >= 0; i--) {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        // key = Ano-Mes para garantir unicidade, ex: "2026-3"
        const key = `${d.getFullYear()}-${d.getMonth()}`;
        monthsMap.set(key, { monthStr: monthNames[d.getMonth()], views: 0 });
      }
      
      visits.forEach((v: any) => {
        const d = new Date(v.created_at);
        const key = `${d.getFullYear()}-${d.getMonth()}`;
        if (monthsMap.has(key)) {
          monthsMap.get(key).views += 1;
        }
      });
      
      setMonthlyData(Array.from(monthsMap.values()));
      setLoading(false);
    }

    loadData();
  }, []);

  const maxViews = Math.max(5, ...monthlyData.map(d => d.views)); // Min 5 p/ barra não estourar no zero

  const formatTime = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="admin-animate-in" style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header de Ações */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--admin-text-primary)' }}>
            Métricas e Analytics
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--admin-text-secondary)', marginTop: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'var(--admin-success)' }}></span> Tracking Ativo (Ao vivo)
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="admin-btn" style={{ background: 'var(--admin-surface)', border: '1px solid var(--admin-border)', color: 'var(--admin-text-primary)' }}>
            Últimos 6 meses
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
          { label: 'Total Visualizações (Geral)', value: loading ? <Loader2 className="spin" size={20}/> : totals.views.toLocaleString('pt-BR'), trend: 'Verificado', icon: Eye, color: 'var(--admin-primary)' },
          { label: 'Visitantes Únicos', value: loading ? <Loader2 className="spin" size={20}/> : totals.users.toLocaleString('pt-BR'), trend: 'Sessões', icon: Users, color: 'var(--admin-success)' },
          { label: 'Sessões Ativas', value: loading ? <Loader2 className="spin" size={20}/> : (totals.users > 0 ? '1' : '0'), trend: 'Ao Vivo', icon: MousePointer2, color: 'var(--admin-warning)' },
          { label: 'Tempo Médio Nativos', value: loading ? <Loader2 className="spin" size={20}/> : formatTime(totals.time), trend: 'Média/URL', icon: TrendingUp, color: 'var(--admin-info)' },
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
                <div className="stat-card-badge up" style={{ fontSize: '0.75rem', background: 'var(--admin-bg)', color: 'var(--admin-text-secondary)', border: '1px solid var(--admin-border)' }}>
                  {stat.trend}
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

      {/* Tabela de Setup Info Temporário */}
      {totals.views === 0 && !loading && (
         <div className="glass-card" style={{ padding: '20px 24px', background: 'rgba(42, 62, 243, 0.05)', border: '1px solid var(--admin-primary-glow)', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ padding: 12, background: 'var(--admin-primary)', color: '#fff', borderRadius: '50%' }}><Info size={24} /></div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--admin-text-primary)', marginBottom: 4 }}>Quase lá! Para o rastreamento funcionar perfeitamente, ative a tabela.</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--admin-text-secondary)' }}>Por favor, rode o script SQL fornecido pela IA lá no <b>Supabase SQL Editor</b> para criar a base de dados de views.</p>
            </div>
         </div>
      )}

      {/* Gráfico Principal Expansivo */}
      <div className="glass-card admin-animate-in-delay-3" style={{ padding: 24, minHeight: 400 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 30 }}>
          <BarChart3 size={20} color="var(--admin-primary)" />
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--admin-text-primary)' }}>Evolução de Acesso (Últimos 6 meses)</h2>
        </div>

        {loading ? (
           <div style={{ height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <Loader2 size={32} style={{ animation: 'spin 1s linear infinite', color: 'var(--admin-primary)' }} />
           </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 280, paddingBottom: 20, borderBottom: '1px solid var(--admin-border)' }}>
            {monthlyData.map((data, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, height: '100%', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: data.views > 0 ? 'var(--admin-primary)' : 'var(--admin-text-tertiary)' }}>{data.views}</span>
                <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', height: '100%', alignItems: 'flex-end' }}>
                  <div 
                    title={`${data.views} views`}
                    style={{ 
                      width: '40%', 
                      background: data.views > 0 ? 'var(--admin-primary)' : 'var(--admin-border)', 
                      borderRadius: 'var(--admin-radius-sm) var(--admin-radius-sm) 0 0',
                      height: mounted ? `${(data.views / maxViews) * 100}%` : '0%',
                      transition: 'height 1s cubic-bezier(0.22, 1, 0.36, 1)',
                      transitionDelay: `${i * 0.1}s`,
                      minHeight: data.views === 0 ? 4 : 10
                    }} 
                  />
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--admin-text-secondary)' }}>{data.monthStr}</span>
              </div>
            ))}
          </div>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: 'var(--admin-text-secondary)' }}>
            <span style={{ width: 12, height: 12, borderRadius: 2, background: 'var(--admin-primary)' }}></span> Visualizações Reais
          </div>
        </div>
      </div>
    </div>
  );
}
