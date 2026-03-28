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
        {children}
      </body>
    </html>
  );
}
