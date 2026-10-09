import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { waLink } from "@/components/site";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex min-w-0 flex-col">
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img src={product.image} alt={product.imageAlt ?? `${product.name} — illustrative product image`} width={1024} height={1024} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-105" />
        <span className="absolute left-4 top-4 bg-background px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest">{product.tag}</span>
      </div>
      <div className="flex flex-1 flex-col border-b border-border/20 py-5">
        <h3 className="font-display text-xl uppercase md:text-2xl">{product.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{product.desc}</p>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <span className="text-sm font-semibold">{product.price}</span>
          <Button asChild className="rounded-none shadow-none"><a href={waLink(`Hi Chenkai Food, I'd like to book: ${product.name} (${product.price}).`)} target="_blank" rel="noreferrer">Book now <ArrowUpRight /></a></Button>
        </div>
      </div>
    </article>
  );
}