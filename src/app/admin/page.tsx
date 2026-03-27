export const metadata = {
  title: 'Admin Área Protegida | Instituto Gênesis',
};

export default function AdminLogin() {
  return (
    <main className="bg-dark" style={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{width: '100%', maxWidth: '450px', backgroundColor: '#131224', padding: '40px', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.5)', border: '1px solid #1f1e36', color: '#fff'}}>
        <div style={{textAlign: 'center', marginBottom: '30px'}}>
          <h1 style={{fontSize: '2rem', color: '#fff', marginBottom: '10px'}}>Gênesis Admin</h1>
          <p style={{color: 'var(--color-text-secondary)'}}>Acesse a plataforma de gestão de conteúdos do instituto.</p>
        </div>

        <form style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <label htmlFor="email" style={{fontSize: '0.9rem', color: '#ccc'}}>Email</label>
            <input 
              type="email" 
              id="email"
              placeholder="seuemail@genesis.org.br"
              style={{padding: '12px 16px', borderRadius: '8px', border: '1px solid #2A3EF3', backgroundColor: '#0D0C1B', color: '#fff', outline: 'none'}}
            />
          </div>

          <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
            <label htmlFor="password" style={{fontSize: '0.9rem', color: '#ccc'}}>Senha</label>
            <input 
              type="password" 
              id="password"
              placeholder="••••••••"
              style={{padding: '12px 16px', borderRadius: '8px', border: '1px solid #333', backgroundColor: '#0D0C1B', color: '#fff', outline: 'none'}}
            />
          </div>

          <button type="button" className="btn-primary" style={{width: '100%', marginTop: '10px', fontSize: '1.1rem'}}>
            Autenticar via Supabase
          </button>
        </form>

        <p style={{textAlign: 'center', marginTop: '20px', color: 'var(--color-text-secondary)', fontSize: '0.85rem'}}>
          Painel de integração CMS - Versão 1.0
        </p>
      </div>
    </main>
  );
}
