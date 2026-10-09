import { Link } from "@tanstack/react-router";

export const WHATSAPP = "916374392488";
export const waLink = (msg: string) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="font-display text-xl uppercase tracking-tight md:text-2xl">
          Chenkai<span className="text-primary">.</span>Food
        </Link>
        <nav className="flex items-center gap-4 text-sm font-semibold uppercase md:gap-8">
          <Link to="/" className="hidden sm:inline hover:text-primary">Home</Link>
          <Link to="/products" className="hover:text-primary">Products</Link>
          <a
            href={waLink("Hi Chenkai Food, I'd like to place an order.")}
            target="_blank"
            rel="noreferrer"
            className="bg-primary px-4 py-2 text-primary-foreground hover:bg-foreground"
          >
            Book now
          </a>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="relative z-20 bg-foreground px-4 py-16 text-background md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <p className="font-display text-5xl uppercase leading-none md:text-7xl">
          Chenkai<span className="text-primary">.</span>
        </p>
        <div className="text-sm opacity-80">
          <p>Small-batch pickles & preserves.</p>
          <p className="mt-2">Orders on WhatsApp: +91 63743 92488</p>
        </div>
        <p className="text-sm opacity-60 md:text-right">© {new Date().getFullYear()} Chenkai Food</p>
      </div>
    </footer>
  );
}
