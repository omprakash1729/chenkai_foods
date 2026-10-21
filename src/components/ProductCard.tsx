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
      {/* ── Mobile 2-Column Swiggy Instamart / Blinkit Style Card (< sm) ── */}
      <article className="flex sm:hidden relative flex-col justify-between rounded-2xl bg-white border border-zinc-200/90 shadow-sm p-2.5 transition-all">
        {/* Top: Square Product Image */}
        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-zinc-50 border border-zinc-100">
          <img
            src={product.image}
            alt={product.imageAlt ?? product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          {/* Subtle category badge */}
          <span className="absolute top-1.5 left-1.5 rounded-full bg-black/75 backdrop-blur-xs px-2 py-0.5 text-[8.5px] font-bold uppercase tracking-wider text-white">
            {product.category === "Pickles" ? "Pickle" : "Dry Fish"}
          </span>
        </div>

        {/* Middle: Details */}
        <div className="flex-1 flex flex-col justify-between mt-2 min-h-[56px]">
          <div>
            <h3 className="font-bold text-xs text-zinc-900 leading-snug line-clamp-2">
              {product.name}
            </h3>
            {product.weight && (
              <p className="text-[10px] text-zinc-500 font-semibold mt-0.5">
                {product.weight}
              </p>
            )}
          </div>
          <div className="mt-1.5 flex items-center justify-between">
            <span className="font-black text-xs text-zinc-900">
              {product.price}
            </span>
          </div>
        </div>

        {/* Bottom: Perfectly Symmetrical Swiggy Instamart Button */}
        <div className="mt-2.5 w-full">
          {qty === 0 ? (
            <button
              id={`add-to-cart-mob-${product.id}`}
              onClick={handleAdd}
              className="w-full h-8 flex items-center justify-center gap-1.5 rounded-xl bg-primary hover:bg-red-700 active:scale-95 text-white font-black text-xs uppercase tracking-wider shadow-sm transition-all border-none cursor-pointer"
              aria-label={`Add ${product.name} to cart`}
            >
              <Plus size={13} strokeWidth={3} />
              <span>ADD</span>
            </button>
          ) : (
            <div
              className={`w-full h-8 flex items-center justify-between rounded-xl bg-primary text-white shadow-sm overflow-hidden transition-transform duration-200 ${pulse ? "scale-105" : "scale-100"}`}
            >
              <button
                onClick={() => decrement(product.id)}
                aria-label="Decrease quantity"
                className="w-8 h-full flex items-center justify-center text-white hover:bg-red-700 active:scale-90 transition-all cursor-pointer"
              >
                <Minus size={13} strokeWidth={3} />
              </button>
              <span className="flex-1 text-center font-black text-xs leading-none select-none">
                {qty}
              </span>
              <button
                onClick={() => {
                  increment(product.id);
                  setPulse(true);
                }}
                aria-label="Increase quantity"
                className="w-8 h-full flex items-center justify-center text-white hover:bg-red-700 active:scale-90 transition-all cursor-pointer"
              >
                <Plus size={13} strokeWidth={3} />
              </button>
            </div>
          )}
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
              {product.price} <span className="text-[11px] font-sans font-normal opacity-90">/ {product.weight}</span>
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