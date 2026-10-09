import prawn from "@/assets/prawn-pickle.jpg";
import mango from "@/assets/mango-thokku.jpg";
import lemon from "@/assets/lemon-pickle.jpg";
import garlic from "@/assets/garlic-pickle.jpg";
import tomato from "@/assets/tomato-thokku.jpg";
import gongura from "@/assets/gongura-pickle.jpg";
import table from "@/assets/pickle-table.jpg";

export type Product = { name: string; tag: string; desc: string; price: string; image: string; category: "Pickles" | "Thokku"; imageAlt?: string };

export const products: Product[] = [
  { name: "Prawn Pickle", tag: "Signature", desc: "Crispy prawns in red chilli masala and gingelly oil. Try once, crave forever.", price: "₹450 / 250g", image: prawn, category: "Pickles" },
  { name: "Mango Thokku", tag: "Classic", desc: "Grated raw mango, gingelly oil, slow-roasted chilli.", price: "₹240 / 250g", image: mango, category: "Thokku" },
  { name: "Lemon Pickle", tag: "Tangy", desc: "Sun-cured lemons with mustard and fenugreek.", price: "₹200 / 250g", image: lemon, category: "Pickles" },
  { name: "Garlic Pickle", tag: "Bold", desc: "Whole garlic cloves in a deep red masala.", price: "₹260 / 250g", image: garlic, category: "Pickles" },
  { name: "Tomato Thokku", tag: "Everyday", desc: "Thick, spiced tomato relish for rice and dosa.", price: "₹180 / 250g", image: tomato, category: "Thokku" },
  { name: "Gongura Pickle", tag: "Regional", desc: "Sorrel leaves, red chilli, and a sharp sour kick.", price: "₹250 / 250g", image: gongura, category: "Pickles" },
  { name: "Mixed Veg Pickle", tag: "Classic", desc: "Carrot, beans, lime and green chilli together.", price: "₹220 / 250g", image: table, imageAlt: "Pickles served with rice — serving inspiration", category: "Pickles" },
];
