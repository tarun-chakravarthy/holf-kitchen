import type { Category, StockItem, Status } from "./types";
import { uid } from "./utils";

export const CATEGORY_ORDER: Category[] = [
  "Meats & Prep",
  "Cheese & Cold",
  "Sauces",
  "Supplies & Extras",
];

// Standard semantic status colors (not brand colors) — red/amber/green traffic-light convention.
export const STATUS_META: Record<
  Status,
  { label: string; color: string; bg: string; track: string }
> = {
  out: { label: "Out", color: "#DC2626", bg: "#FEF2F2", track: "#FCE4E4" },
  low: { label: "Low", color: "#DC2626", bg: "#FEF9F9", track: "#FCE4E4" },
  medium: { label: "Medium", color: "#D97706", bg: "#FFFBEB", track: "#FCEED3" },
  good: { label: "Good", color: "#16A34A", bg: "#F0FDF4", track: "#D9F2E3" },
  unset: { label: "Set par", color: "#667085", bg: "#F9FAFB", track: "#E4E7EC" },
};

type SeedItem = Omit<StockItem, "id" | "note" | "locked" | "checkedOverride"> & {
  note?: string;
};

const SEED_ITEMS: SeedItem[] = [
  { name: "Angus beef patties", unit: "box", required: 4, current: 1, category: "Meats & Prep" },
  { name: "Chips", unit: "bags", required: 15, current: 17, category: "Meats & Prep" },
  { name: "Pulled pork", unit: "box", required: 3, current: 2, category: "Meats & Prep" },
  { name: "Chicken schnitzel", unit: "box", required: 3, current: 1.5, category: "Meats & Prep" },
  { name: "Bacon", unit: "packs", required: 4, current: 3, category: "Meats & Prep" },
  { name: "Chicken skewers", unit: "box", required: 2, current: 0.5, category: "Meats & Prep" },
  { name: "Pork ribs", unit: "packs", required: 3, current: 1, category: "Meats & Prep" },
  { name: "Wings", unit: "bags", required: 4, current: 2, category: "Meats & Prep" },
  { name: "Big burger patties", unit: "packs", required: 3, current: 1, category: "Meats & Prep" },
  {
    name: "Mince beef",
    unit: "packs",
    required: 4,
    current: 0,
    category: "Meats & Prep",
    note: "Needed for Italian & Mexican prep",
  },
  { name: "Cheese curds", unit: "bags", required: 4, current: 3, category: "Cheese & Cold" },
  { name: "Mozzarella", unit: "bags", required: 4, current: 2, category: "Cheese & Cold" },
  { name: "Parmesan", unit: "packs", required: 3, current: 1, category: "Cheese & Cold" },
  { name: "Ice cream", unit: "box", required: 2, current: 0.25, category: "Cheese & Cold" },
  { name: "Onion rings", unit: "bags", required: 4, current: 3, category: "Cheese & Cold" },
  { name: "Cheese sticks", unit: "box", required: 3, current: 1, category: "Cheese & Cold" },
  { name: "Churros", unit: "box", required: 3, current: 2, category: "Cheese & Cold" },
  { name: "Tzatziki", unit: "containers", required: 4, current: 3, category: "Sauces" },
  { name: "Aioli", unit: "containers", required: 4, current: 4, category: "Sauces" },
  { name: "Blue cheese", unit: "containers", required: 4, current: 3, category: "Sauces" },
  { name: "Burger sauce", unit: "containers", required: 6, current: 6, category: "Sauces" },
  { name: "Salted caramel", unit: "containers", required: 3, current: 2, category: "Sauces" },
  { name: "Crushed garlic", unit: "containers", required: 3, current: 1, category: "Sauces" },
  { name: "Fetta", unit: "containers", required: 3, current: 1, category: "Sauces" },
  { name: "Liquid cheese", unit: "box", required: 3, current: 3, category: "Sauces" },
  { name: "Butter chicken sauce", unit: "containers", required: 3, current: 1, category: "Sauces" },
  { name: "Satay", unit: "containers", required: 3, current: 1, category: "Sauces" },
  { name: "Buffalo", unit: "containers", required: 3, current: 1, category: "Sauces" },
  { name: "Tomato sauce", unit: "containers", required: 3, current: 1, category: "Sauces" },
  { name: "BBQ sauce", unit: "containers", required: 3, current: 2, category: "Sauces" },
  { name: "Gravy mix", unit: "tub", required: 2, current: 0.5, category: "Sauces" },
  { name: "Baking paper", unit: "rolls", required: 3, current: 1, category: "Supplies & Extras" },
  { name: "Napkins", unit: "packs", required: 4, current: 1, category: "Supplies & Extras" },
  { name: "Oreo", unit: "packs", required: 2, current: 0, category: "Supplies & Extras" },
  {
    name: "Biscoff biscuits",
    unit: "packs",
    required: 2,
    current: 0,
    category: "Supplies & Extras",
    note: "Backup stock",
  },
  { name: "Whipped cream", unit: "canisters", required: 4, current: 2, category: "Supplies & Extras" },
  {
    name: "Dishwashing liquid",
    unit: "bottles",
    required: 3,
    current: 0,
    category: "Supplies & Extras",
    note: "Big bottles",
  },
];

export function createSeedItems(): StockItem[] {
  return SEED_ITEMS.map((it) => ({
    id: uid(),
    note: it.note ?? "",
    locked: true,
    checkedOverride: null,
    ...it,
  }));
}
