import "./globals.css";
import Link from "next/link";
import { Sora, Inter } from "next/font/google";
import AuthNav from "@/components/AuthNav";

const display = Sora({ subsets: ["latin"], weight: ["500", "600", "700", "800"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body" });

export const metadata = {
  title: "Personova — Discover the Character Inside You",
  description:
    "A free, interactive 3D personality explorer. Map yourself to one of 16 low-poly characters and unlock a full life report: careers, education, finance, and relationships.",
};

function Nav() {
  return (
    <header className="nav">
      <div className="container nav__inner">
        <Link href="/" className="brand">
          <span className="brand__dot">◆</span> Personova
        </Link>
        <nav className="nav__links">
          <Link href="/#types">The 16 Characters</Link>
          <Link href="/compatibility">Compatibility</Link>
          <Link href="/test" className="btn btn--primary btn--sm">
            <span className="nav-cta__full">Take the Test</span>
            <span className="nav-cta__short">Test</span>
          </Link>
          <AuthNav />
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div><strong>Personova</strong> · An independent, educational personality explorer.</div>
        <div>Framework inspired by Jungian typology &amp; the Big-Five-adjacent 5-dimension model.</div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <div className="aurora" aria-hidden="true" />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
