import { createFileRoute, Link } from "@tanstack/react-router";
import { JarScene } from "@/components/JarScene";
import { Nav, Footer, waLink } from "@/components/site";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Chenkai Food — Pickles made the slow way" },
      { name: "description", content: "Small-batch South Indian pickles and thokku from Chenkai Food. Order on WhatsApp." },
      { property: "og:title", content: "Chenkai Food — Pickles made the slow way" },
      { property: "og:description", content: "Small-batch South Indian pickles and thokku. Order on WhatsApp." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="relative overflow-x-hidden">
      <Nav />
      <JarScene />

      <section className="relative grid min-h-[100svh] items-end px-4 pb-16 pt-24 md:items-center md:px-8">
        <div className="relative z-20 mx-auto w-full max-w-7xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Est. in our kitchen</p>
          <h1 className="font-display text-[18vw] uppercase leading-[0.85] md:max-w-[55%] md:text-[9vw]">
            Slow<br />made<br /><span className="text-primary">heat.</span>
          </h1>
        </div>
        <span className="absolute bottom-6 right-4 text-xs uppercase tracking-widest md:right-8">Scroll ↓</span>
      </section>

      <section className="relative min-h-[100svh] bg-foreground px-4 py-24 text-background md:px-8">
        <div className="relative z-20 mx-auto grid max-w-7xl md:grid-cols-2">
          <div />
          <div className="mt-[50svh] md:mt-0">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">01 — The jar</p>
            <h2 className="mt-4 font-display text-5xl uppercase leading-none md:text-7xl">Sealed with oil, not shortcuts.</h2>
            <p className="mt-6 max-w-md text-base opacity-80 md:text-lg">
              Every batch is sun-cured, hand-mixed and packed the same day. No preservatives — just salt, spice and gingelly oil.
            </p>
          </div>
        </div>
      </section>

      <section className="relative min-h-[100svh] px-4 py-24 md:px-8">
        <div className="relative z-20 mx-auto grid max-w-7xl md:grid-cols-2">
          <div className="mt-[50svh] md:mt-0">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">02 — The process</p>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {["Pick", "Cure", "Spice", "Seal"].map((s, i) => (
                <li key={s} className="flex items-baseline justify-between py-5">
                  <span className="font-display text-4xl uppercase md:text-6xl">{s}</span>
                  <span className="text-sm text-muted-foreground">0{i + 1}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="relative grid min-h-[100svh] place-items-center bg-primary px-4 py-24 text-center text-primary-foreground md:px-8">
        <div className="relative z-20">
          <h2 className="font-display text-[14vw] uppercase leading-none md:text-[8vw]">Taste it.</h2>
          <div className="mt-[40svh] flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:mt-[38vh]">
            <Link to="/products" className="border-2 border-primary-foreground px-8 py-4 font-semibold uppercase hover:bg-primary-foreground hover:text-primary">
              See products
            </Link>
            <a href={waLink("Hi Chenkai Food, I'd like to place an order.")} target="_blank" rel="noreferrer" className="bg-foreground px-8 py-4 font-semibold uppercase text-background">
              Book now
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
