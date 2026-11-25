import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  ),
  title: "Leonardo Boury | Dev.Portfolio",
  description:
    "Portfólio de Leonardo Boury, desenvolvedor web — projetos, habilidades e contato. Construído com Next.js, TypeScript e Tailwind CSS.",
  keywords: [
    "Leonardo Boury",
    "portfólio",
    "desenvolvedor web",
    "front-end",
    "Next.js",
    "React",
    "projetos",
  ],
  authors: [{ name: "Leonardo Boury" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Leonardo Boury | Dev.Portfolio",
    description:
      "Portfólio de Leonardo Boury, desenvolvedor web — projetos, habilidades e contato.",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/profile.jpg",
        width: 640,
        height: 640,
        alt: "Leonardo Boury",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrains.variable} font-sans antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
