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
    <main className="bg-dark" style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0D0C1B'}}>
      <div style={{width: '100%', maxWidth: '450px', backgroundColor: '#131224', padding: '40px', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid #1f1e36', color: '#fff'}}>
        <div style={{textAlign: 'center', marginBottom: '30px'}}>
          <h1 style={{fontSize: '2rem', color: '#fff', marginBottom: '10px'}}>Gênesis Admin</h1>
          <p style={{color: '#737373'}}>Acesse a plataforma de gestão de conteúdos do instituto.</p>
        </div>

        <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <label htmlFor="email" style={{fontSize: '0.9rem', color: '#ccc'}}>Email</label>
            <input 
              type="email" 
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@genesis.org.br"
              required
              style={{padding: '12px 16px', borderRadius: '8px', border: '1px solid #2A3EF3', backgroundColor: '#0D0C1B', color: '#fff', outline: 'none'}}
            />
          </div>

          <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <label htmlFor="password" style={{fontSize: '0.9rem', color: '#ccc'}}>Senha</label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ width: '100%', padding: '12px 16px', paddingRight: '46px', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#0D0C1B', color: '#fff', outline: 'none' }}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', padding: '4px', opacity: 0.6 }}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            style={{ width: '100%', marginTop: '10px', fontSize: '1.1rem', backgroundColor: '#2A3EF3', color: '#fff', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Autenticando...' : 'Autenticar via Supabase'}
          </button>
        </form>

        <p style={{textAlign: 'center', marginTop: '20px', color: '#737373', fontSize: '0.85rem'}}>
          Painel de integração CMS - Versão 1.2
        </p>
      </div>
    </main>
  );
}
