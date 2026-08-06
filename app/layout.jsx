import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Persona Atlas — Discover Your Personality Type",
  description:
    "A free, dynamic 16-type personality explorer with an animated result and a full life report: careers, education, finance, and relationships.",
};

function Nav() {
  return (
    <header className="nav">
      <div className="container nav__inner">
        <Link href="/" className="brand">
          <span className="brand__dot">🧭</span> Persona Atlas
        </Link>
        <nav className="nav__links">
          <Link href="/#types">The 16 Types</Link>
          <Link href="/#how">How it works</Link>
          <Link href="/test" className="btn btn--primary" style={{ padding: "10px 20px", fontSize: 14 }}>
            Take the Test
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <strong>Persona Atlas</strong> · An independent, educational personality explorer.
        </div>
        <div>
          Framework inspired by Jungian typology & the Big-Five-adjacent 5-dimension model.
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
