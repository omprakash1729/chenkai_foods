import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { waLink } from "@/components/site";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group relative flex min-w-0 flex-col overflow-hidden rounded-[2rem] aspect-[3/4] max-h-[500px] bg-card shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_-10px_rgba(220,38,38,0.35)]">
      {/* Full Background Product Image with Smooth Zoom Effect */}
      <img
        src={product.image}
        alt={product.imageAlt ?? `${product.name} — ${product.subtitle}`}
        width={1024}
        height={1024}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
      />

      {/* Glass / Light Hover Sheen Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

      {/* Top Floating Badges */}
      <div className="absolute top-3.5 inset-x-3.5 flex justify-between items-center z-10">
        <span className="rounded-full bg-black/60 backdrop-blur-md px-3 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-md">
          {product.category}
        </span>
        <span className="rounded-full bg-primary/95 backdrop-blur-md px-3 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-md">
          {product.tag}
        </span>
      </div>

      {/* Pure Black Gradient Overlay Container */}
      <div className="absolute inset-x-0 bottom-0 pt-24 pb-4 px-5 bg-gradient-to-t from-black via-black/85 via-50% to-transparent flex flex-col justify-end z-10">
        {/* Subtitle & Title + Price Badge Row */}
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            {product.subtitle}
          </span>
          <div className="flex items-end justify-between gap-2 mt-0.5 mb-1.5">
            <h3 className="font-display text-xl sm:text-2xl uppercase tracking-wide text-white drop-shadow-md leading-tight">
              {product.name}
            </h3>
            <span className="rounded-full bg-white/20 backdrop-blur-md border border-white/30 px-3 py-0.5 text-sm font-display font-bold text-white shadow-md shrink-0 mb-0.5">
              {product.price}
            </span>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-xs leading-normal text-white/85 font-normal line-clamp-2 mb-3 drop-shadow">
          {product.desc}
        </p>

        {/* Glass Ingredient Tags */}
        {product.ingredients && product.ingredients.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3.5">
            {product.ingredients.slice(0, 3).map((ing) => (
              <span key={ing} className="rounded-full bg-white/20 backdrop-blur-md border border-white/20 px-2.5 py-0.5 text-[9px] font-semibold text-white">
                {ing}
              </span>
            ))}
          </div>
        )}

        {/* Prominent Red Full-Width Action Button */}
        <Button asChild size="lg" className="w-full rounded-full bg-primary hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider shadow-xl shadow-red-950/60 transition-all hover:scale-[1.02] border-none py-3">
          <a
            href={waLink(`Hi Chenkai Foods, I'd like to book / enquire about: ${product.name} (${product.price}).`)}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2"
          >
            <MessageCircle size={15} className="text-white fill-white/20" />
            <span>Book Now on WhatsApp</span>
            <ArrowUpRight size={14} className="text-white/80" />
          </a>
        </Button>
      </div>
    </article>
  );
}