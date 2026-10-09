import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav, Footer, OrderBand } from "@/components/site";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
export const Route = createFileRoute("/products")({
  head: () => ({ meta: [
    { title: "The Collection — Chenkai Food" }, { name: "description", content: "Explore prawn pickle, mango thokku and more Chenkai Food flavours. Book your favourite on WhatsApp." },
    { property: "og:title", content: "The Collection — Chenkai Food" }, { property: "og:description", content: "Find your favourite South Indian pickle and thokku." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Products,
});
function Products() {
  const [filter, setFilter] = useState("All flavours");
  const shown = products.filter(p => filter === "All flavours" || p.category === filter);
  return <div><Nav /><main className="page-width pb-24 pt-36"><p className="eyebrow text-primary">The Chenkai collection</p><div className="mt-5 flex flex-wrap items-end justify-between gap-6"><h1 className="font-display text-5xl uppercase leading-tight md:text-7xl">A shelf full<br />of <span className="text-primary">flavour.</span></h1><p className="max-w-xs text-sm leading-relaxed text-muted-foreground">Fiery, tangy, bold. Pick the jar that speaks to you.</p></div><div className="mb-8 mt-12 flex items-center justify-between gap-3 border-y border-border/20 py-4"><div className="flex gap-1" aria-label="Filter products">{["All flavours","Pickles","Thokku"].map(f => <Button key={f} variant={filter === f ? "default" : "ghost"} onClick={() => setFilter(f)} aria-pressed={filter === f} className="rounded-none px-3 text-xs shadow-none md:px-5">{f}</Button>)}</div><span className="text-xs text-muted-foreground">{shown.length} jars</span></div><div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{shown.map(p => <ProductCard key={p.name} product={p} />)}</div></main><OrderBand /><Footer /></div>;
}
