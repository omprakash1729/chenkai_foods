import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X, ShieldCheck, Award, Microscope, MessageCircle, Instagram } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WHATSAPP, waLink } from "@/lib/whatsapp";
export { WHATSAPP, waLink };

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/story", label: "Our Story" },
  { to: "/contact", label: "Contact & Enquiries" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/20 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6 md:px-8">
        {/* Standalone Logo & Brand Title - Clean, Frameless Transparent Emblem */}
        <Link to="/" aria-label="Chenkai Foods Home" className="group flex items-center gap-3">
          <img
            src="/logo-transparent.png"
            alt="Chenkai Foods Logo"
            className="h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="flex flex-col">
            <span className="font-display text-2xl uppercase tracking-wider text-foreground">
              CHENKAI<span className="text-primary">.</span>FOODS
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground group-hover:text-primary transition-colors">
              The Science of Tradition
            </span>
          </div>
        </Link>

        {/* Main Desktop Nav */}
        <nav aria-label="Main navigation" className="hidden items-center gap-7 text-xs font-bold uppercase tracking-widest md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-primary border-b-2 border-primary pb-1" }}
              activeOptions={{ exact: true }}
              className="transition-colors hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Button asChild className="rounded-full shadow-lg glow-hover font-bold text-xs uppercase tracking-wider px-5">
            <a href={waLink("Hi Chenkai Foods, I'd like to place an enquiry / order.")} target="_blank" rel="noreferrer">
              <MessageCircle size={15} /> Book on WhatsApp <ArrowUpRight size={14} />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="md:hidden"
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <nav aria-label="Mobile navigation" className="flex flex-col border-t border-border/20 bg-background px-6 py-6 md:hidden shadow-2xl">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="py-3.5 text-sm font-bold uppercase tracking-wider border-b border-border/10 hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function OrderBand() {
  return (
    <section className="relative z-20 overflow-hidden bg-gradient-to-br from-red-950 via-primary to-black px-6 py-20 text-primary-foreground md:px-10 md:py-28 my-0 shadow-2xl border-t border-primary/20">
      <div className="relative z-10 mx-auto max-w-7xl flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary-foreground/80 mb-2">
            Artisanal Seafood Excellence
          </p>
          <h2 className="font-display text-4xl uppercase leading-none md:text-6xl tracking-wide">
            Taste Uncompromising<br />Seafood Purity.
          </h2>
          <p className="mt-4 max-w-xl text-sm md:text-base leading-relaxed text-primary-foreground/90">
            Wild-caught fish pickles, succulent prawn creations, and sun-cured dry fish packets. Zero artificial preservatives.
          </p>
        </div>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="h-14 rounded-full border-2 border-primary-foreground bg-primary-foreground text-primary shadow-xl hover:bg-transparent hover:text-primary-foreground font-bold tracking-wider text-xs uppercase transition-all duration-300 hover:scale-105 px-8"
        >
          <a href={waLink("Hi Chenkai Foods, I'd like to enquire about your seafood pickles and dry fish packets.")} target="_blank" rel="noreferrer">
            Enquire & Order on WhatsApp <ArrowUpRight />
          </a>
        </Button>
      </div>
    </section>
  );
}

export function TrustBadges() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
      <div className="flex items-start gap-4 p-6 bg-card border border-border/30 rounded-3xl shadow-sm hover:border-primary/40 transition-all">
        <div className="p-3 bg-primary/10 text-primary rounded-2xl shrink-0">
          <Microscope size={24} />
        </div>
        <div>
          <h4 className="font-display uppercase text-sm tracking-wide text-foreground">Food Science Formulated</h4>
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">Artisanal preservation grounded in food science precision and coastal heritage.</p>
        </div>
      </div>
      <div className="flex items-start gap-4 p-6 bg-card border border-border/30 rounded-3xl shadow-sm hover:border-primary/40 transition-all">
        <div className="p-3 bg-primary/10 text-primary rounded-2xl shrink-0">
          <ShieldCheck size={24} />
        </div>
        <div>
          <h4 className="font-display uppercase text-sm tracking-wide text-foreground">0% Artificial Preservatives</h4>
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">No synthetic colors, MSG, or chemical stabilizers. Preserved entirely with sea salt & oils.</p>
        </div>
      </div>
      <div className="flex items-start gap-4 p-6 bg-card border border-border/30 rounded-3xl shadow-sm hover:border-primary/40 transition-all">
        <div className="p-3 bg-primary/10 text-primary rounded-2xl shrink-0">
          <Award size={24} />
        </div>
        <div>
          <h4 className="font-display uppercase text-sm tracking-wide text-foreground">Wild Ocean Harvest</h4>
          <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">Single-origin hand-pounded spices & wild-caught premium seafood.</p>
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative z-30 mt-0 border-t border-white/10 bg-black text-white pt-16 pb-12 px-6 md:px-12">
      <div className="relative z-40 mx-auto max-w-7xl">
        <div className="grid gap-12 pb-16 lg:grid-cols-[2fr_1fr_1fr_1.5fr]">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3.5">
              <img
                src="/logo-white.png"
                alt="Chenkai Foods Logo"
                className="h-16 md:h-20 w-auto object-contain drop-shadow-md"
              />
              <span className="font-display text-2xl uppercase tracking-wider text-white md:text-3xl">
                CHENKAI<span className="text-primary">.</span>FOODS
              </span>
            </div>

            <p className="mt-4 text-xs font-bold uppercase tracking-[0.25em] text-primary">
              The Science of Tradition
            </p>

            <p className="mt-4 max-w-sm text-xs md:text-sm leading-relaxed text-white/70">
              Artisanal coastal seafood pickles and sun-cured dry fish created with food science precision and coastal South Indian passion.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild size="sm" className="rounded-full bg-primary hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider px-5">
                <a href={waLink("Hi Chenkai Foods, I have an inquiry.")} target="_blank" rel="noreferrer">
                  WhatsApp Orders <ArrowUpRight size={14} />
                </a>
              </Button>
              <a
                href="https://www.instagram.com/chenkaifoods/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 border border-white/20 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:border-primary hover:text-primary transition-all"
              >
                <Instagram size={14} className="text-primary" /> Instagram
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <p className="eyebrow text-primary mb-4">Navigation</p>
            <nav className="flex flex-col gap-2 text-xs font-bold uppercase tracking-wider">
              {links.map((l) => (
                <Link key={l.to} to={l.to} className="hover:text-primary transition-colors py-1 text-white/80">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Product Categories */}
          <div>
            <p className="eyebrow text-primary mb-4">Our Selections</p>
            <ul className="flex flex-col gap-2 text-xs font-bold uppercase tracking-wider text-white/70">
              <li className="hover:text-primary transition-colors cursor-pointer">Artisanal Fish Pickle</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Wild Prawn Pickle</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Sun-Cured Anchovy (Nethili)</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Seer Fish (Vanjaram)</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Baby Prawns (Chenakunni)</li>
            </ul>
          </div>

          {/* Contact Details & Space for 3D Jar on the Right */}
          <div className="pr-4 md:pr-12">
            <p className="eyebrow text-primary mb-4">Contact & Support</p>
            <p className="text-xs font-bold uppercase text-white">Official Enquiries Desk</p>
            <a
              className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
              href={waLink("Hi Chenkai Foods!")}
              target="_blank"
              rel="noreferrer"
            >
              +91 63743 92488 <ArrowUpRight size={16} />
            </a>
            <p className="mt-2 text-xs text-white/60 leading-relaxed">
              Coastal Artisanal Facility,<br />
              Southern Coast, Tamil Nadu, India.
            </p>
            <a
              href="https://www.instagram.com/chenkaifoods/"
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white hover:text-primary transition-colors"
            >
              <Instagram size={15} className="text-primary" /> @chenkaifoods
            </a>
          </div>
        </div>

        {/* Bottom Bar without Back to Top Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-8 text-xs text-white/50">
          <span>© {new Date().getFullYear()} Chenkai Foods. All rights reserved.</span>

          <a
            href="https://www.instagram.com/chenkaifoods/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-primary transition-colors"
          >
            <Instagram size={14} /> Instagram: @chenkaifoods
          </a>
        </div>
      </div>
    </footer>
  );
}

