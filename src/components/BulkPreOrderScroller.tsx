import { waLink } from "@/lib/whatsapp";

interface BulkPreOrderScrollerProps {
  className?: string;
  theme?: "dark" | "red" | "accent";
}

export function BulkPreOrderScroller({ className = "", theme = "red" }: BulkPreOrderScrollerProps) {
  const marqueeItems = [
    {
      badge: "PRE-ORDER EXCLUSIVE",
      text: "Bulk Consignments & Commercial Orders Undertaken Exclusively on Advance Pre-Order",
    },
    {
      badge: "FRESH ARTISANAL RUNS",
      text: "Batches Handcrafted Fresh Upon Reservation • 0% Artificial Preservatives",
    },
    {
      badge: "BESPOKE VOLUMES",
      text: "Tailored Allocations for Weddings, Luxury Catering, Restaurants & Institutional Gifting",
    },
    {
      badge: "AUTHENTIC CURE",
      text: "Direct Coastal Catch Formulated in Collaboration with Fisheries University (TNJFU)",
    },
  ];

  const bgStyles =
    theme === "red"
      ? "bg-gradient-to-r from-red-950 via-primary to-red-900 text-white border-y border-red-700/40 shadow-inner"
      : theme === "dark"
      ? "bg-black text-white border-y border-white/15"
      : "bg-secondary text-foreground border-y border-border/40";

  return (
    <div
      className={`relative z-20 overflow-hidden select-none ${bgStyles} ${className}`}
      role="region"
      aria-label="Bulk order pre-order announcement"
    >
      <a
        href={waLink("Hi Chenkai Foods! I would like to enquire about placing a bulk order on an advance pre-order basis.")}
        target="_blank"
        rel="noreferrer"
        className="marquee-link flex items-center justify-center w-full py-2.5 sm:py-3 group cursor-pointer"
        title="Enquire for bulk pre-orders via WhatsApp"
      >
        <div className="flex overflow-hidden w-full items-center">
          {/* Duplicated list to enable seamless infinite scrolling */}
          <div className="animate-marquee flex items-center shrink-0">
            {[...marqueeItems, ...marqueeItems].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3.5 sm:gap-5 px-4 sm:px-6 shrink-0 leading-none">
                <span className="inline-flex items-center justify-center rounded-full bg-white text-primary font-black uppercase tracking-wider px-3 py-1 text-[10px] sm:text-[10.5px] shadow-sm leading-none shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                  {item.badge}
                </span>

                <span className="text-xs sm:text-sm font-semibold tracking-wide font-sans whitespace-nowrap text-white/95 group-hover:text-white transition-colors leading-none flex items-center">
                  {item.text}
                </span>

                <span className="text-amber-300 font-bold text-xs select-none flex items-center leading-none">✦</span>
              </div>
            ))}
          </div>

          <div className="animate-marquee flex items-center shrink-0" aria-hidden="true">
            {[...marqueeItems, ...marqueeItems].map((item, idx) => (
              <div key={`dup-${idx}`} className="flex items-center gap-3.5 sm:gap-5 px-4 sm:px-6 shrink-0 leading-none">
                <span className="inline-flex items-center justify-center rounded-full bg-white text-primary font-black uppercase tracking-wider px-3 py-1 text-[10px] sm:text-[10.5px] shadow-sm leading-none shrink-0 group-hover:bg-primary group-hover:text-white transition-colors">
                  {item.badge}
                </span>

                <span className="text-xs sm:text-sm font-semibold tracking-wide font-sans whitespace-nowrap text-white/95 group-hover:text-white transition-colors leading-none flex items-center">
                  {item.text}
                </span>

                <span className="text-amber-300 font-bold text-xs select-none flex items-center leading-none">✦</span>
              </div>
            ))}
          </div>
        </div>
      </a>
    </div>
  );
}
