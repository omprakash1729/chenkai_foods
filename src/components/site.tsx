import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const WHATSAPP = "916374392488";
export const waLink = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
const links = [{ to: "/", label: "Home" }, { to: "/products", label: "Products" }, { to: "/story", label: "Our story" }, { to: "/contact", label: "Contact" }] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/15 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 md:px-8">
        <Link to="/" aria-label="Chenkai Food home" className="font-display text-xl uppercase leading-none md:text-2xl">Chenkai<span className="text-primary">.</span><span className="mt-1 block text-[10px] tracking-[0.25em]">Food & flavour</span></Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-7 text-xs font-semibold uppercase tracking-widest md:flex">{links.map(l => <Link key={l.to} to={l.to} activeProps={{ className: "text-primary" }} activeOptions={{ exact: true }} className="transition-colors hover:text-primary">{l.label}</Link>)}</nav>
        <div className="flex items-center gap-2"><Button asChild className="rounded-none shadow-none"><a href={waLink("Hi Chenkai Food, I'd like to place an order.")} target="_blank" rel="noreferrer">Book now <ArrowUpRight /></a></Button><Button variant="ghost" size="icon" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)} className="md:hidden">{open ? <X /> : <Menu />}</Button></div>
      </div>
      {open && <nav aria-label="Mobile navigation" className="flex flex-col border-t border-border/15 bg-background px-5 py-4 md:hidden">{links.map(l => <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="py-3 text-sm font-semibold uppercase">{l.label}</Link>)}</nav>}
    </header>
  );
}

export function OrderBand() {
  return <section className="bg-primary px-5 py-16 text-primary-foreground md:px-8 md:py-20"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 md:flex-row md:items-center"><div><p className="eyebrow text-primary-foreground/80">A little jar. A lot of flavour.</p><h2 className="mt-4 font-display text-4xl uppercase md:text-6xl">Your next craving.</h2></div><Button asChild variant="outline" size="lg" className="h-14 rounded-none border-primary-foreground bg-transparent text-primary-foreground shadow-none hover:bg-primary-foreground hover:text-primary"><a href={waLink("Hi Chenkai Food, I'd like to place an order.")} target="_blank" rel="noreferrer">Let's talk pickles <ArrowUpRight /></a></Button></div></section>;
}

export function Footer() {
  return <footer className="bg-foreground px-5 pb-6 pt-14 text-background md:px-8"><div className="mx-auto max-w-7xl"><div className="grid gap-10 pb-12 md:grid-cols-[2fr_1fr_1fr]"><div><Link to="/" className="font-display text-4xl uppercase md:text-5xl">Chenkai<span className="text-primary">.</span>Food</Link><p className="mt-4 max-w-xs text-sm leading-relaxed text-background/60">South Indian pickles & thokku.<br />Big flavour, by the spoonful.</p></div><div><p className="eyebrow text-background/50">Explore</p><nav className="mt-5 flex flex-col items-start gap-3 text-sm">{links.map(l => <Link key={l.to} to={l.to} className="hover:text-primary">{l.label}</Link>)}</nav></div><div><p className="eyebrow text-background/50">Say hello</p><a className="mt-5 inline-flex items-center gap-2 text-sm hover:text-primary" href={waLink("Hi Chenkai Food!")} target="_blank" rel="noreferrer">+91 63743 92488 <ArrowUpRight size={16} /></a><p className="mt-4 text-sm text-background/60">Orders & enquiries on WhatsApp</p></div></div><div className="flex flex-wrap justify-between gap-3 border-t border-background/20 py-5 text-xs text-background/50"><span>© {new Date().getFullYear()} Chenkai Food</span><span>Made for the love of flavour.</span></div></div></footer>;
}
