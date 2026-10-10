import prawnPickle from "@/assets/prawn-pickle.jpg";
import fishPickle from "@/assets/fish-pickle.jpg";
import nethiliAnchovy from "@/assets/nethili-anchovy.jpg";
import vanjaramSeer from "@/assets/vanjaram-seerfish.jpg";
import chenakunniPrawns from "@/assets/chenakunni-prawns.jpg";

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
  {
    id: "fish-pickle",
    name: "Fish Pickle",
    subtitle: "Artisanal Ocean Fish Pickle",
    tag: "Signature",
    desc: "Wild-caught ocean fish slow-cooked in hand-pounded red chilli masala, single-origin spices, and cold-pressed oil.",
    details: "Crafted under the supervision of Dr. R. Navaneethan (Ph.D. in Food Science). Prepared with wild-caught ocean fish, zero artificial preservatives, and aged naturally.",
    price: "₹380 / 250g",
    image: fishPickle,
    category: "Pickles",
    ingredients: ["Wild-Caught Fish", "Cold-Pressed Gingelly Oil", "Hand-Pounded Red Chilli", "Turmeric", "Sea Salt", "Spices"],
  },
  {
    id: "prawn-pickle",
    name: "Prawn Pickle",
    subtitle: "Succulent Wild Prawn Creation",
    tag: "Bestseller",
    desc: "Succulent ocean prawns marinated with sun-dried red chillies, fresh garlic, and pure sea salt for rich natural umami.",
    details: "A perfect fusion of maritime heritage and food science precision. Slow-infused with aromatic spices without any synthetic colors or chemical enhancers.",
    price: "₹450 / 250g",
    image: prawnPickle,
    category: "Pickles",
    ingredients: ["Wild Ocean Prawns", "Gingelly Oil", "Garlic", "Sun-Dried Red Chilli", "Sea Salt", "Mustard & Fenugreek"],
  },
  {
    id: "anchovy-nethili",
    name: "Anchovy - Nethili",
    subtitle: "Sun-Dried Nethili Packets",
    tag: "Sun-Cured",
    desc: "Pristine ocean Nethili dried using ancient sun-curing techniques with organic turmeric and pure sea salt.",
    details: "Cleaned, salted, and sun-dried under hygienic controlled solar driers to ensure maximum purity, crisp texture, and zero fishy odor.",
    price: "₹220 / 200g",
    image: nethiliAnchovy,
    category: "Dry Fish",
    ingredients: ["Fresh Ocean Nethili (Anchovy)", "Pure Sea Salt", "Earthy Turmeric"],
  },
  {
    id: "seer-fish-vanjaram",
    name: "Seer Fish - Vanjaram",
    subtitle: "Premium Cured Vanjaram Slices",
    tag: "Premium Catch",
    desc: "Thick, pristine steaks of ocean-fresh Vanjaram, expertly salted and sun-dried without chemical additives.",
    details: "Selected from top-grade king seer fish. Rich in protein and essential omega fatty acids, prepared using authentic coastal curing recipes.",
    price: "₹490 / 250g",
    image: vanjaramSeer,
    category: "Dry Fish",
    ingredients: ["Prime Vanjaram (Seer Fish)", "Natural Sea Salt", "Turmeric"],
  },
  {
    id: "baby-prawns-chenakunni",
    name: "Baby Prawns - Chenakunni",
    subtitle: "Sun-Cured Chenakunni Prawns",
    tag: "Coastal Heritage",
    desc: "Delicate baby prawns harvested from coastal waters, sun-dried naturally to lock in deep savory ocean sweetness.",
    details: "Ideal for traditional coastal roasts, thokku style dry fries, and aromatic rice pairings. Packed with natural sea sweetness and umami.",
    price: "₹260 / 200g",
    image: chenakunniPrawns,
    category: "Dry Fish",
    ingredients: ["Fresh Baby Prawns (Chenakunni)", "Pure Sea Salt"],
  },
];
