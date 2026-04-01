import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://genesiseducacional.com.br";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Instituto Gênesis Educacional | Cursos Técnicos, Pós-Técnico e Consultoria no Maranhão",
    template: "%s | Instituto Gênesis Educacional",
  },
  description:
    "Instituto Gênesis Educacional — cursos técnicos, pós-técnico, capacitação profissional e consultoria pedagógica para comunidades do Maranhão e Pará. Formação, inovação e desenvolvimento social desde 2013.",
  keywords: [
    "Instituto Gênesis",
    "Gênesis Educacional",
    "cursos técnicos Maranhão",
    "pós-técnico",
    "educação profissional",
    "cursos profissionalizantes",
    "consultoria pedagógica",
    "educação popular",
    "agricultura familiar",
    "agroecologia",
    "EAD Maranhão",
    "inclusão digital",
    "economia solidária",
    "desenvolvimento social",
    "comunidades quilombolas",
    "educação rural",
  ],
  authors: [{ name: "Instituto Gênesis Educacional" }],
  creator: "Instituto Gênesis Educacional",
  publisher: "Instituto Gênesis Educacional",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: "Instituto Gênesis Educacional",
    title: "Instituto Gênesis Educacional | Cursos Técnicos e Formação Profissional",
    description:
      "Cursos técnicos, pós-técnico, capacitação e consultoria pedagógica para comunidades do Maranhão e Pará. Educação que transforma desde 2013.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Instituto Gênesis Educacional — Formação, Inovação e Desenvolvimento Social",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Instituto Gênesis Educacional | Cursos Técnicos e Formação Profissional",
    description:
      "Cursos técnicos, pós-técnico, capacitação e consultoria pedagógica para comunidades do Maranhão e Pará.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.json",
  verification: {},
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Instituto Gênesis Educacional",
    url: siteUrl,
    logo: `${siteUrl}/logo.PNG`,
    description:
      "Formação, inovação e desenvolvimento social para comunidades do Maranhão e Pará desde 2013.",
    foundingDate: "2013",
    areaServed: [
      { "@type": "State", name: "Maranhão" },
      { "@type": "State", name: "Pará" },
    ],
    sameAs: [],
  };

  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0044CC" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
