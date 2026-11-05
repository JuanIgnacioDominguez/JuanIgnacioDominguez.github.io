import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { LangProvider } from "@/components/site/LangProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const serif = Instrument_Serif({ variable: "--font-instrument", subsets: ["latin"], weight: "400", style: ["normal", "italic"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const siteUrl = "https://juanignaciodominguez.github.io";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Juan Ignacio Dominguez — Full-Stack Developer",
  description:
    "Portfolio de Juan Ignacio Dominguez, desarrollador full-stack y estudiante de Ingeniería en Informática (UADE). React, Next.js, React Native y Spring Boot.",
  authors: [{ name: "Juan Ignacio Dominguez" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Juan Ignacio Dominguez — Full-Stack Developer",
    description: "React, Next.js, React Native y Spring Boot. Proyectos, stack y contacto.",
    images: [{ url: "/projects/coal/coal-1.png", width: 2560, height: 1279 }],
    locale: "es_AR",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`dark ${geist.variable} ${serif.variable} ${geistMono.variable}`}>
      <body className="grain min-h-dvh">
        <LangProvider>
          <TooltipProvider delayDuration={150}>{children}</TooltipProvider>
        </LangProvider>
      </body>
    </html>
  );
}
