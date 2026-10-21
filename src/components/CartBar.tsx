import {
  ShoppingBag,
  X,
  Plus,
  Minus,
  ArrowRight,
  Trash2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import { waLink } from "@/lib/whatsapp";
import { useState, useEffect } from "react";

// WhatsApp SVG icon (inline so no extra dep needed)
function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function CartBar() {
  const { items, count, increment, decrement, remove, clear } = useCart();
  const [open, setOpen] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Flash animation when item count increases
  useEffect(() => {
    if (count > 0) {
      setJustAdded(true);
      const t = setTimeout(() => setJustAdded(false), 600);
      return () => clearTimeout(t);
    }
  }, [count]);

  // Close drawer on outside click / escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (count === 0) return null;

  const waMessage = () => {
    const lines = items
      .map((i) => `• ${i.product.name} (${i.product.price} / ${i.product.weight}) × ${i.qty}`)
      .join("\n");
    return `Hi Chenkai Foods! I'd like to order:\n\n${lines}\n\nPlease confirm availability and share delivery details. Thank you!`;
  };

  return (
    <>
      {/* ── Backdrop (only when drawer open) ─────────────────────────── */}
      {open && (
        <div
          className="fixed inset-0 z-[9988] bg-black/40 backdrop-blur-[2px]"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Floating container — bottom margin keeps it off the edge ─── */}
      <div
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9989] w-[calc(100%-2rem)] max-w-md"
        style={{ filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.22))" }}
      >
        {/* ── Drawer Panel (slides up from above the pill) ────────────── */}
        <div
          className={`overflow-hidden rounded-[1.4rem] bg-white border border-zinc-100 shadow-2xl transition-all duration-300 ease-out origin-bottom ${
            open
              ? "max-h-[75svh] opacity-100 mb-2"
              : "max-h-0 opacity-0 mb-0 pointer-events-none"
          }`}
          aria-label="Cart drawer"
        >
          <div className="overflow-y-auto overscroll-contain max-h-[72svh]">
            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 flex items-center justify-between px-5 pt-4 pb-3 border-b border-zinc-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <ShoppingBag size={15} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-wider text-foreground leading-none">
                    Your Order
                  </p>
                  <p className="text-[10px] text-muted-foreground font-medium mt-0.5">
                    {count} {count === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={clear}
                  aria-label="Clear all items"
                  className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-zinc-400 hover:text-red-500 transition-colors rounded-full px-2.5 py-1.5 hover:bg-red-50"
                >
                  <Trash2 size={11} />
                  Clear
                </button>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="w-7 h-7 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center text-zinc-500 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* Items */}
            <ul className="px-4 py-2 divide-y divide-zinc-50">
              {items.map((item) => (
                <li key={item.product.id} className="py-3.5 flex items-center gap-3">
                  {/* Thumbnail */}
                  <div className="relative shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-[52px] h-[52px] rounded-2xl object-cover border border-zinc-100"
                    />
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center leading-none">
                      {item.qty}
                    </span>
                  </div>

                  {/* Name + price */}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-foreground leading-tight truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-primary font-bold mt-0.5">
                      {item.product.price}
                    </p>
                  </div>

                  {/* Qty stepper — Swiggy style */}
                  <div className="flex items-center gap-0 rounded-full bg-primary overflow-hidden shrink-0 shadow-sm">
                    <button
                      onClick={() => decrement(item.product.id)}
                      aria-label="Remove one"
                      className="w-8 h-8 flex items-center justify-center text-white hover:bg-red-700 transition-colors"
                    >
                      <Minus size={13} strokeWidth={3} />
                    </button>
                    <span className="w-6 text-center text-xs font-black text-white select-none">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => increment(item.product.id)}
                      aria-label="Add one more"
                      className="w-8 h-8 flex items-center justify-center text-white hover:bg-red-700 transition-colors"
                    >
                      <Plus size={13} strokeWidth={3} />
                    </button>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => remove(item.product.id)}
                    aria-label={`Remove ${item.product.name}`}
                    className="w-6 h-6 rounded-full bg-zinc-100 hover:bg-red-100 flex items-center justify-center text-zinc-400 hover:text-red-500 transition-colors shrink-0"
                  >
                    <X size={11} />
                  </button>
                </li>
              ))}
            </ul>

            {/* Add More Products button — leads to /products */}
            <div className="mx-4 my-2 p-3 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-700">Missed anything?</span>
              <Link
                to="/products"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-1.5 text-xs font-black text-primary hover:text-red-700 bg-white border border-red-200/80 hover:bg-red-50 px-3.5 py-1.5 rounded-full shadow-sm transition-all"
              >
                <Plus size={13} strokeWidth={3} />
                <span>Add More</span>
              </Link>
            </div>

            {/* WhatsApp CTA */}
            <div className="px-4 pb-4 pt-2">
              <a
                href={waLink(waMessage())}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="w-full flex items-center justify-center gap-2.5 rounded-full bg-primary hover:bg-red-700 text-white font-bold text-sm py-3.5 px-5 shadow-lg shadow-primary/30 transition-all hover:scale-[1.01] active:scale-[0.98]"
              >
                <WhatsAppIcon size={18} />
                <span>Send Order on WhatsApp</span>
                <ArrowRight size={15} />
              </a>
              <p className="text-center text-[10px] text-zinc-400 font-medium mt-2.5">
                Your full order list will be sent automatically
              </p>
            </div>
          </div>
        </div>

        {/* ── Floating Pill — always visible when cart has items ───────── */}
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label={open ? "Close cart" : "View cart"}
          className={`w-full flex items-center justify-between rounded-[1.4rem] px-4 py-3 cursor-pointer transition-all duration-200 active:scale-[0.98] select-none
            bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-white
            shadow-[0_4px_24px_rgba(0,0,0,0.28)]
            ${justAdded ? "scale-[1.02]" : "scale-100"}
          `}
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          {/* Left: bag + count + label */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={`w-9 h-9 rounded-xl bg-primary flex items-center justify-center transition-transform duration-200 ${justAdded ? "scale-110" : "scale-100"}`}>
                <ShoppingBag size={17} className="text-white" />
              </div>
              <span className="absolute -top-1 -right-1 bg-white text-primary text-[9px] font-black rounded-full w-4 h-4 flex items-center justify-center leading-none border border-zinc-200">
                {count}
              </span>
            </div>
            <div className="text-left">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/50 leading-none">
                {count} {count === 1 ? "item" : "items"} added
              </p>
              <p className="text-sm font-black text-white leading-tight mt-0.5">
                View your order
              </p>
            </div>
          </div>

          {/* Right: action hint */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/60 hidden sm:inline">
              {open ? "Close" : "Review"}
            </span>
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
              {open ? (
                <ChevronDown size={14} className="text-white" />
              ) : (
                <ChevronUp size={14} className="text-white" />
              )}
            </div>
          </div>
        </button>
      </div>
    </>
  );
}
