import prawnPickle from "@/assets/products/prawn-pickle.jpg";
import crabPickle from "@/assets/products/crab-pickle.jpg";
import fishPickle from "@/assets/products/fish-pickle.jpg";
import maasiDryTuna from "@/assets/products/maasi-dry-tuna.jpg";
import drySpinyLoach from "@/assets/products/dry-spiny-loach.jpg";
import saltedPrawns from "@/assets/products/salted-prawns.jpg";
import unsaltedBabyPrawns from "@/assets/products/unsalted-baby-prawns.jpg";
import solarDriedNethili from "@/assets/products/solar-dried-nethili.jpg";
import normalDryNethili from "@/assets/products/normal-dry-nethili.jpg";
import vanjaramDryFish from "@/assets/products/vanjaram-dry-fish.jpg";

export type ProductCategory = "All" | "Pickles" | "Dry Fish";

export type Product = {
  id: string;
  name: string;
  subtitle: string;
  tag: string;
  desc: string;
  details: string;
  price: string;
  weight: string;
  image: string;
  category: "Pickles" | "Dry Fish";
  imageAlt?: string;
  ingredients: string[];
};

export const products: Product[] = [
  // ── SEAFOOD PICKLES (180 g) ────────────────────────────────────────────────
  {
    id: "prawn-pickle",
    name: "Prawn Pickle",
    subtitle: "Wild Ocean Prawns · Bold & Tangy",
    tag: "Signature",
    desc: "Succulent wild ocean prawns infused with a bold blend of traditional spices, cold-pressed gingelly oil, and a tangy tamarind kick.",
    details:
      "Wild ocean prawns prepared according to ancestral coastal recipes. Pairs exquisitely with curd rice, steamed rice, or dosas. 0% artificial preservatives.",
    price: "₹180",
    weight: "180 g",
    image: prawnPickle,
    category: "Pickles",
    imageAlt: "Prawn Pickle jar — 180 g artisanal seafood pickle",
    ingredients: ["Wild Ocean Prawns", "Gingelly Oil", "Kashmiri Chilli", "Mustard & Fenugreek", "Tamarind", "Sea Salt"],
  },
  {
    id: "crab-pickle",
    name: "Crab Pickle",
    subtitle: "Succulent Crab Meat · Rich & Aromatic",
    tag: "Coastal Luxury",
    desc: "Delicate shredded ocean crab meat simmered in an aromatic South Indian spiced gravy with curry leaves and cold-pressed oil.",
    details:
      "A rare coastal indulgence. Tender crab meat infused with aromatic spices, delivering deep umami in every spoonful. 0% artificial preservatives.",
    price: "₹220",
    weight: "180 g",
    image: crabPickle,
    category: "Pickles",
    imageAlt: "Crab Pickle jar — 180 g coastal luxury delicacy",
    ingredients: ["Fresh Crab Meat", "Cold-Pressed Oil", "Hand-Pounded Spices", "Curry Leaves", "Tamarind", "Sea Salt"],
  },
  {
    id: "kanyakumari-fish-pickle",
    name: "Fish Pickle (Kanyakumari Style)",
    subtitle: "Traditional · Tangy · Coastal Masala",
    tag: "Regional Special",
    desc: "Inspired by the heritage of Kanyakumari — firm boneless fish cubes marinated in a fiery, tangy tamarind and red chilli masala.",
    details:
      "Authentic southern cape recipe. Perfectly balanced tang, spice, and tender fish pieces cured naturally. 0% artificial preservatives.",
    price: "₹160",
    weight: "180 g",
    image: fishPickle,
    category: "Pickles",
    imageAlt: "Fish Pickle (Kanyakumari Style) jar — 180 g",
    ingredients: ["Ocean Fish Fillets", "Kanyakumari Spice Blend", "Gingelly Oil", "Tamarind Pulp", "Garlic", "Sea Salt"],
  },

  // ── PREMIUM DRY FISH & SEAFOOD (250 g) ────────────────────────────────────
  {
    id: "maasi-karuvadu",
    name: "Maasi Karuvadu (Dry Tuna Powder)",
    subtitle: "Skipjack Tuna · Deep Umami Powder",
    tag: "Culinary Heritage",
    desc: "Traditionally cured, sun-dried skipjack tuna crushed into an intensely aromatic, umami-rich coarse powder.",
    details:
      "The pride of coastal Tamil kitchens. Ideal for sprinkling over hot rice with ghee, blending into sambals, chutneys, or podi preparations.",
    price: "₹260",
    weight: "250 g",
    image: maasiDryTuna,
    category: "Dry Fish",
    imageAlt: "Maasi Karuvadu Dry Tuna Powder — 250 g",
    ingredients: ["Sun-Cured Skipjack Tuna", "Natural Sea Salt", "Turmeric"],
  },
  {
    id: "dry-indian-spiny-loach",
    name: "Dry Indian Spiny Loach",
    subtitle: "Ayirai Meen Karuvadu · Prized Delicacy",
    tag: "Prized Catch",
    desc: "Slender Indian spiny loach fish (Ayirai Meen), delicately solar-cured with natural sea salt for extraordinary crispness and flavor.",
    details:
      "One of South India’s most prized traditional dry fish. Highly sought-after for authentic village gravies (meen kuzhambu) and crisp shallow roasts.",
    price: "₹160",
    weight: "250 g",
    image: drySpinyLoach,
    category: "Dry Fish",
    imageAlt: "Dry Indian Spiny Loach — 250 g Ayirai Meen Karuvadu",
    ingredients: ["Fresh Indian Spiny Loach (Ayirai)", "Natural Sea Salt"],
  },
  {
    id: "salted-prawns",
    name: "Salted Prawns",
    subtitle: "Uppu Eral · Sun-Cured Ocean Prawns",
    tag: "Coastal Classic",
    desc: "Prime wild sea prawns cured with pure coastal sea salt and naturally sun-dried to lock in rich, savory seafood sweetness.",
    details:
      "Full-bodied ocean sweetness preserved with sea salt crystals. Ideal for fiery prawn thogayal, dry fish gravies, and roasted coastal side dishes.",
    price: "₹300",
    weight: "250 g",
    image: saltedPrawns,
    category: "Dry Fish",
    imageAlt: "Salted Prawns — 250 g Uppu Eral Karuvadu",
    ingredients: ["Wild Ocean Prawns", "Pure Sea Salt"],
  },
  {
    id: "unsalted-baby-prawns",
    name: "Unsalted Baby Prawns",
    subtitle: "Chenakkunni · Pure Sun-Dried Sweetness",
    tag: "Delicate Flavour",
    desc: "Tiny, delicate wild baby prawns sun-cured naturally without added processing salt for versatile everyday culinary preparations.",
    details:
      "Small in size, enormous in flavor. 100% natural and unsalted, ideal for aromatic chutneys, stir-fries, podis, and omelettes.",
    price: "₹220",
    weight: "250 g",
    image: unsaltedBabyPrawns,
    category: "Dry Fish",
    imageAlt: "Unsalted Baby Prawns — 250 g Chenakkunni Karuvadu",
    ingredients: ["Fresh Baby Prawns (Chenakkunni)"],
  },
  {
    id: "solar-dried-nethili-cleaned",
    name: "Solar-Dried Nethili (Cleaned)",
    subtitle: "Headless & Gutted · Sand-Free Anchovies",
    tag: "Hygienic Solar-Cured",
    desc: "Carefully cleaned, headless and gutted ocean anchovies dried inside hygienic solar driers — completely sand-free and ready to cook.",
    details:
      "Zero sand, zero impurities. Cured inside controlled solar dryers under technical food safety standards. Ready to wash and drop straight into your gravy or pan.",
    price: "₹180",
    weight: "250 g",
    image: solarDriedNethili,
    category: "Dry Fish",
    imageAlt: "Solar-Dried Nethili (Cleaned) — 250 g Sand-Free Anchovies",
    ingredients: ["Ocean Nethili Anchovies (Cleaned)", "Pure Sea Salt"],
  },
  {
    id: "normal-dry-nethili",
    name: "Normal Dry Nethili",
    subtitle: "Traditional Whole Anchovies · Authentic Flavour",
    tag: "Authentic Heritage",
    desc: "Whole ocean anchovies cured under coastal sunshine using time-honored artisanal methods for authentic South Indian seaside aroma.",
    details:
      "The classic staple of Tamil coastal cuisine. Delivers authentic aroma and umami to traditional karuvadu kuzhambu and crisp pan-fries.",
    price: "₹125",
    weight: "250 g",
    image: normalDryNethili,
    category: "Dry Fish",
    imageAlt: "Normal Dry Nethili — 250 g Traditional Whole Anchovies",
    ingredients: ["Whole Ocean Nethili Anchovies", "Pure Sea Salt"],
  },
  {
    id: "dry-fish-vanjaram",
    name: "Dry Fish, Vanjaram",
    subtitle: "King Seer Fish · Thick-Cut Steaks",
    tag: "King Catch",
    desc: "Thick, succulent cuts of King Seer Fish (Vanjaram) cured with pure sea salt and earthy organic turmeric.",
    details:
      "The king of South Indian fish, preserved with perfection. Firm, meaty steaks with rich natural oils, perfect for shallow tawa fries and festive curries.",
    price: "₹300",
    weight: "250 g",
    image: vanjaramDryFish,
    category: "Dry Fish",
    imageAlt: "Dry Fish, Vanjaram — 250 g Seer Fish Steaks",
    ingredients: ["Prime Vanjaram (Seer Fish)", "Natural Sea Salt", "Organic Turmeric"],
  },
];
