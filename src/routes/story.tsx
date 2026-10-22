import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Sun, Droplets, Flame } from "lucide-react";
import { Nav, Footer, OrderBand, TrustBadges, BulkPreOrderScroller } from "@/components/site";
import { Button } from "@/components/ui/button";
import table from "@/assets/pickle-table.jpg";
import fishImg from "@/assets/fish-pickle.jpg";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story — Chenkai Foods | The Science of Tradition" },
      {
        name: "description",
        content:
          "Discover the Chenkai Foods story by proprietor Dr. R. Navaneethan, Ph.D., in Food Science. Learn how ancient coastal heritage meets food science precision.",
      },
      { property: "og:title", content: "Our Story — Chenkai Foods" },
      {
        property: "og:description",
        content: "The Science of Tradition: Artisanal Seafood & Sun-Cured Dry Fish by Dr. R. Navaneethan, Ph.D.,",
      },
      { property: "og:image", content: "/og-image.jpg" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/og-image.jpg" },
    ],
  }),
  component: Story,
});

function Story() {
  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <Nav />
      <main>
        {/* Hero Section */}
        <section className="relative mt-20 flex min-h-[60svh] items-end py-16 px-4 sm:px-6 md:px-12">
          <img
            src={table}
            width={1536}
            height={1024}
            alt="Chenkai Foods coastal seafood creations"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-foreground/65 backdrop-blur-[2px]" />
          <div className="page-width relative z-10 w-full text-primary-foreground">
            <p className="eyebrow text-primary-foreground/90 font-bold mb-3">Founder's Heritage</p>
            <h1 className="font-display text-3xl uppercase leading-tight sm:text-6xl md:text-7xl break-words">
              The Science of<br />
              <span className="text-primary">Tradition.</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm md:text-base leading-relaxed text-primary-foreground/90 font-medium">
              Where ancient coastal heritage meets food science precision. Guided by proprietor <span className="whitespace-nowrap">Dr. R. Navaneethan, Ph.D.,</span> in Food Science & Technology.
            </p>
          </div>
        </section>

        {/* Narrative Section 1 */}
        <section className="section-space">
          <div className="page-width grid gap-10 md:grid-cols-2 md:gap-20 items-center">
            <div>
              <span className="eyebrow text-primary">01 / Heritage & Precision</span>
              <h2 className="section-heading mt-3">Culinary Luxury,<br />Perfected.</h2>
              <p className="mt-6 text-sm md:text-base leading-relaxed text-muted-foreground indent-6 sm:indent-8">
                At Chenkai Foods, we believe that true culinary luxury is born where ancient coastal heritage meets uncompromising precision. Rooted in the rich, maritime legacy of the southern coast, our artisanal seafood creations—from our signature fish and prawn pickles to our premium dry fish selections—are masterpieces of authentic flavor, perfected over generations.
              </p>
            </div>
            <div className="rounded-3xl glass-panel border border-border/30 p-6 sm:p-8 shadow-xl">
              <blockquote className="font-display text-lg sm:text-xl md:text-2xl uppercase leading-snug text-foreground">
                "The traditional seafood preservation methods of our ancestors were not just folklore; they were a masterful, exact science."
              </blockquote>
              <p className="mt-4 text-xs font-bold uppercase tracking-wider text-primary">
                — <span className="whitespace-nowrap">Dr. R. Navaneethan, Ph.D.,</span> in Food Science & Technology
              </p>
            </div>
          </div>
        </section>

        {/* Dr. Navaneethan Highlight Card */}
        <section className="bg-foreground text-background py-14 sm:py-20 px-4 sm:px-8 md:px-12 my-10 sm:my-12 rounded-3xl mx-3 sm:mx-4 max-w-7xl lg:mx-auto shadow-xl">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-20 items-center">
              <div>
                <span className="eyebrow text-primary">02 / The Founder's Vision</span>
                <h2 className="mt-4 font-display text-2xl sm:text-3xl md:text-4xl tracking-tight text-background break-words">
                  <span className="whitespace-nowrap">Dr. R. Navaneethan,</span> <span className="text-primary font-bold whitespace-nowrap">Ph.D.,</span>
                </h2>
                <p className="mt-6 text-sm md:text-base leading-relaxed text-background/80 indent-6 sm:indent-8">
                  The soul of Chenkai Foods is shaped by our proprietor, <span className="whitespace-nowrap">Dr. R. Navaneethan, Ph.D.,</span> in Food Science and Technology. Armed with a doctorate in food science and a deep reverence for his family’s culinary lineage, <span className="whitespace-nowrap">Dr. Navaneethan</span> recognized a profound truth.
                </p>
                <p className="mt-4 text-sm md:text-base leading-relaxed text-background/80 indent-6 sm:indent-8">
                  He founded Chenkai Foods to elevate heirloom coastal delicacies to the highest modern standards of safety, quality, and absolute purity. Under his expert vision, every product we craft honors the delicate chemistry of flavor.
                </p>
              </div>

              <div className="space-y-6 border-t border-background/20 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary text-primary-foreground font-bold text-base rounded-xl shrink-0">01</div>
                  <div>
                    <h3 className="font-display text-base sm:text-lg uppercase text-background">Wild Ocean Harvests</h3>
                    <p className="mt-1 text-xs text-background/70">Only wild-caught ocean fish and prawns for pristine texture and deep natural umami that farm-raised seafood cannot match.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary text-primary-foreground font-bold text-base rounded-xl shrink-0">02</div>
                  <div>
                    <h3 className="font-display text-base sm:text-lg uppercase text-background">Single-Origin Spices</h3>
                    <p className="mt-1 text-xs text-background/70">Meticulously prepared using hand-pounded spices, vibrant sun-dried red chilies, and earthy organic turmeric.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary text-primary-foreground font-bold text-base rounded-xl shrink-0">03</div>
                  <div>
                    <h3 className="font-display text-base sm:text-lg uppercase text-background">Zero Artificial Shortcuts</h3>
                    <p className="mt-1 text-xs text-background/70">Strict rejection of taste enhancers, MSG, sodium benzoate, synthetic colors, or chemical stabilizers.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Process & Alchemy Section */}
        <section className="section-space">
          <div className="page-width">
            <div className="max-w-3xl">
              <span className="eyebrow text-primary">03 / Art & Science</span>
              <h2 className="section-heading mt-3">The Alchemy of Pure Preserves.</h2>
              <p className="mt-6 text-sm md:text-base leading-relaxed text-muted-foreground indent-6 sm:indent-8">
                Because we view food as both an art and a science, there are absolutely no shortcuts in the Chenkai kitchen. Instead, our scientific approach relies entirely on optimizing the natural alchemy of pure sea salt, premium natural oils, and age-old sun-curing techniques.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-border/30 glow-hover">
                <div className="p-3.5 bg-primary/10 text-primary w-fit rounded-2xl">
                  <Droplets size={24} />
                </div>
                <h3 className="font-display text-lg sm:text-xl uppercase mt-5">Pure Oils & Salt</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Using cold-pressed natural oils and unrefined sea salt to create a natural, sterile environment that locks in ocean freshness.
                </p>
              </div>

              <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-border/30 glow-hover">
                <div className="p-3.5 bg-primary/10 text-primary w-fit rounded-2xl">
                  <Sun size={24} />
                </div>
                <h3 className="font-display text-lg sm:text-xl uppercase mt-5">Hygienic Sun-Curing</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Sun-drying Anchovy (Nethili), Seer Fish (Vanjaram), and Baby Prawns (Chenakunni) under controlled solar conditions.
                </p>
              </div>

              <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-border/30 glow-hover">
                <div className="p-3.5 bg-primary/10 text-primary w-fit rounded-2xl">
                  <Flame size={24} />
                </div>
                <h3 className="font-display text-lg sm:text-xl uppercase mt-5">Slow Small-Batch Aging</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Each batch is slow-crafted and naturally aged, allowing fiery earth spices and bold ocean essence to marry perfectly.
                </p>
              </div>
            </div>

            <div className="mt-12">
              <TrustBadges />
            </div>
          </div>
        </section>

        {/* Section 04: Institutional Collaboration with TNJFU */}
        <section className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black text-white py-14 sm:py-20 px-4 sm:px-8 md:px-12 my-10 sm:my-12 rounded-3xl mx-3 sm:mx-4 max-w-7xl lg:mx-auto border border-primary/25 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
          <div className="relative z-10 page-width">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16 items-center">
              <div>
                <span className="eyebrow text-primary">04 / Institutional Partnership</span>
                <h2 className="font-display text-2xl sm:text-4xl md:text-5xl uppercase leading-tight text-white break-words">
                  Manufacturing in Collaboration with <span className="text-primary block sm:inline">Tamil Nadu <span className="whitespace-nowrap">Dr. J. Jayalalithaa</span> Fisheries University, Nagapattinam.</span>
                </h2>
                <p className="mt-3 text-xs sm:text-sm font-semibold uppercase tracking-wider text-white/70">
                  Tamil Nadu <span className="whitespace-nowrap">Dr. J. Jayalalithaa</span> Fisheries University, Nagapattinam
                </p>
                <p className="mt-6 text-sm md:text-base leading-relaxed text-white/80 indent-6 sm:indent-8">
                  To merge ancient culinary artisanal wisdom with modern food security protocols, Chenkai Foods works in close manufacturing and technology incubation collaboration with <strong className="text-white">Tamil Nadu <span className="whitespace-nowrap">Dr. J. Jayalalithaa</span> Fisheries University (TNJFU), Nagapattinam</strong> — Tamil Nadu's apex government institution for fisheries research and aquatic sciences.
                </p>
                <p className="mt-4 text-sm md:text-base leading-relaxed text-white/80 indent-6 sm:indent-8">
                  Under this collaborative framework, our production leverages university-standard hygienic processing, controlled solar-tunnel drying technologies, and systematic microbial testing. This scientific partnership guarantees that every jar of seafood pickle and packet of sun-cured dry fish reaches your table in its purest, safest, and most flavorful form — completely free from taste enhancers, MSG, and sodium benzoate.
                </p>

                <div className="mt-8 flex flex-wrap gap-2.5 sm:gap-4">
                  <div className="flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold text-white backdrop-blur-sm border border-white/10">
                    <span className="text-primary font-bold">✓</span> Clinical Solar Drying
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold text-white backdrop-blur-sm border border-white/10">
                    <span className="text-primary font-bold">✓</span> Incubation Oversight
                  </div>
                  <div className="flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-semibold text-white backdrop-blur-sm border border-white/10">
                    <span className="text-primary font-bold">✓</span> Certified Food Safety
                  </div>
                </div>
              </div>

              {/* University Logo Card — Emblem floats directly with drop-shadow, not inside another box */}
              <div className="flex flex-col items-center justify-center p-6 sm:p-12 rounded-3xl bg-white/5 border border-white/15 backdrop-blur-md shadow-2xl text-center">
                <div className="mb-6 flex items-center justify-center">
                  <img
                    src="/tnjfu-logo.png"
                    alt="Tamil Nadu Dr. J. Jayalalithaa Fisheries University (TNJFU), Nagapattinam"
                    width={180}
                    height={180}
                    className="h-28 w-28 sm:h-40 sm:w-40 object-contain filter drop-shadow-[0_16px_32px_rgba(0,0,0,0.6)]"
                  />
                </div>
                <h3 className="font-display text-base sm:text-xl uppercase tracking-wider text-white">
                  Tamil Nadu <span className="whitespace-nowrap">Dr. J. Jayalalithaa</span> Fisheries University, Nagapattinam Collaboration
                </h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-widest text-primary">
                  Educate · Innovate · Elevate
                </p>
                <p className="mt-4 text-xs leading-relaxed text-white/70 max-w-sm">
                  Apex state fisheries university empowering indigenous coastal enterprises through state-of-the-art marine processing and hygienic preservation technologies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Product Link */}
        <section className="bg-secondary/60 py-14 sm:py-20 px-4 sm:px-8 md:px-12 my-10 sm:my-12 rounded-3xl mx-3 sm:mx-4 max-w-7xl lg:mx-auto">
          <div className="page-width grid items-center gap-10 md:grid-cols-2 md:gap-16">
            <img
              src={fishImg}
              alt="Chenkai Foods Artisanal Fish Pickle"
              width={1024}
              height={1024}
              loading="lazy"
              className="aspect-square w-full object-cover rounded-3xl border border-border/30 shadow-xl"
            />
            <div>
              <span className="eyebrow text-primary">Taste the Purity</span>
              <h2 className="section-heading mt-3">An Uncompromising Experience.</h2>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground md:text-base indent-6 sm:indent-8">
                When you experience Chenkai Food, you are tasting the culmination of a food scientist's demand for absolute purity and a coastal family's devotion to taste. It is an uncompromising, luxurious experience, crafted for the connoisseur who understands that the finest seafood can never be rushed.
              </p>
              <Button asChild size="lg" className="mt-8 rounded-full px-8 shadow-lg font-semibold text-xs uppercase tracking-wider w-full sm:w-auto text-center justify-center">
                <Link to="/products">
                  Explore the Seafood Collection <ArrowUpRight />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <BulkPreOrderScroller />
      <OrderBand />
      <Footer />
    </div>
  );
}
