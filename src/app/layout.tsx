import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Instituto Gênesis | Educação e Transformação",
  description: "Formação, inovação e desenvolvimento social para comunidades do Maranhão e Pará. Gênese é criação. Educação é inteligência. Ciência é base.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <header style={{backgroundColor: 'var(--color-white)', padding: '20px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', position: 'sticky', top: 0, zIndex: 100}}>
          <Link href="/">
            <div style={{fontWeight: 800, color: 'var(--color-primary)', fontSize: '1.5rem', fontFamily: 'var(--font-poppins)'}}>GÊNESIS</div>
          </Link>
          <nav style={{display: 'flex', gap: '20px', fontWeight: 500, fontFamily: 'var(--font-inter)'}}>
            <Link href="/">Início</Link>
            <Link href="/cursos">Cursos</Link>
            <Link href="/graduacao">Graduação/Pós</Link>
            <Link href="/tecnicos">Técnicos</Link>
            <Link href="/consultoria">Consultoria</Link>
            <Link href="/blog">Blog</Link>
          </nav>
          <Link href="/admin">
            <button className="btn-primary" style={{padding: '8px 16px'}}>Área Restrita</button>
          </Link>
        </header>

        {children}

        <footer style={{backgroundColor: 'var(--color-secondary)', color: 'var(--color-white)', padding: '40px 5% 28px', textAlign: 'center'}}>
          <div style={{maxWidth: '640px', margin: '0 auto'}}>
            <div style={{marginBottom: '24px'}}>
              <h3 style={{fontSize: '1.5rem', marginBottom: '8px'}}>Instituto Gênesis de Educação</h3>
              <p style={{opacity: 0.7}}>Comunidades Quilombolas • Agricultura Familiar • Maranhão e Pará</p>
            </div>
            <div style={{opacity: 0.5, fontSize: '0.875rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px'}}>
              &copy; {new Date().getFullYear()} Instituto Gênesis. Todos os direitos reservados.
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
