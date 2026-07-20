import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./demos/demo.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") ?? incoming.get("host") ?? "localhost:3000";
  const protocol = incoming.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);

  return {
    metadataBase: base,
    title: "João Monteiro",
    description: "Portfólio de João Pedro Monteiro Quintas — Product Owner de produtos digitais B2B, integrações via API e operações.",
    icons: {
      icon: [{ url: "/joao-pedro-favicon-large-v4.png", sizes: "500x500", type: "image/png" }],
      shortcut: "/joao-pedro-favicon-large-v4.png",
      apple: [{ url: "/joao-pedro-favicon-large-v4.png", sizes: "500x500", type: "image/png" }],
    },
    openGraph: {
      title: "João Pedro Monteiro Quintas | Product Owner",
      description: "Estratégia, contexto de negócio e colaboração técnica para transformar operações complexas em produtos claros.",
      type: "website",
      locale: "pt_BR",
      images: [{ url: new URL("/og.png", base).toString(), width: 1733, height: 910, alt: "João Pedro Monteiro Quintas — Product Owner" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "João Pedro Monteiro Quintas | Product Owner",
      description: "Produtos digitais B2B, integrações via API e operações.",
      images: [new URL("/og.png", base).toString()],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
