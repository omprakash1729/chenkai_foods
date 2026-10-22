import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, MessageCircle, Phone, MapPin, CheckCircle2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Nav, Footer, waLink, BulkPreOrderScroller } from "@/components/site";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/products";
import { ProductMultiSelect, type SelectedProductItem } from "@/components/ProductMultiSelect";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Product Enquiries — Chenkai Foods" },
      {
        name: "description",
        content:
          "Contact Chenkai Foods for product enquiries, retail orders, and bulk availability on WhatsApp (+91 63743 92488).",
      },
      { property: "og:title", content: "Contact & Enquiries — Chenkai Foods" },
      {
        property: "og:description",
        content: "Place your order or enquiry for Fish Pickle, Prawn Pickle & Dry Fish on WhatsApp.",
      },
      { property: "og:image", content: "/og-image.jpg" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/og-image.jpg" },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [selectedProducts, setSelectedProducts] = useState<SelectedProductItem[]>([
    {
      productId: products[0]?.id || "prawn-pickle",
      name: products[0]?.name || "Prawn Pickle",
      category: products[0]?.category || "Pickles",
      image: products[0]?.image || "",
      price: `${products[0]?.price || "₹180"} / ${products[0]?.weight || "180 g"}`,
      weight: `${products[0]?.weight || "180 g"} Jar (Standard)`,
      qty: 1,
    },
  ]);

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (selectedProducts.length === 0) {
      alert("Please select at least one product before submitting your enquiry.");
      return;
    }
    setSubmitted(true);
  };

  const constructWaMessage = () => {
    const productLines =
      selectedProducts.length > 0
        ? selectedProducts
            .map((p) => `• ${p.name} — ${p.weight} × ${p.qty}`)
            .join("\n")
        : "• General Seafood Enquiry";

    const totalQty = selectedProducts.reduce((sum, p) => sum + p.qty, 0);

    return `Hi Chenkai Foods Team,
I would like to place an enquiry / order:

- Name: ${formData.name || "Customer"}
- Phone: ${formData.phone || "Not provided"}
- Email: ${formData.email || "Not provided"}

- Products & Weights Selected (${totalQty} ${totalQty === 1 ? "item" : "items"}):
${productLines}

- Message / Special Instructions:
${formData.message || "Please share availability and shipping timeline."}`;
  };

  return (
    <div className="bg-background text-foreground overflow-x-hidden">
      <Nav />
      <main className="page-width pb-24 pt-28 sm:pt-36">
        <span className="eyebrow text-primary">Orders & Product Enquiries</span>
        <h1 className="mt-2 font-display text-3xl sm:text-5xl md:text-6xl uppercase leading-tight tracking-wide break-words">
          Get in Touch with<br />
          <span className="text-primary">Chenkai Foods.</span>
        </h1>

        <div className="mt-10 sm:mt-12 grid gap-8 sm:gap-12 md:grid-cols-2 md:gap-16">
          {/* Left Side: Contact Information */}
          <div>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground font-normal">
              Have a question about our seafood pickles, sun-cured dry fish, or custom bulk orders? Our team is available to assist you.
            </p>

            <div className="mt-8 space-y-6 bg-card p-5 sm:p-8 border border-border/30 rounded-3xl shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-2xl shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="font-display text-base uppercase">WhatsApp & Phone</h3>
                  <a
                    href="tel:+916374392488"
                    className="mt-1 block text-base font-bold text-foreground hover:text-primary transition-colors"
                  >
                    +91 63743 92488
                  </a>
                  <span className="text-xs text-muted-foreground">Monday to Saturday, 9:00 AM - 7:00 PM IST</span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 text-primary rounded-2xl shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-display text-base uppercase">Coastal Facility</h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Chenkai Foods Artisanal Unit,<br />
                    Nagapattinam, Tamil Nadu, India.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Action Card */}
            <div className="mt-6 sm:mt-8 bg-secondary p-5 sm:p-8 border border-border/20 shadow-lg rounded-3xl">
              <h3 className="font-display text-base sm:text-lg uppercase">Instant Order on WhatsApp</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Prefer direct messaging? Send your order request straight to our WhatsApp business desk.
              </p>
              <Button asChild size="lg" className="mt-6 w-full shadow-lg font-bold text-xs uppercase tracking-wider glow-hover rounded-full bg-primary hover:bg-red-700 text-white h-12">
                <a href={waLink("Hi Chenkai Foods, I'd like to inquire about ordering your seafood pickles / dry fish.")} target="_blank" rel="noreferrer">
                  <MessageCircle /> Chat directly on WhatsApp <ArrowUpRight />
                </a>
              </Button>
            </div>
          </div>

          {/* Right Side: Interactive Product Enquiry Form */}
          <div className="bg-card p-5 sm:p-8 border border-border/30 shadow-xl rounded-3xl">
            <h2 className="font-display text-xl sm:text-2xl uppercase tracking-wide">Product Enquiry Form</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Fill out the form below to receive pricing, delivery options, and product availability.
            </p>

            {submitted ? (
              <div className="mt-8 bg-primary/10 border border-primary/30 p-6 text-foreground rounded-2xl">
                <div className="flex items-center gap-3 text-primary">
                  <CheckCircle2 size={24} />
                  <h3 className="font-display text-lg uppercase">Enquiry Generated!</h3>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  Thank you, <strong className="text-foreground">{formData.name}</strong>. Your enquiry for{" "}
                  <strong className="text-foreground">
                    {selectedProducts.length} {selectedProducts.length === 1 ? "product" : "products"}
                  </strong>{" "}
                  has been created.
                </p>

                <div className="mt-6 p-4 bg-background border border-border/20 text-xs font-mono whitespace-pre-wrap rounded-xl">
                  {constructWaMessage()}
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <Button asChild size="lg" className="rounded-full shadow-lg font-bold text-xs uppercase tracking-wider glow-hover bg-primary hover:bg-red-700 text-white">
                    <a href={waLink(constructWaMessage())} target="_blank" rel="noreferrer">
                      <Send size={15} /> Send via WhatsApp Now <ArrowUpRight />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setSubmitted(false)}
                    className="rounded-full text-xs uppercase tracking-wider"
                  >
                    Edit Form Details
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Your Name *
                  </label>
                  <input
                    id="name"
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-2xl border border-red-200/90 bg-red-50/70 dark:bg-red-950/20 dark:border-red-900/40 px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-card transition-all"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Phone / WhatsApp *
                    </label>
                    <input
                      id="phone"
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-2xl border border-red-200/90 bg-red-50/70 dark:bg-red-950/20 dark:border-red-900/40 px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-card transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                      Email Address (Optional)
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-2xl border border-red-200/90 bg-red-50/70 dark:bg-red-950/20 dark:border-red-900/40 px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-card transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Select Products &amp; Variants / Weights *
                  </label>
                  <ProductMultiSelect
                    selectedItems={selectedProducts}
                    onChange={setSelectedProducts}
                  />
                  {selectedProducts.length === 0 && (
                    <p className="text-[11px] text-primary mt-1 font-semibold">
                      * Please select at least one product for your enquiry.
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                    Message or Special Delivery Request
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-2xl border border-red-200/90 bg-red-50/70 dark:bg-red-950/20 dark:border-red-900/40 px-4 py-3 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-card resize-none transition-all"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full rounded-full shadow-lg font-bold text-xs uppercase tracking-wider glow-hover bg-primary hover:bg-red-700 text-white h-12">
                  Generate Enquiry & Send <ArrowUpRight />
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <section className="mt-20 border-t border-border/20 pt-16">
          <div className="max-w-3xl">
            <span className="eyebrow text-primary">Good to Know</span>
            <h2 className="font-display text-3xl uppercase leading-tight md:text-4xl mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-8 divide-y divide-border/20 border-t border-border/20">
            {[
              {
                q: "How are Chenkai Foods pickles made without taste enhancers, MSG, or sodium benzoate?",
                a: "Using principles of food science, we optimize pure sea salt ratios, cold-pressed oils, and natural acidity to create a sterile environment that preserves wild seafood naturally, completely free of MSG, taste enhancers, and sodium benzoate.",
              },
              {
                q: "What products are currently available in the Chenkai collection?",
                a: "We specialize exclusively in authentic seafood: Fish Pickle, Prawn Pickle, and sun-cured dry fish packets including Anchovy - Nethili, Seer Fish - Vanjaram, and Baby Prawns - Chenakunni.",
              },
              {
                q: "Do you accept bulk orders and commercial consignments?",
                a: "Yes! We accept bulk orders and institutional consignments strictly on an advance pre-order basis. Each batch is handcrafted and cured fresh specifically to your required allocation. Contact us directly on WhatsApp (+91 63743 92488) or select 'Custom Bulk / Institutional Pack' in the form above.",
              },
              {
                q: "How does your collaboration with Tamil Nadu Dr. J. Jayalalithaa Fisheries University (TNJFU), Nagapattinam work?",
                a: "We collaborate with Tamil Nadu Dr. J. Jayalalithaa Fisheries University (TNJFU), Nagapattinam for manufacturing technology, incubation oversight, and food safety standards. This ensures every product is crafted under hygienic processing protocols with 0% taste enhancers, MSG & sodium benzoate.",
              },
              {
                q: "How do I place an order or enquire about delivery?",
                a: "You can click any 'Book on WhatsApp' button or submit the enquiry form above. Your request redirects to our official WhatsApp line (+91 63743 92488), where we confirm batch availability, dispatch schedules, and shipping details.",
              },
              {
                q: "What is the shelf life of Chenkai Foods seafood pickles and dry fish?",
                a: "Our pickles have a natural shelf life of 6-9 months when stored in a cool, dry place with clean, dry spoons. Sun-cured dry fish packets retain peak flavor for up to 6 months.",
              },
            ].map((faq) => (
              <details key={faq.q} className="group py-5 cursor-pointer">
                <summary className="flex items-center justify-between text-sm md:text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                  <span>{faq.q}</span>
                  <span className="ml-4 font-mono text-xs text-primary">+</span>
                </summary>
                <p className="mt-3 max-w-2xl text-xs md:text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <BulkPreOrderScroller />
      <Footer />
    </div>
  );
}
