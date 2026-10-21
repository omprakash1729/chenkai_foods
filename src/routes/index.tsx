import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { JarScene } from "@/components/JarScene";
import { Nav, Footer, OrderBand, BulkPreOrderScroller } from "@/components/site";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { CartBar } from "@/components/CartBar";
import { CartProvider } from "@/lib/cart";
import { products } from "@/lib/products";
import table from "@/assets/pickle-table.jpg";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Chenkai Food — A little jar. A lot of flavour." },
      {
        name: "description",
        content:
          "Explore Chenkai Food's South Indian pickles and thokku. Discover our flavours and order your favourite jar on WhatsApp.",
      },
      { property: "og:title", content: "Chenkai Food — A little jar. A lot of flavour." },
      {
        property: "og:description",
        content: "South Indian pickles, thokku and a whole lot of flavour.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <CartProvider>
      <HomeInner />
    </CartProvider>
  );
}

function HomeInner() {
  return (
    <div className="overflow-x-clip bg-background">
      <Nav />
      {/* Scroll-Driven Storytelling Area */}
      <div id="jar-story" className="relative">
        <JarScene />

        {/* Hero Section */}
        <section id="sec-hero" className="relative z-10 min-h-[92svh] px-5 pb-10 pt-28 sm:pt-36 md:px-8 md:pt-44 flex flex-col justify-between">
          <div className="relative z-30 mx-auto max-w-7xl w-full">
            <p className="eyebrow text-primary font-black tracking-[0.25em] text-xs sm:text-sm">South Indian soul. Unmistakable flavour.</p>
            <h1 className="mt-3 sm:mt-5 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight leading-[0.96] max-w-[62%] sm:max-w-none">
              Chenkai<br />
              <span className="text-primary">Food.</span>
            </h1>
            <h2 className="mt-3 sm:mt-5 max-w-[52%] sm:max-w-lg text-sm sm:text-lg leading-relaxed text-muted-foreground font-medium">
              Authentic prawn and dry fish pickles, packed with traditional flavours and the perfect blend of spices.
            </h2>
            <Button asChild size="default" className="relative mt-5 sm:mt-6 rounded-full shadow-md glow-hover font-bold text-xs uppercase tracking-wider px-5 sm:px-7 h-10 sm:h-12 w-fit">
              <Link to="/products">
                Find your flavour <ArrowUpRight size={14} />
              </Link>
            </Button>
          </div>
          <div className="relative z-30 mx-auto flex w-full max-w-7xl justify-between border-t border-border/20 pt-4 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            <span>Pickles / Thokku / Preserves</span>
            <ArrowDown size={16} />
          </div>
        </section>

        {/* Section 01: The signature jar (Clean Red Background matching OrderBand) */}
        <section id="sec-signature" className="relative z-10 min-h-[78svh] sm:min-h-[85svh] bg-gradient-to-br from-red-950 via-primary to-black px-5 py-16 text-primary-foreground md:px-8 md:py-32 border-y border-primary/20 shadow-2xl overflow-hidden flex flex-col justify-center">
          <div className="relative z-30 mx-auto grid max-w-7xl md:grid-cols-2 gap-6 md:gap-10 items-center w-full">
            <div className="hidden md:block" />
            <div className="max-w-[55%] ml-auto md:max-w-none md:ml-0">
              <p className="eyebrow text-primary-foreground/90 font-black tracking-[0.25em] text-xs sm:text-sm">01 / The signature jar</p>
              <h2 className="mt-3 sm:mt-5 font-display text-4xl sm:text-5xl uppercase leading-[0.98] md:text-6xl text-white">
                Small jar.<br />
                Big <span className="text-white drop-shadow">personality.</span>
              </h2>
              <p className="mt-4 sm:mt-6 max-w-md text-xs sm:text-base leading-relaxed text-primary-foreground/90 font-normal">
                Prawn pickle with a fiery red chilli kick.<br />
                A bold spoonful that turns a simple plate<br />
                of rice into something special.
              </p>
              <Button asChild size="default" className="mt-5 sm:mt-7 rounded-full border-2 border-primary-foreground bg-primary-foreground text-primary font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-transparent hover:text-primary-foreground px-5 sm:px-7 h-10 sm:h-12 w-fit transition-all">
                <Link to="/products">
                  Meet the collection <ArrowUpRight size={14} />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Bulk Pre-Order Marquee Ticker */}
        <div className="relative z-20">
          <BulkPreOrderScroller theme="red" />
        </div>

        {/* Section 02: Full Product Showcase — ALL products */}
        {/* z-30 ensures product cards always sit ABOVE the 3D jar canvas layer on all screens */}
        <section id="sec-collection" className="relative z-30 section-space bg-background">
          <div className="relative z-30 page-width">
            {/* Section header */}
            <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="eyebrow text-primary">02 / The Collection</p>
                <h2 className="section-heading mt-4">
                  Every jar.<br />Every flavour.
                </h2>
              </div>
              <p className="max-w-xs text-xs md:text-sm leading-relaxed text-muted-foreground font-medium">
                Wild-caught, sun-cured and hand-spiced. Add any item to your cart and send your order straight to WhatsApp.
              </p>
            </div>

            {/* Pickles */}
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-7">
                <span className="font-display text-xs uppercase tracking-[0.3em] text-primary font-bold">Seafood Pickles</span>
                <div className="flex-1 h-px bg-border/40" />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-7 lg:grid-cols-3">
                {products.filter((p) => p.category === "Pickles").map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>

            {/* Dry Fish */}
            <div>
              <div className="flex items-center gap-3 mb-7">
                <span className="font-display text-xs uppercase tracking-[0.3em] text-primary font-bold">Premium Dry Fish</span>
                <div className="flex-1 h-px bg-border/40" />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-7 lg:grid-cols-3">
                {products.filter((p) => p.category === "Dry Fish").map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </div>
        </section>


        {/* Section 03: At your table */}
        <section id="sec-table" className="relative z-10 my-8 overflow-hidden">
          <img
            src={table}
            alt="Pickles, rice, mango and chillies on a white table"
            loading="lazy"
            width={1536}
            height={1024}
            className="h-[460px] w-full object-cover md:h-[580px]"
          />
          <div className="absolute inset-0 bg-foreground/60 backdrop-blur-[0.5px]" />
          <div className="absolute inset-0 flex items-end px-6 pb-14 text-primary-foreground md:px-12 md:pb-20 z-30">
            <div className="mx-auto w-full max-w-7xl">
              <p className="eyebrow text-primary font-bold">03 / At your table</p>
              <h2 className="mt-4 max-w-3xl font-display text-3xl uppercase leading-tight sm:text-5xl md:text-6xl text-white">
                Ordinary meals.<br />Extraordinary company.
              </h2>
            </div>
          </div>
        </section>

        {/* Section 04: The Chenkai way */}
        <section id="sec-chenkai-way" className="relative z-10 section-space">
          <div className="relative z-30 page-width">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="eyebrow text-primary">04 / The Chenkai way</p>
                <h2 className="section-heading mt-4">
                  Flavour is<br />in the details.
                </h2>
              </div>
              <Button asChild variant="link" className="p-0 text-foreground font-bold text-xs uppercase tracking-wider hover:text-primary">
                <Link to="/story">
                  Our story <ArrowUpRight />
                </Link>
              </Button>
            </div>
            <div className="grid gap-10 md:grid-cols-2 md:gap-20 items-center">
              {/* Dedicated space on left for 3D Jar */}
              <div className="hidden md:block min-h-[300px]" />
              <div className="divide-y divide-border/20 border-t border-border/20">
                {[
                  {
                    t: "The ingredients",
                    d: "The sharpness of mango. The warmth of chilli. The fragrance of gingelly oil.",
                  },
                  {
                    t: "The balance",
                    d: "Heat, salt and tang — each flavour brings something different to the table.",
                  },
                  {
                    t: "The moment",
                    d: "With rice, dosa or a favourite meal. Find the pairing that feels like yours.",
                  },
                ].map((s, i) => (
                  <div key={s.t} className="grid grid-cols-[32px_1fr] gap-4 py-7">
                    <span className="text-xs font-bold text-primary">0{i + 1}</span>
                    <div>
                      <h3 className="font-display text-xl uppercase tracking-wide">{s.t}</h3>
                      <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div id="sec-orderband" className="relative z-30">
          <OrderBand />
        </div>

        <div className="relative z-30">
          <Footer />
        </div>
      </div>
      {/* Swiggy-style sticky cart bar */}
      <CartBar />
    </div>
  );
}

