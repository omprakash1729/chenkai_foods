import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { JarScene } from "@/components/JarScene";
import { Nav, Footer, OrderBand } from "@/components/site";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import table from "@/assets/pickle-table.jpg";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({ meta: [
    { title: "Chenkai Food — A little jar. A lot of flavour." },
    { name: "description", content: "Explore Chenkai Food's South Indian pickles and thokku. Discover our flavours and order your favourite jar on WhatsApp." },
    { property: "og:title", content: "Chenkai Food — A little jar. A lot of flavour." },
    { property: "og:description", content: "South Indian pickles, thokku and a whole lot of flavour." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: Home,
});
function Home() {
  return <div className="overflow-x-clip"><Nav />
    <div id="jar-story" className="relative">
      <JarScene />
      <section className="relative min-h-[90svh] px-5 pb-12 pt-36 md:px-8 md:pt-44">
        <div className="relative z-20 mx-auto max-w-7xl"><p className="eyebrow text-primary">South Indian soul. Unmistakable flavour.</p><h1 className="mt-6 font-display text-5xl uppercase leading-[1.02] sm:text-6xl md:text-7xl lg:text-8xl">Chenkai<br /><span className="text-primary">Food.</span></h1><p className="mt-6 max-w-64 text-sm leading-relaxed text-muted-foreground md:max-w-80 md:text-base">A little heat. A little tang.<br />A whole lot of home in every jar.</p><Button asChild size="lg" className="relative mt-7 rounded-none shadow-none"><Link to="/products">Find your flavour <ArrowUpRight /></Link></Button></div>
        <div className="absolute bottom-6 left-5 right-5 z-20 mx-auto flex max-w-7xl justify-between border-t border-border/20 pt-4 text-[10px] font-semibold uppercase tracking-widest md:left-8 md:right-8"><span>Pickles / Thokku / Preserves</span><ArrowDown size={16} /></div>
      </section>
      <section className="relative min-h-[85svh] bg-foreground px-5 py-16 text-background md:px-8 md:py-28"><div className="relative z-20 mx-auto grid max-w-7xl md:grid-cols-2"><div className="hidden md:block" /><div><p className="eyebrow text-primary">01 / The signature jar</p><h2 className="mt-5 font-display text-4xl uppercase leading-tight md:text-6xl">Small jar.<br />Big <span className="text-primary">personality.</span></h2><p className="mt-6 max-w-md text-sm leading-relaxed text-background/70 md:text-base">Prawn pickle with a fiery red chilli kick. A bold spoonful that turns a simple plate of rice into something worth slowing down for.</p><Button asChild variant="link" className="mt-5 h-auto p-0 text-background"><Link to="/products">Meet the collection <ArrowUpRight /></Link></Button></div></div></section>
    </div>
    <div className="border-y border-border bg-primary py-5 text-center text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground">A little heat · A little tang · A whole lot of Chenkai</div>
    <section className="section-space"><div className="page-width"><div className="mb-10 flex flex-wrap items-end justify-between gap-5"><div><p className="eyebrow text-primary">02 / The favourites</p><h2 className="section-heading mt-4">Meet your<br />next favourite.</h2></div><Button asChild variant="link" className="p-0 text-foreground"><Link to="/products">All flavours <ArrowUpRight /></Link></Button></div><div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">{products.slice(0,3).map(p => <ProductCard key={p.name} product={p} />)}</div></div></section>
    <section className="relative"><img src={table} alt="Pickles, rice, mango and chillies on a white table" loading="lazy" width={1536} height={1024} className="h-[440px] w-full object-cover md:h-[580px]" /><div className="absolute inset-0 bg-foreground/45" /><div className="absolute inset-0 flex items-end px-5 pb-12 text-primary-foreground md:px-8 md:pb-16"><div className="mx-auto w-full max-w-7xl"><p className="eyebrow">03 / At your table</p><h2 className="mt-5 max-w-xl font-display text-4xl uppercase leading-tight md:text-6xl">Ordinary meals.<br />Extraordinary<br />company.</h2></div></div></section>
    <section className="section-space"><div className="page-width grid gap-10 md:grid-cols-2 md:gap-20"><div><p className="eyebrow text-primary">04 / The Chenkai way</p><h2 className="section-heading mt-4">Flavour is<br />in the details.</h2><Button asChild variant="link" className="mt-6 p-0 text-foreground"><Link to="/story">Our story <ArrowUpRight /></Link></Button></div><div className="divide-y divide-border/20 border-t border-border/20">{[{t:"The ingredients",d:"The sharpness of mango. The warmth of chilli. The fragrance of gingelly oil."},{t:"The balance",d:"Heat, salt and tang — each flavour brings something different to the table."},{t:"The moment",d:"With rice, dosa or a favourite meal. Find the pairing that feels like yours."}].map((s,i) => <div key={s.t} className="grid grid-cols-[32px_1fr] gap-4 py-7"><span className="text-xs text-primary">0{i+1}</span><div><h3 className="font-display text-xl uppercase">{s.t}</h3><p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{s.d}</p></div></div>)}</div></div></section>
    <OrderBand /><Footer />
  </div>;
}
