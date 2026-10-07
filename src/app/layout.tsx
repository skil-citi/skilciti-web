import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Outfit, Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { CursorGlow } from "@/components/layout/cursor-glow";
import { Navbar } from "@/components/layout/navbar";
import { Providers } from "@/components/layout/providers";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { site } from "@/lib/content";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const title = "Skilciti — Software & Systems, Engineered to Scale";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: "%s | Skilciti" },
  description: site.description,
  applicationName: "Skilciti",
  keywords: [
    "software development Kenya",
    "mobile app development Nairobi",
    "web app development",
    "custom software",
    "UI/UX design",
    "systems consulting",
    "digital registry systems",
    "government management systems",
    "Skilciti",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Skilciti",
    title,
    description: site.description,
    url: "/",
    locale: "en_KE",
  },
  twitter: { card: "summary_large_image", title, description: site.description },
};

export const viewport: Viewport = {
  themeColor: "#040b0c",
  colorScheme: "dark light",
};

// Runs before first paint so the saved theme never flashes. Dark is the brand default.
const themeScript = `(function(){try{var t=localStorage.getItem("skilciti-theme");document.documentElement.setAttribute("data-theme",t==="light"?"light":"dark")}catch(e){}})()`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  description: site.description,
  address: { "@type": "PostalAddress", addressLocality: "Nairobi", addressCountry: "KE" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${outfit.variable} ${jakarta.variable} ${jetbrains.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="relative flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-[80] rounded-full bg-brand px-5 py-2 font-semibold text-on-brand focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <Providers>
          <ScrollProgress />
          <CursorGlow />
          <Navbar />
          <main id="main" className="relative z-10 flex-1">
            {children}
          </main>
          <Footer />
        </Providers>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
