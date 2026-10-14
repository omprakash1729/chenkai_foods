import prawnPickle from "@/assets/prawn-pickle.jpg";
import fishPickle from "@/assets/fish-pickle.jpg";
import nethiliAnchovy from "@/assets/nethili-anchovy.jpg";
import vanjaramSeer from "@/assets/vanjaram-seerfish.jpg";
import chenakunniPrawns from "@/assets/chenakunni-prawns.jpg";
import pickleCollection from "@/assets/pickle-collection.jpg";
import garlichPickle from "@/assets/garlic-pickle.jpg";
import mangoThokku from "@/assets/mango-thokku.jpg";

export type ProductCategory = "All" | "Pickles" | "Dry Fish";

export type Product = {
  id: string;
  name: string;
  subtitle: string;
  tag: string;
  desc: string;
  details: string;
  price: string;
  image: string;
  category: "Pickles" | "Dry Fish";
  imageAlt?: string;
  ingredients: string[];
};

export const products: Product[] = [
  // ── PICKLES ────────────────────────────────────────────────────────────────
  {
    id: "chenkai-prawn-pickle",
    name: "Chenkai Prawn Pickle",
    subtitle: "Bold · Spicy · Irresistible",
    tag: "Signature",
    desc: "Succulent prawns infused with a bold blend of traditional Indian spices, aromatic seasonings and a deliciously tangy, spicy finish.",
    details:
      "A burst of coastal flavour in every spoonful. Pairs beautifully with steamed rice, curd rice, dosa and your favourite everyday meals. Zero artificial preservatives.",
    price: "₹450 / 250g",
    image: prawnPickle,
    category: "Pickles",
    imageAlt: "Chenkai Prawn Pickle jar — bold, spicy and irresistible",
    ingredients: ["Wild Ocean Prawns", "Traditional Spice Blend", "Gingelly Oil", "Tamarind", "Sea Salt"],
  },
  {
    id: "chenkai-crab-pickle",
    name: "Chenkai Crab Pickle",
    subtitle: "Rich · Aromatic · Distinctive",
    tag: "Bestseller",
    desc: "Distinctive crab flavour in a pickle inspired by the bold tastes of South Indian cuisine, blended with aromatic spices and a tangy savoury masala.",
    details:
      "A coastal delicacy with a bold personality. Pairs wonderfully with rice or your favourite home-style dishes for an extra touch of indulgence.",
    price: "₹520 / 250g",
    image: pickleCollection,
    category: "Pickles",
    imageAlt: "Chenkai Crab Pickle — rich, aromatic and distinctive",
    ingredients: ["Fresh Crab Meat", "Aromatic Masala", "Cold-Pressed Oil", "Tamarind", "Coastal Spices"],
  },
  {
    id: "kanyakumari-fish-pickle",
    name: "Kanyakumari Fish Pickle",
    subtitle: "Traditional · Tangy · Full of Flavour",
    tag: "Regional Special",
    desc: "Inspired by the vibrant culinary traditions of Kanyakumari — fish pieces combined with a robust aromatic masala for a delicious coastal accompaniment.",
    details:
      "Inspired by the southern coast. Made for memorable meals. The perfect harmony of spice, tanginess and rich coastal flavour. Enjoy with steamed rice, curd rice or traditional South Indian dishes.",
    price: "₹380 / 250g",
    image: fishPickle,
    category: "Pickles",
    imageAlt: "Kanyakumari-style fish pickle — traditional and tangy",
    ingredients: ["Coastal Fish", "Kanyakumari Masala", "Tamarind", "Gingelly Oil", "Red Chilli", "Sea Salt"],
  },
  // ── DRY FISH ───────────────────────────────────────────────────────────────
  {
    id: "solar-dried-anchovies",
    name: "Solar-Dried Anchovies",
    subtitle: "Unsalted Nethili",
    tag: "Sun-Cured",
    desc: "Delicately solar-dried to preserve the natural character of the sea. Authentic seafood flavour without added salt during processing.",
    details:
      "Simply natural. Authentically coastal. A versatile choice for traditional curries, crisp roasts and everyday coastal cuisine. Cleaned and dried under hygienic solar driers.",
    price: "₹220 / 200g",
    image: nethiliAnchovy,
    category: "Dry Fish",
    imageAlt: "Solar-dried unsalted nethili anchovies",
    ingredients: ["Fresh Ocean Nethili (Anchovy)"],
  },
  {
    id: "salted-anchovies",
    name: "Salted Anchovies",
    subtitle: "Uppu Nethili",
    tag: "Coastal Classic",
    desc: "A timeless coastal delicacy — salt-preserved anchovies bringing bold savoury character to traditional seafood recipes.",
    details:
      "A classic taste of the coast. Perfect for flavour-packed curries, golden roasts and classic South Indian accompaniments. Prepared using authentic coastal curing recipes.",
    price: "₹240 / 200g",
    image: nethiliAnchovy,
    category: "Dry Fish",
    imageAlt: "Salted dried nethili anchovies — Uppu Nethili",
    ingredients: ["Fresh Ocean Nethili (Anchovy)", "Pure Sea Salt"],
  },
  {
    id: "whole-dried-anchovies",
    name: "Whole Dried Anchovies",
    subtitle: "Muzhu Nethili",
    tag: "Traditional",
    desc: "Appreciated for their traditional form and distinctive seafood character — whole dried anchovies bring authentic coastal touch to home cooking.",
    details:
      "Tradition in every bite. Ideal for roasting, frying and flavourful regional preparations. Packed with natural sea sweetness and umami.",
    price: "₹260 / 200g",
    image: nethiliAnchovy,
    category: "Dry Fish",
    imageAlt: "Whole dried nethili anchovies — Muzhu Nethili",
    ingredients: ["Whole Ocean Nethili (Anchovy)", "Pure Sea Salt", "Earthy Turmeric"],
  },
  {
    id: "vanjaram-dry-fish",
    name: "Vanjaram Dry Fish",
    subtitle: "Seer Fish",
    tag: "Premium Catch",
    desc: "Celebrated for its distinctive flavour and satisfying texture — Vanjaram dry fish brings character to traditional seafood cuisine.",
    details:
      "Distinctive flavour. Coastal heritage. An excellent choice for spicy gravies, pan-roasted preparations and hearty coastal meals. Rich in protein and essential omega fatty acids.",
    price: "₹490 / 250g",
    image: vanjaramSeer,
    category: "Dry Fish",
    imageAlt: "Vanjaram seer fish dry fish — premium coastal catch",
    ingredients: ["Prime Vanjaram (Seer Fish)", "Natural Sea Salt", "Turmeric"],
  },
  {
    id: "milk-anchovies",
    name: "Milk Anchovies",
    subtitle: "Paal Nethili",
    tag: "Heritage Variety",
    desc: "Delicate in size and rich in traditional seafood appeal — Paal Nethili is cherished in coastal kitchens for its versatility.",
    details:
      "Delicate fish. Bold coastal flavour. Transform it into aromatic stir-fries, crisp roasted dishes and flavourful regional specialities.",
    price: "₹280 / 200g",
    image: nethiliAnchovy,
    category: "Dry Fish",
    imageAlt: "Milk anchovies — Paal Nethili",
    ingredients: ["Fresh Paal Nethili", "Natural Sea Salt"],
  },
  {
    id: "unsalted-baby-prawns",
    name: "Unsalted Baby Prawns",
    subtitle: "Chenakkunni",
    tag: "Coastal Heritage",
    desc: "Small in size yet full of seafood character — these unsalted dried baby prawns offer remarkable versatility in traditional cooking.",
    details:
      "Small treasures. Exceptional flavour. A wonderful addition to chutneys, thogayal, spicy stir-fries and authentic coastal recipes.",
    price: "₹260 / 200g",
    image: chenakunniPrawns,
    category: "Dry Fish",
    imageAlt: "Unsalted dried baby prawns — Chenakkunni",
    ingredients: ["Fresh Baby Prawns (Chenakkunni)"],
  },
  {
    id: "salted-large-prawns",
    name: "Salted Large Prawns",
    subtitle: "Salted Dried Prawns",
    tag: "Bold Flavour",
    desc: "Savour the concentrated taste of the sea in these traditionally salted dried prawns — pronounced savoury notes for robust gravies and spicy roasts.",
    details:
      "Rich seafood character. Timeless appeal. Their bold savoury profile makes them an excellent ingredient for richly flavoured seafood dishes and coastal classics.",
    price: "₹320 / 200g",
    image: chenakunniPrawns,
    category: "Dry Fish",
    imageAlt: "Salted dried large prawns",
    ingredients: ["Large Ocean Prawns", "Pure Sea Salt"],
  },
  {
    id: "massi-karuvadu",
    name: "Massi Karuvadu",
    subtitle: "Dried Tuna Powder",
    tag: "Unique",
    desc: "Rooted in coastal culinary traditions — the deep distinctive flavour of dried tuna in a convenient powdered form.",
    details:
      "A coastal classic, reimagined. Ideal for flavourful sambals, chutneys, podi-style blends and traditional seafood-inspired recipes.",
    price: "₹300 / 150g",
    image: mangoThokku,
    category: "Dry Fish",
    imageAlt: "Massi Karuvadu — dried tuna powder, coastal classic",
    ingredients: ["Sun-Dried Tuna (Skipjack)", "Traditional Coastal Spices"],
  },
];
