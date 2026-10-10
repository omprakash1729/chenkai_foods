import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, MessageCircle, Phone, MapPin, CheckCircle2, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Nav, Footer, waLink } from "@/components/site";
import { Button } from "@/components/ui/button";
import { products } from "@/lib/products";

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
    product: "Fish Pickle",
    quantity: "1 Jar / Packet",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const constructWaMessage = () => {
    return `Hi Chenkai Foods Team,
I would like to place an enquiry / order:

- Name: ${formData.name || "Customer"}
- Phone: ${formData.phone || "Not provided"}
- Product Interested: ${formData.product}
- Quantity: ${formData.quantity}
- Message: ${formData.message || "Please share availability and shipping timeline."}`;
  };

  return (
    <div className="bg-background text-foreground">
      <Nav />
      <main className="page-width pb-24 pt-36">
        <span className="eyebrow text-primary">Orders & Product Enquiries</span>
        <h1 className="mt-2 font-display text-4xl uppercase leading-tight md:text-6xl tracking-wide">
          Get in Touch with<br />
          <span className="text-primary">Chenkai Foods.</span>
        </h1>

        <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Left Side: Contact Information */}
          <div>
            <p className="text-sm md:text-base leading-relaxed text-muted-foreground font-normal">
              Have a question about our seafood pickles, sun-cured dry fish, or custom bulk orders? Our team is available to assist you.
            </p>

            <div className="mt-8 space-y-6 bg-card p-8 border border-border/30">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 text-primary">
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
                <div className="p-3 bg-primary/10 text-primary">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-display text-base uppercase">Coastal Facility</h3>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Chenkai Foods Artisanal Unit,<br />
                    Southern Maritime Coast, Tamil Nadu, India.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Action Card */}
            <div className="mt-8 bg-secondary p-8 border border-border/20 shadow-lg">
              <h3 className="font-display text-lg uppercase">Instant Order on WhatsApp</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                Prefer direct messaging? Send your order request straight to our WhatsApp business desk.
              </p>
              <Button asChild size="lg" className="mt-6 w-full shadow-lg font-bold text-xs uppercase tracking-wider glow-hover">
                <a href={waLink("Hi Chenkai Foods, I'd like to inquire about ordering your seafood pickles / dry fish.")} target="_blank" rel="noreferrer">
                  <MessageCircle /> Chat directly on WhatsApp <ArrowUpRight />
                </a>
              </Button>
            </div>
          </div>

          {/* Right Side: Interactive Product Enquiry Form */}
          <div className="bg-card p-8 border border-border/30 shadow-xl">
            <h2 className="font-display text-2xl uppercase tracking-wide">Product Enquiry Form</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Fill out the form below to receive pricing, delivery options, and product availability.
            </p>

            {submitted ? (
              <div className="mt-8 bg-primary/10 border border-primary/30 p-6 text-foreground">
                <div className="flex items-center gap-3 text-primary">
                  <CheckCircle2 size={24} />
                  <h3 className="font-display text-lg uppercase">Enquiry Generated!</h3>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  Thank you, <strong className="text-foreground">{formData.name}</strong>. Your enquiry for <strong className="text-foreground">{formData.product}</strong> has been created.
                </p>

                <div className="mt-6 p-4 bg-background border border-border/20 text-xs font-mono whitespace-pre-wrap">
                  {constructWaMessage()}
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <Button asChild size="lg" className="shadow-lg font-bold text-xs uppercase tracking-wider glow-hover">
                    <a href={waLink(constructWaMessage())} target="_blank" rel="noreferrer">
                      <Send size={15} /> Send via WhatsApp Now <ArrowUpRight />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => setSubmitted(false)}
                    className="text-xs uppercase tracking-wider"
                  >
                    Edit Form Details
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Your Name *
                  </label>
                  <input
                    id="name"
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Anand Kumar"
                    className="w-full border border-border/40 bg-background px-4 py-2.5 text-sm outline-none focus:border-primary transition-all"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Phone / WhatsApp *
                    </label>
                    <input
                      id="phone"
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full border border-border/40 bg-background px-4 py-2.5 text-sm outline-none focus:border-primary transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full border border-border/40 bg-background px-4 py-2.5 text-sm outline-none focus:border-primary transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="product" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Product of Interest *
                  </label>
                  <select
                    id="product"
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    className="w-full border border-border/40 bg-background px-4 py-2.5 text-sm outline-none focus:border-primary transition-all"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={`${p.name} (${p.price})`}>
                        {p.name} - {p.price} [{p.category}]
                      </option>
                    ))}
                    <option value="All Products Sampler Pack">All Products Sampler Pack</option>
                    <option value="Custom Bulk / Wholesale Seafood Order">Custom Bulk / Wholesale Order</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="quantity" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Quantity Needed
                  </label>
                  <select
                    id="quantity"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full border border-border/40 bg-background px-4 py-2.5 text-sm outline-none focus:border-primary transition-all"
                  >
                    <option value="1 Jar / Packet">1 Jar / Packet</option>
                    <option value="2-5 Jars / Packets">2 - 5 Jars / Packets</option>
                    <option value="6-10 Jars / Packets">6 - 10 Jars / Packets</option>
                    <option value="Bulk Order (> 10 items)">Bulk Order (&gt; 10 items)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Message or Special Delivery Request
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Specify delivery location, ingredient queries, or special instructions..."
                    className="w-full border border-border/40 bg-background px-4 py-2.5 text-sm outline-none focus:border-primary resize-none transition-all"
                  />
                </div>

                <Button type="submit" size="lg" className="w-full shadow-lg font-bold text-xs uppercase tracking-wider glow-hover">
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
                q: "How are Chenkai Foods pickles preserved without artificial preservatives?",
                a: "Using principles of food science, we optimize pure sea salt ratios, cold-pressed oils, and natural acidity to create a sterile environment that preserves wild seafood naturally.",
              },
              {
                q: "What products are currently available in the Chenkai collection?",
                a: "We specialize exclusively in authentic seafood: Fish Pickle, Prawn Pickle, and sun-cured dry fish packets including Anchovy - Nethili, Seer Fish - Vanjaram, and Baby Prawns - Chenakunni.",
              },
              {
                q: "How do I place an order or enquire about delivery?",
                a: "You can click any 'Book Now' button or submit the enquiry form above. Your request redirects to our official WhatsApp line (+91 63743 92488), where we confirm availability and shipping details.",
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
      <Footer />
    </div>
  );
}
