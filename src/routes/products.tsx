import { createFileRoute } from "@tanstack/react-router";
import { Nav, Footer, waLink } from "@/components/site";
import { products } from "@/lib/products";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Products — Chenkai Food" },
      { name: "description", content: "Browse Chenkai Food pickles and thokku, and book your jar on WhatsApp." },
      { property: "og:title", content: "Products — Chenkai Food" },
      { property: "og:description", content: "Browse our pickles and thokku, and book on WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Products,
});

function Products() {
  return (
    <div>
      <Nav />
      <main className="mx-auto max-w-7xl px-4 pb-24 pt-28 md:px-8">
        <h1 className="font-display text-[16vw] uppercase leading-none md:text-[8vw]">
          The <span className="text-primary">shelf.</span>
        </h1>
        <div className="mt-12 grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <article key={p.name} className="group flex flex-col border-b border-r border-border p-6 transition-colors hover:bg-foreground hover:text-background md:p-8">
              <div className="flex justify-between text-xs font-semibold uppercase tracking-widest">
                <span className="text-primary">{p.tag}</span>
                <span>0{i + 1}</span>
              </div>
              <h2 className="mt-10 font-display text-3xl uppercase md:text-4xl">{p.name}</h2>
              <p className="mt-3 flex-1 text-sm opacity-80">{p.desc}</p>
              <div className="mt-8 flex items-center justify-between gap-4">
                <span className="font-semibold">{p.price}</span>
                <a
                  href={waLink(`Hi Chenkai Food, I'd like to book: ${p.name} (${p.price}).`)}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-primary px-5 py-3 text-sm font-semibold uppercase text-primary-foreground"
                >
                  Book now
                </a>
              </div>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
