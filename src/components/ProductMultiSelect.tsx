import { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, Plus, Minus, Search, X, Package } from "lucide-react";
import { products, type Product } from "@/lib/products";

export type SelectedProductItem = {
  productId: string;
  name: string;
  category: string;
  image: string;
  price: string;
  weight: string;
  qty: number;
};

// Available variants & weights per product type
export function getAvailableWeights(productId: string, category: string): string[] {
  if (productId === "all-sampler") {
    return [
      "3-Jar Pickle Sampler Pack",
      "5-Item Dry Fish Discovery Pack",
      "Complete 11-Product Showcase Box",
    ];
  }
  if (productId === "custom-bulk") {
    return [
      "5 kg Commercial Pack",
      "10 kg Restaurant / Wholesale",
      "25 kg+ Institutional Supply",
      "Custom Quantity (Specify in message)",
    ];
  }
  if (category === "Pickles") {
    return [
      "250g Jar (Standard)",
      "500g Jar (Family Value)",
      "1 kg Jar (Bulk / Gifting)",
    ];
  }
  if (productId === "vanjaram-dry-fish") {
    return [
      "250g Standard Pack",
      "500g Premium Pack",
      "1 kg Wholesale Bulk",
    ];
  }
  if (productId === "massi-karuvadu") {
    return [
      "150g Standard Jar",
      "300g Double Pack",
      "1 kg Bulk Pack",
    ];
  }
  return [
    "100g Trial Pack",
    "200g Standard Pack",
    "500g Value Pack",
    "1 kg Bulk Wholesale",
  ];
}

// Special catalogue additions
const specialOptions = [
  {
    id: "all-sampler",
    name: "All Products Sampler Pack",
    subtitle: "Curated Variety Pack",
    tag: "Sampler",
    desc: "A taste of everything — curated selection of seafood pickles and sun-cured dry fish.",
    price: "Custom Sampler",
    image: "/logo-white.png",
    category: "Special" as const,
    ingredients: [],
  },
  {
    id: "custom-bulk",
    name: "Custom Bulk / Wholesale Order",
    subtitle: "Restaurants & Events",
    tag: "Wholesale",
    desc: "Commercial volumes, custom packaging, and wholesale sea harvest allocations.",
    price: "Wholesale Pricing",
    image: "/logo-white.png",
    category: "Special" as const,
    ingredients: [],
  },
];

interface ProductMultiSelectProps {
  selectedItems: SelectedProductItem[];
  onChange: (items: SelectedProductItem[]) => void;
}

export function ProductMultiSelect({ selectedItems, onChange }: ProductMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<"All" | "Pickles" | "Dry Fish" | "Special">("All");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const allItems = [
    ...products.map((p) => ({
      id: p.id,
      name: p.name,
      price: p.price,
      category: p.category as "Pickles" | "Dry Fish" | "Special",
      image: p.image,
      tag: p.tag,
    })),
    ...specialOptions,
  ];

  const filteredItems = allItems.filter((item) => {
    const matchesCategory = filterCategory === "All" || item.category === filterCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()) ||
      item.tag.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const isSelected = (id: string) => selectedItems.some((i) => i.productId === id);

  const toggleProduct = (item: (typeof allItems)[0]) => {
    if (isSelected(item.id)) {
      onChange(selectedItems.filter((i) => i.productId !== item.id));
    } else {
      const weights = getAvailableWeights(item.id, item.category);
      const newItem: SelectedProductItem = {
        productId: item.id,
        name: item.name,
        category: item.category,
        image: item.image,
        price: item.price,
        weight: weights[0] || "Standard",
        qty: 1,
      };
      onChange([...selectedItems, newItem]);
    }
  };

  const updateWeight = (productId: string, weight: string) => {
    onChange(
      selectedItems.map((i) => (i.productId === productId ? { ...i, weight } : i))
    );
  };

  const updateQty = (productId: string, delta: number) => {
    onChange(
      selectedItems
        .map((i) => {
          if (i.productId === productId) {
            const next = i.qty + delta;
            return next > 0 ? { ...i, qty: next } : null;
          }
          return i;
        })
        .filter((i): i is SelectedProductItem => i !== null)
    );
  };

  const removeItem = (productId: string) => {
    onChange(selectedItems.filter((i) => i.productId !== productId));
  };

  return (
    <div className="space-y-3" ref={dropdownRef}>
      {/* ── Custom Dropdown Trigger ──────────────────────────────────── */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-haspopup="listbox"
          aria-expanded={open}
          className="w-full flex items-center justify-between rounded-2xl border border-red-200/90 bg-red-50/70 dark:bg-red-950/20 dark:border-red-900/40 px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-card transition-all cursor-pointer text-left shadow-sm"
        >
          <div className="flex items-center gap-2 overflow-hidden pr-2">
            <Package size={17} className="text-primary shrink-0" />
            {selectedItems.length === 0 ? (
              <span className="text-muted-foreground font-medium truncate">
                Click to select products (Pickles, Dry Fish, Samplers)...
              </span>
            ) : (
              <span className="font-bold text-foreground truncate">
                <span className="text-primary">{selectedItems.length}</span>{" "}
                {selectedItems.length === 1 ? "product" : "products"} selected — click to add/change
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {selectedItems.length > 0 && (
              <span className="bg-primary text-white text-[10px] font-black rounded-full px-2 py-0.5 leading-none shadow-sm">
                {selectedItems.length}
              </span>
            )}
            <ChevronDown
              size={17}
              className={`text-muted-foreground transition-transform duration-200 ${
                open ? "rotate-180 text-primary" : ""
              }`}
            />
          </div>
        </button>

        {/* ── Dropdown Panel ───────────────────────────────────────────── */}
        {open && (
          <div
            className="absolute left-0 right-0 top-full mt-2 z-50 rounded-2xl border border-red-200/90 bg-card shadow-2xl overflow-hidden backdrop-blur-xl dark:border-red-900/40 animate-in fade-in-50 zoom-in-95 duration-150"
            role="listbox"
          >
            {/* Search + Category Tabs */}
            <div className="p-3 bg-red-50/50 dark:bg-red-950/30 border-b border-red-100 dark:border-red-900/30 space-y-2.5">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-full rounded-xl border border-red-200/80 bg-background pl-8 pr-8 py-2 text-xs text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"
                  autoFocus
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>

              {/* Category Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none text-[11px] font-bold uppercase tracking-wider">
                {(["All", "Pickles", "Dry Fish", "Special"] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFilterCategory(cat)}
                    className={`rounded-full px-3 py-1 transition-all cursor-pointer whitespace-nowrap ${
                      filterCategory === cat
                        ? "bg-primary text-white shadow-sm"
                        : "bg-background/80 text-muted-foreground hover:text-foreground border border-border/40"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Product List */}
            <div className="max-h-64 overflow-y-auto overscroll-contain p-2 divide-y divide-border/20">
              {filteredItems.length === 0 ? (
                <div className="py-6 text-center text-xs text-muted-foreground">
                  No products found matching &ldquo;{search}&rdquo;
                </div>
              ) : (
                filteredItems.map((item) => {
                  const checked = isSelected(item.id);
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => toggleProduct(item)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-all text-left cursor-pointer ${
                        checked
                          ? "bg-primary/10 text-foreground font-semibold"
                          : "hover:bg-red-50/50 dark:hover:bg-red-950/20 text-foreground"
                      }`}
                      role="option"
                      aria-selected={checked}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Checkbox */}
                        <div
                          className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${
                            checked
                              ? "bg-primary border-primary text-white"
                              : "border-red-300 dark:border-red-800 bg-background"
                          }`}
                        >
                          {checked && <Check size={12} strokeWidth={3} />}
                        </div>

                        {/* Thumbnail */}
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded-xl object-cover border border-border/30 shrink-0 bg-zinc-900"
                        />

                        {/* Info */}
                        <div className="min-w-0">
                          <p className="text-xs font-bold truncate leading-tight">
                            {item.name}
                          </p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-[10px] text-primary font-bold">
                              {item.price}
                            </span>
                            <span className="text-[9px] uppercase tracking-wider text-muted-foreground bg-muted/60 px-1.5 py-0.2 rounded-md">
                              {item.category}
                            </span>
                          </div>
                        </div>
                      </div>

                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider shrink-0 px-2 py-1 rounded-lg ${
                          checked
                            ? "text-primary"
                            : "text-muted-foreground"
                        }`}
                      >
                        {checked ? "Added ✓" : "+ Add"}
                      </span>
                    </button>
                  );
                })
              )}
            </div>

            {/* Bottom Done Bar */}
            <div className="p-2.5 bg-red-50/50 dark:bg-red-950/30 border-t border-red-100 dark:border-red-900/30 flex items-center justify-between text-xs">
              <span className="text-muted-foreground text-[11px]">
                {selectedItems.length} selected
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full bg-primary hover:bg-red-700 text-white font-bold text-xs px-4 py-1.5 shadow-sm transition-all"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Selected Items Configuration Cards (Variant/Weight + Quantity) ── */}
      {selectedItems.length > 0 && (
        <div className="space-y-2 mt-3 pt-1">
          <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center justify-between">
            <span>Configure Weights & Quantities ({selectedItems.length}):</span>
            <span className="text-[10px] text-primary font-normal">Choose weight for each</span>
          </p>

          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {selectedItems.map((item) => {
              const weights = getAvailableWeights(item.productId, item.category);
              return (
                <div
                  key={item.productId}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-2xl border border-red-200/90 bg-red-50/60 dark:bg-red-950/20 dark:border-red-900/40 shadow-sm"
                >
                  {/* Left: Thumbnail + Title */}
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-xl object-cover border border-border/30 shrink-0 bg-zinc-900"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-foreground leading-tight truncate">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        {item.category} · Base: <span className="text-primary font-bold">{item.price}</span>
                      </p>
                    </div>
                  </div>

                  {/* Right: Weight selector + Qty Stepper + Delete */}
                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    {/* Weight / Variant dropdown */}
                    <div className="relative">
                      <select
                        aria-label={`Select weight or variant for ${item.name}`}
                        value={item.weight}
                        onChange={(e) => updateWeight(item.productId, e.target.value)}
                        className="rounded-xl border border-red-200 bg-white dark:bg-card px-2.5 py-1.5 text-xs font-bold text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 shadow-xs cursor-pointer pr-7"
                      >
                        {weights.map((w) => (
                          <option key={w} value={w}>
                            {w}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={12}
                        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground"
                      />
                    </div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center rounded-full bg-primary text-white shadow-sm overflow-hidden h-7">
                      <button
                        type="button"
                        onClick={() => updateQty(item.productId, -1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="w-6 h-full flex items-center justify-center hover:bg-red-700 transition-colors"
                      >
                        <Minus size={11} strokeWidth={3} />
                      </button>
                      <span className="w-5 text-center text-xs font-black select-none">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.productId, 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                        className="w-6 h-full flex items-center justify-center hover:bg-red-700 transition-colors"
                      >
                        <Plus size={11} strokeWidth={3} />
                      </button>
                    </div>

                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => removeItem(item.productId)}
                      aria-label={`Remove ${item.name}`}
                      className="w-7 h-7 rounded-full bg-white dark:bg-card border border-red-200/80 hover:bg-red-100 flex items-center justify-center text-zinc-400 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <X size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
