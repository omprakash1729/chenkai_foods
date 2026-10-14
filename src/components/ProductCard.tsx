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
    <article className="group relative flex min-w-0 flex-col overflow-hidden rounded-[2rem] aspect-[3/4] max-h-[500px] bg-card shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_-10px_rgba(220,38,38,0.35)]">
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
              <span key={ing} className="rounded-full bg-white/20 backdrop-blur-md border border-white/20 px-2.5 py-0.5 text-[9px] font-semibold text-white">
                {ing}
              </span>
            ))}
          </div>
        )}

        {/* ── Cart CTA in RED ────────────────────────────────────────── */}
        {qty === 0 ? (
          /* ADD button — RED with white text & icon */
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
          /* QTY STEPPER in RED — Swiggy style: [−] count [+] */
          <div
            className={`w-full h-11 flex items-center rounded-full overflow-hidden bg-primary text-white shadow-xl shadow-primary/30 transition-transform duration-200 ${pulse ? "scale-[1.03]" : "scale-100"}`}
          >
            {/* Minus */}
            <button
              onClick={() => decrement(product.id)}
              aria-label="Remove one"
              className="h-full w-12 flex items-center justify-center text-white hover:bg-red-700 transition-colors shrink-0 cursor-pointer"
            >
              <Minus size={16} strokeWidth={3} />
            </button>

            {/* Count + label */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <span className="text-base font-black text-white leading-none">{qty}</span>
              <span className="text-[9px] font-bold uppercase tracking-widest text-white/80 leading-none mt-0.5">
                {qty === 1 ? "item" : "items"}
              </span>
            </div>

            {/* Plus */}
            <button
              onClick={() => { increment(product.id); setPulse(true); }}
              aria-label="Add one more"
              className="h-full w-12 flex items-center justify-center text-white hover:bg-red-700 transition-colors shrink-0 cursor-pointer border-l border-white/20"
            >
              <Plus size={16} strokeWidth={3} />
            </button>
          </div>
        )}
      </div>
    </article>
  );
}