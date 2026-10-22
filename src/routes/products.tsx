import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav, Footer, OrderBand, TrustBadges, BulkPreOrderScroller } from "@/components/site";
import { products, type ProductCategory } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { CartBar } from "@/components/CartBar";
import { CartProvider } from "@/lib/cart";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Seafood Collection — Chenkai Foods | Pickles & Dry Fish" },
      {
        name: "description",
        content:
          "Explore Chenkai Foods' collection: Prawn Pickle, Crab Pickle, Fish Pickle, Maasi Karuvadu (Dry Tuna Powder), Dry Spiny Loach, Salted Prawns, Unsalted Baby Prawns, Solar-Dried Nethili, Normal Dry Nethili, and Dry Fish Vanjaram. In collaboration with Tamil Nadu Dr. J. Jayalalithaa Fisheries University (TNJFU), Nagapattinam.",
      },
      { property: "og:title", content: "Seafood Collection — Chenkai Foods" },
      {
        property: "og:description",
        content: "Artisanal seafood pickles & sun-cured dry fish created with food science precision. In collaboration with Tamil Nadu Dr. J. Jayalalithaa Fisheries University (TNJFU), Nagapattinam.",
      },
      { property: "og:image", content: "/og-image.jpg" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/og-image.jpg" },
    ],
  }),
  component: Products,
});

function Products() {
  return (
    <CartProvider>
      <ProductsInner />
    </CartProvider>
  );
}

function ProductsInner() {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>("All");

  const categories: { label: string; value: ProductCategory }[] = [
    { label: "All Products", value: "All" },
    { label: "Seafood Pickles", value: "Pickles" },
    { label: "Premium Dry Fish", value: "Dry Fish" },
  ];

  const displayedProducts = products.filter(
    (p) => activeCategory === "All" || p.category === activeCategory
  );

  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <Nav />
      {/* Category Header */}
      <section className="page-width pt-28 sm:pt-36">
        <div className="flex flex-col gap-2">
          <span className="eyebrow text-primary">The Chenkai Collection</span>
          <div className="flex flex-wrap items-end justify-between gap-4 sm:gap-6">
            <h1 className="font-display text-3xl uppercase leading-tight sm:text-5xl md:text-6xl tracking-wide break-words">
              Seafood Pickles &<br />
              <span className="text-primary">Dry Fish Packets.</span>
            </h1>
            <p className="max-w-sm text-xs sm:text-sm leading-relaxed text-muted-foreground font-medium">
              Wild-caught ocean harvests, hand-pounded single-origin spices, and sun-cured dry fish. 0% taste enhancers, MSG & sodium benzoate.
            </p>
          </div>
        </div>
      </section>

      {/* Screen End-to-End Bulk Pre-Order Marquee (Full Bleed on Desktop & Mobile with Zero Horizontal Scroll) */}
      <div className="w-full my-6 sm:my-8 overflow-hidden">
        <BulkPreOrderScroller theme="red" />
      </div>

      <main className="page-width pb-36 sm:pb-40">
        {/* Filter Navigation Bar */}
        <div className="mb-8 sm:mb-10 flex flex-wrap items-center justify-between gap-3 sm:gap-4 rounded-3xl glass-panel p-3 sm:p-4 border border-border/30">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2" aria-label="Filter products by category">
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground mr-1 sm:mr-2 pl-1 sm:pl-2">
              <Filter size={14} /> Category:
            </span>
            {categories.map((c) => (
              <Button
                key={c.value}
                variant={activeCategory === c.value ? "default" : "ghost"}
                onClick={() => setActiveCategory(c.value)}
                aria-pressed={activeCategory === c.value}
                className={`rounded-full px-3.5 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold uppercase tracking-wider shadow-none transition-all ${
                  activeCategory === c.value ? "shadow-md scale-105" : "hover:text-primary"
                }`}
              >
                {c.label}
              </Button>
            ))}
          </div>
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-muted-foreground pr-1 sm:pr-2">
            Showing {displayedProducts.length} of {products.length} Items
          </span>
        </div>

        {/* Product Grid — Swiggy/Blinkit/Zepto 2-column layout on mobile */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3">
          {displayedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 pt-8">
          <TrustBadges />
        </div>
      </main>
      <OrderBand />
      <Footer />
      {/* Swiggy-style sticky cart bar */}
      <CartBar />
    </div>
  );
}
