import { Plus, Minus } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useState, useEffect } from "react";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const { items, add, increment, decrement } = useCart();
  const cartItem = items.find((i) => i.product.id === product.id);
  const qty = cartItem?.qty ?? 0;

  // Pulse animation when first added
  const [pulse, setPulse] = useState(false);
  const prevQty = qty;
  const handleAdd = () => {
    add(product);
    setPulse(true);
  };
  useEffect(() => {
    if (!pulse) return;
    const t = setTimeout(() => setPulse(false), 400);
    return () => clearTimeout(t);
  }, [pulse]);

  return (
    <>
      {/* ── Mobile Swiggy-Style Compact Row Card (< sm) ─────────────── */}
      <article className="flex sm:hidden relative items-center justify-between gap-3 p-3.5 rounded-3xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all">
        {/* Left: Product Information */}
        <div className="flex-1 min-w-0 pr-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
            {product.subtitle}
          </span>
          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-foreground mt-0.5 leading-snug">
            {product.name}
          </h3>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="font-display text-xs font-black text-foreground">
              {product.price}
            </span>
            {product.weight && (
              <span className="text-[9px] font-bold text-muted-foreground uppercase">
                · {product.weight}
              </span>
            )}
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
            {product.desc}
          </p>
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="mt-1.5 flex flex-wrap gap-1">
              {product.ingredients.slice(0, 2).map((ing) => (
                <span
                  key={ing}
                  className="rounded-full bg-muted/60 px-2 py-0.5 text-[8.5px] font-medium text-muted-foreground"
                >
                  {ing}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right: Square image with Swiggy-style floating ADD button */}
        <div className="relative shrink-0 flex flex-col items-center">
          <div className="w-24 h-24 rounded-2xl overflow-hidden border border-border/30 bg-muted/20 shadow-sm">
            <img
              src={product.image}
              alt={product.imageAlt ?? product.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Floating Swiggy-style Add button / Qty stepper */}
          <div className="absolute -bottom-3 inset-x-1.5">
            {qty === 0 ? (
              <button
                id={`add-to-cart-mob-${product.id}`}
                onClick={handleAdd}
                className="w-full h-7 flex items-center justify-center gap-1 rounded-full bg-primary hover:bg-red-700 text-white font-black text-[10.5px] uppercase tracking-wider shadow-md shadow-primary/30 transition-all active:scale-95 border-2 border-white"
                aria-label={`Add ${product.name} to cart`}
              >
                <Plus size={12} strokeWidth={3} />
                <span>ADD</span>
              </button>
            ) : (
              <div
                className={`w-full h-7 flex items-center justify-between rounded-full bg-primary text-white shadow-md shadow-primary/30 border-2 border-white px-1 transition-transform duration-200 ${pulse ? "scale-105" : "scale-100"}`}
              >
                <button
                  onClick={() => decrement(product.id)}
                  aria-label="Remove one"
                  className="w-5 h-5 flex items-center justify-center text-white hover:bg-red-700 rounded-full"
                >
                  <Minus size={11} strokeWidth={3} />
                </button>
                <span className="text-[11px] font-black">{qty}</span>
                <button
                  onClick={() => {
                    increment(product.id);
                    setPulse(true);
                  }}
                  aria-label="Add one more"
                  className="w-5 h-5 flex items-center justify-center text-white hover:bg-red-700 rounded-full"
                >
                  <Plus size={11} strokeWidth={3} />
                </button>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* ── Desktop Full Card (>= sm) ─────────────────────────────────── */}
      <article className="group relative hidden sm:flex min-w-0 flex-col overflow-hidden rounded-[2rem] aspect-[3/4] max-h-[500px] bg-card shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_-10px_rgba(220,38,38,0.35)]">
        {/* Background image */}
        <img
          src={product.image}
          alt={product.imageAlt ?? `${product.name} — ${product.subtitle}`}
          width={1024}
          height={1024}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />

        {/* Hover sheen */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />

        {/* Bottom gradient content */}
        <div className="absolute inset-x-0 bottom-0 pt-24 pb-4 px-4 bg-gradient-to-t from-black via-black/85 via-50% to-transparent flex flex-col justify-end z-10">
          {/* Subtitle */}
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
            {product.subtitle}
          </span>

          {/* Title + price */}
          <div className="flex items-end justify-between gap-2 mt-0.5 mb-1.5">
            <h3 className="font-display text-xl sm:text-2xl uppercase tracking-wide text-white drop-shadow-md leading-tight">
              {product.name}
            </h3>
            <span className="rounded-full bg-white/20 backdrop-blur-md border border-white/30 px-3 py-0.5 text-sm font-display font-bold text-white shadow-md shrink-0 mb-0.5">
              {product.price}
            </span>
          </div>

          {/* Description */}
          <p className="text-xs leading-normal text-white/85 font-normal line-clamp-2 mb-3 drop-shadow">
            {product.desc}
          </p>

          {/* Ingredient tags */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3.5">
              {product.ingredients.slice(0, 3).map((ing) => (
                <span
                  key={ing}
                  className="rounded-full bg-white/20 backdrop-blur-md border border-white/20 px-2.5 py-0.5 text-[9px] font-semibold text-white"
                >
                  {ing}
                </span>
              ))}
            </div>
          )}

          {/* Cart CTA in RED */}
          {qty === 0 ? (
            <button
              id={`add-to-cart-${product.id}`}
              onClick={handleAdd}
              className="w-full h-11 flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-red-700 text-white font-black text-xs uppercase tracking-wider shadow-xl shadow-primary/30 transition-all hover:scale-[1.02] active:scale-[0.97] cursor-pointer border-none"
              aria-label={`Add ${product.name} to cart`}
            >
              <Plus size={16} strokeWidth={3} className="text-white" />
              <span>Add to Cart</span>
            </button>
          ) : (
            <div
              className={`w-full h-11 flex items-center rounded-full overflow-hidden bg-primary text-white shadow-xl shadow-primary/30 transition-transform duration-200 ${pulse ? "scale-[1.03]" : "scale-100"}`}
            >
              <button
                onClick={() => decrement(product.id)}
                aria-label="Remove one"
                className="h-full w-12 flex items-center justify-center text-white hover:bg-red-700 transition-colors shrink-0 cursor-pointer"
              >
                <Minus size={16} strokeWidth={3} />
              </button>
              <div className="flex-1 flex flex-col items-center justify-center">
                <span className="text-base font-black text-white leading-none">{qty}</span>
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/80 leading-none mt-0.5">
                  {qty === 1 ? "item" : "items"}
                </span>
              </div>
              <button
                onClick={() => {
                  increment(product.id);
                  setPulse(true);
                }}
                aria-label="Add one more"
                className="h-full w-12 flex items-center justify-center text-white hover:bg-red-700 transition-colors shrink-0 cursor-pointer border-l border-white/20"
              >
                <Plus size={16} strokeWidth={3} />
              </button>
            </div>
          )}
        </div>
      </article>
    </>
  );
}