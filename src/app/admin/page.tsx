'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

/**
 * Área Administrativa Protegida - Instituto Gênesis
 * Implementação Real de Autenticação via Supabase
 */

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      alert("Por favor, preencha todos os campos.");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert("Erro na autenticação: " + error.message);
      } else if (data.user) {
        alert("Sucesso! Bem-vindo ao painel Gênesis.");
        window.location.href = '/admin/dashboard'; // Redireciona para o dashboard
      }
    } catch (err: any) {
      alert("Erro inesperado: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: 'var(--site-bg)',
      backgroundImage: "url('/texture.svg')",
      backgroundSize: '300px'
    }}>
      <div style={{
        width: '100%', 
        maxWidth: '440px', 
        backgroundColor: 'var(--site-surface)', 
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        padding: '60px 40px', 
        borderRadius: 0, 
        border: '1px solid var(--site-border)',
        boxShadow: 'var(--site-shadow-glass)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Accent Bar */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'var(--site-primary)' }} />

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ 
            fontSize: '0.75rem', 
            fontWeight: 800, 
            letterSpacing: '0.2em', 
            color: 'var(--site-primary)', 
            textTransform: 'uppercase', 
            marginBottom: 16 
          }}>
            Acesso Restrito
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--site-text-primary)', marginBottom: '8px', letterSpacing: '-0.02em' }}>
            Gênesis <span style={{ color: 'var(--site-primary)' }}>Admin</span>
          </h1>
          <p style={{ color: 'var(--site-text-secondary)', fontSize: '0.95rem' }}>
            Gerencie o conteúdo institucional com precisão.
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="email" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--site-text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Identificador (Email)
            </label>
            <input 
              type="email" 
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@genesis.org.br"
              required
              style={{ 
                padding: '14px 16px', 
                borderRadius: 0, 
                border: '1px solid var(--site-border)', 
                backgroundColor: 'white', 
                color: 'var(--site-text-primary)', 
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={e => e.currentTarget.style.borderColor = 'var(--site-primary)'}
              onBlur={e => e.currentTarget.style.borderColor = 'var(--site-border)'}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="password" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--site-text-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Senha Segura
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ 
                  width: '100%', 
                  padding: '14px 16px', 
                  paddingRight: '46px', 
                  borderRadius: 0, 
                  border: '1px solid var(--site-border)', 
                  backgroundColor: 'white', 
                  color: 'var(--site-text-primary)', 
                  fontSize: '1rem',
                  outline: 'none' 
                }}
                onFocus={e => e.currentTarget.style.borderColor = 'var(--site-primary)'}
                onBlur={e => e.currentTarget.style.borderColor = 'var(--site-border)'}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '4px', opacity: 0.5 }}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary"
            style={{ 
              width: '100%', 
              marginTop: '10px', 
              fontSize: '1rem', 
              padding: '16px', 
              borderRadius: 0,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Autenticando...' : 'Entrar no Sistema'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '32px', color: 'var(--site-text-tertiary)', fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Plataforma Gênesis — v1.5
        </p>
      </div>
    </main>
  );
}
