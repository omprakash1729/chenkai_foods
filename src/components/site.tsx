import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X, ShieldCheck, Award, Microscope, MessageCircle, Instagram } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WHATSAPP, waLink } from "@/lib/whatsapp";
export { WHATSAPP, waLink };
export { BulkPreOrderScroller } from "./BulkPreOrderScroller";

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
      <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 md:px-8">
        {/* Logo: On mobile only the bird logo is shown cleanly */}
        <Link to="/" aria-label="Chenkai Foods Home" className="group flex items-center gap-2.5 shrink-0">
          <img
            src="/logo-transparent.png"
            alt="Chenkai Foods Logo"
            className="h-11 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
          <div className="hidden sm:flex flex-col">
            <span className="font-display text-xl md:text-2xl uppercase tracking-wider text-foreground">
              CHENKAI<span className="text-primary">.</span>FOODS
            </span>
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground group-hover:text-primary transition-colors">
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

        {/* Action Button & Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Button asChild className="rounded-full shadow-md font-bold text-xs uppercase tracking-wider px-3.5 py-1.5 sm:px-5 sm:py-2 h-9 sm:h-10">
            <a href={waLink("Hi Chenkai Foods, I'd like to place an enquiry / order.")} target="_blank" rel="noreferrer">
              <MessageCircle size={14} />
              <span className="hidden sm:inline">Book on WhatsApp</span>
              <span className="sm:hidden font-black">Book</span>
              <ArrowUpRight size={13} className="hidden sm:inline" />
            </a>
          </Button>

          {/* Hamburger Menu Toggle on Mobile */}
          <Button
            variant="ghost"
            size="icon"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="md:hidden w-9 h-9 rounded-full text-foreground hover:bg-zinc-100"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {open && (
        <>
          <div
            className="fixed inset-0 top-16 sm:top-20 z-30 bg-black/40 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <nav
            aria-label="Mobile navigation"
            className="relative z-40 flex flex-col border-t border-border/20 bg-white/98 backdrop-blur-xl px-6 py-5 md:hidden shadow-2xl animate-in slide-in-from-top-2 duration-200"
          >
            <div className="flex flex-col divide-y divide-border/10">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  activeProps={{ className: "text-primary font-black" }}
                  activeOptions={{ exact: true }}
                  className="py-3.5 text-sm font-bold uppercase tracking-wider text-foreground hover:text-primary transition-colors flex items-center justify-between"
                >
                  <span>{l.label}</span>
                  <ArrowUpRight size={14} className="text-muted-foreground" />
                </Link>
              ))}
            </div>

            <div className="pt-4 mt-2 border-t border-border/20">
              <a
                href={waLink("Hi Chenkai Foods, I'd like to place an order.")}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-primary text-white font-bold text-xs uppercase tracking-wider py-3 shadow-md"
              >
                <MessageCircle size={15} />
                <span>Order on WhatsApp</span>
              </a>
            </div>
          </nav>
        </>
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
            Wild-caught fish pickles, succulent prawn creations, and sun-cured dry fish packets. 0% taste enhancers, MSG & sodium benzoate.
          </p>
        </div>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="h-auto min-h-12 rounded-full border-2 border-primary-foreground bg-primary-foreground text-primary shadow-xl hover:bg-transparent hover:text-primary-foreground font-bold tracking-wider text-xs uppercase transition-all duration-300 hover:scale-105 px-6 sm:px-8 py-3.5 w-full sm:w-auto text-center justify-center"
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 py-6 sm:py-8">
      {/* ── Card 1: Food Science Formulated (Mild Pearl-White Gradient) ── */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-white via-zinc-50 to-zinc-100 text-zinc-950 border border-zinc-200/90 shadow-md hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 flex items-center justify-between group min-h-[190px] sm:min-h-[210px]">
        <div className="flex-1 min-w-0 pr-4 sm:pr-6 z-10 flex flex-col justify-center h-full">
          <h4 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-zinc-950 leading-none">
            Food Science
          </h4>
          <span className="block font-sans text-base sm:text-lg font-medium text-zinc-500 leading-tight mt-1">
            Formulated
          </span>
          <p className="mt-3 text-xs text-zinc-600 max-w-[210px] sm:max-w-xs leading-relaxed">
            Formulated with food science precision and marine lipid stability by <span className="whitespace-nowrap font-medium text-zinc-900">Dr. R. Navaneethan, Ph.D.,</span>
          </p>
        </div>
        {/* Opposite end: Image directly floating on mild gradient with natural image shadow, no inner box */}
        <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 shrink-0 relative flex items-center justify-center">
          <img
            src="/badges/food-science-3d.png"
            alt="Food Science Precision Microscope"
            className="w-full h-full object-contain filter drop-shadow-[0_16px_28px_rgba(0,0,0,0.18)] group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-500"
            loading="lazy"
          />
        </div>
      </div>

      {/* ── Card 2: TNJFU Nagapattinam (Mild Crimson-Red Gradient) ── */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#b91c1c] via-[#991b1b] to-[#7f1d1d] text-white shadow-xl hover:shadow-2xl hover:shadow-red-950/40 transition-all duration-300 p-6 sm:p-8 flex items-center justify-between group border border-red-400/25 min-h-[190px] sm:min-h-[210px]">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="flex-1 min-w-0 pr-4 sm:pr-6 z-10 flex flex-col justify-center h-full">
          <h4 className="font-display text-lg sm:text-2xl uppercase tracking-tight text-white leading-tight">
            Tamil Nadu <span className="whitespace-nowrap">Dr. J. Jayalalithaa</span>
          </h4>
          <span className="block font-sans text-xs sm:text-sm font-semibold text-white/90 leading-tight mt-1">
            Fisheries University, Nagapattinam
          </span>
          <p className="mt-3 text-xs text-white/90 max-w-[210px] sm:max-w-xs leading-relaxed">
            Manufacturing & incubation collaboration with Tamil Nadu <span className="whitespace-nowrap">Dr. J. Jayalalithaa</span> Fisheries University (TNJFU), Nagapattinam.
          </p>
        </div>
        {/* Opposite end: TNJFU Emblem floating directly on gradient with image shadow (not inside another box) */}
        <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 shrink-0 relative flex items-center justify-center">
          <img
            src="/tnjfu-logo.png"
            alt="Tamil Nadu Dr. J. Jayalalithaa Fisheries University (TNJFU), Nagapattinam Emblem"
            className="w-full h-full object-contain filter drop-shadow-[0_16px_32px_rgba(0,0,0,0.5)] group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-500"
            loading="lazy"
          />
        </div>
      </div>

      {/* ── Card 3: 0% Taste Enhancers (Mild Obsidian-Black Gradient) ── */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1c1c1f] via-[#141416] to-[#0a0a0c] text-white border border-white/10 shadow-xl hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 flex items-center justify-between group min-h-[190px] sm:min-h-[210px]">
        <div className="absolute top-0 right-0 -mr-10 -mt-10 w-48 h-48 rounded-full bg-primary/20 blur-2xl pointer-events-none" />
        <div className="flex-1 min-w-0 pr-4 sm:pr-6 z-10 flex flex-col justify-center h-full">
          <h4 className="font-display text-xl sm:text-2xl uppercase tracking-tight text-white leading-none">
            0% Taste Enhancers
          </h4>
          <span className="block font-sans text-xs sm:text-sm font-semibold text-primary leading-tight mt-1">
            MSG & Sodium Benzoate
          </span>
          <p className="mt-3 text-xs text-white/70 max-w-[210px] sm:max-w-xs leading-relaxed">
            Zero taste enhancers, MSG, sodium benzoate, synthetic colors, or chemical additives.
          </p>
        </div>
        {/* Opposite end: 3D Ruby crystal shield floating directly on gradient with image shadow, no inner box */}
        <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 shrink-0 relative flex items-center justify-center">
          <img
            src="/badges/purity-shield-3d.png"
            alt="0% Taste Enhancers Purity Shield"
            className="w-full h-full object-contain filter drop-shadow-[0_16px_32px_rgba(220,38,38,0.4)] group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-500"
            loading="lazy"
          />
        </div>
      </div>

      {/* ── Card 4: Wild Ocean Harvest (Mild Pearl-White Gradient) ── */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-white via-zinc-50 to-zinc-100 text-zinc-950 border border-zinc-200/90 shadow-md hover:shadow-2xl transition-all duration-300 p-6 sm:p-8 flex items-center justify-between group min-h-[190px] sm:min-h-[210px]">
        <div className="flex-1 min-w-0 pr-4 sm:pr-6 z-10 flex flex-col justify-center h-full">
          <h4 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-zinc-950 leading-none">
            Wild Ocean
          </h4>
          <span className="block font-sans text-base sm:text-lg font-medium text-zinc-500 leading-tight mt-1">
            Harvest
          </span>
          <p className="mt-3 text-xs text-zinc-600 max-w-[210px] sm:max-w-xs leading-relaxed">
            Single-origin hand-pounded spices & wild-caught coastal catch.
          </p>
        </div>
        {/* Opposite end: Leaping chrome fish floating directly on mild gradient with natural image shadow, no inner box */}
        <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 shrink-0 relative flex items-center justify-center">
          <img
            src="/badges/wild-harvest-3d.png"
            alt="Wild Ocean Harvest 3D"
            className="w-full h-full object-contain filter drop-shadow-[0_16px_28px_rgba(0,0,0,0.18)] group-hover:scale-105 group-hover:-translate-y-1 transition-all duration-500"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative z-30 mt-0 border-t border-white/10 bg-black text-white pt-16 pb-12 px-4 sm:px-6 md:px-12">
      <div className="relative z-40 mx-auto max-w-7xl">
        {/* Official TNJFU Collaboration Showcase Banner */}
        <div className="mb-14 rounded-3xl border border-white/15 bg-gradient-to-r from-zinc-950 via-zinc-900 to-black p-5 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="shrink-0 flex items-center justify-center">
              <img
                src="/tnjfu-logo.png"
                alt="Tamil Nadu Dr. J. Jayalalithaa Fisheries University (TNJFU), Nagapattinam Logo"
                className="h-20 w-20 sm:h-24 sm:w-24 object-contain filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.5)]"
                loading="lazy"
              />
            </div>
            <div className="flex-1">
              <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-primary mb-2">
                Manufacturing & Technology Collaboration
              </p>
              <h3 className="font-display text-xl sm:text-2xl uppercase tracking-wide text-white">
                Collaborative Manufacturing with Tamil Nadu <span className="whitespace-nowrap">Dr. J. Jayalalithaa</span> Fisheries University (TNJFU), Nagapattinam
              </h3>
              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-white/80 max-w-3xl">
                We proudly collaborate with <strong className="text-white font-bold">Tamil Nadu <span className="whitespace-nowrap">Dr. J. Jayalalithaa</span> Fisheries University (TNJFU), Nagapattinam</strong> for manufacturing, technical incubation, and quality standards. Our artisanal seafood products are crafted utilizing university-guided marine processing standards, hygienic solar drying protocols, and strict food safety validation.
              </p>
            </div>
          </div>
        </div>

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
              <li className="hover:text-primary transition-colors cursor-pointer">Prawn Pickle (180 g)</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Crab Pickle (180 g)</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Fish Pickle (180 g)</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Maasi Karuvadu (250 g)</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Dry Vanjaram (250 g)</li>
              <li className="hover:text-primary transition-colors cursor-pointer">Solar Nethili (250 g)</li>
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
              In Collaborative Manufacturing with Tamil Nadu <span className="whitespace-nowrap">Dr. J. Jayalalithaa</span> Fisheries University (TNJFU), Nagapattinam,<br />
              Coastal Artisanal Facility,<br />
              Nagapattinam, Tamil Nadu, India.
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
          <span>© {new Date().getFullYear()} Chenkai Foods. In manufacturing collaboration with Tamil Nadu <span className="whitespace-nowrap">Dr. J. Jayalalithaa</span> Fisheries University (TNJFU), Nagapattinam. All rights reserved.</span>

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

