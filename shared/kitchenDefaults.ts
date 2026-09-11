import type { CategoryId, CategoryLabels, KitchenState, StockItem } from "./types";

export const CATEGORY_ORDER: CategoryId[] = ["meats", "cheese", "sauces", "supplies"];

export const DEFAULT_CATEGORY_LABELS: CategoryLabels = {
  meats: "Meats & Prep",
  cheese: "Cheese & Cold",
  sauces: "Sauces",
  supplies: "Supplies & Extras",
};

const uid = (): string => Math.random().toString(36).slice(2, 10);

type SeedItem = Omit<StockItem, "id" | "note" | "locked" | "checkedOverride"> & {
  note?: string;
};

const SEED_ITEMS: SeedItem[] = [
  { name: "Angus beef patties", unit: "box", required: 4, current: 1, categoryId: "meats" },
  { name: "Chips", unit: "bags", required: 15, current: 17, categoryId: "meats" },
  { name: "Pulled pork", unit: "box", required: 3, current: 2, categoryId: "meats" },
  { name: "Chicken schnitzel", unit: "box", required: 3, current: 1.5, categoryId: "meats" },
  { name: "Bacon", unit: "packs", required: 4, current: 3, categoryId: "meats" },
  { name: "Chicken skewers", unit: "box", required: 2, current: 0.5, categoryId: "meats" },
  { name: "Pork ribs", unit: "packs", required: 3, current: 1, categoryId: "meats" },
  { name: "Wings", unit: "bags", required: 4, current: 2, categoryId: "meats" },
  { name: "Big burger patties", unit: "packs", required: 3, current: 1, categoryId: "meats" },
  {
    name: "Mince beef",
    unit: "packs",
    required: 4,
    current: 0,
    categoryId: "meats",
    note: "Needed for Italian & Mexican prep",
  },
  { name: "Cheese curds", unit: "bags", required: 4, current: 3, categoryId: "cheese" },
  { name: "Mozzarella", unit: "bags", required: 4, current: 2, categoryId: "cheese" },
  { name: "Parmesan", unit: "packs", required: 3, current: 1, categoryId: "cheese" },
  { name: "Ice cream", unit: "box", required: 2, current: 0.25, categoryId: "cheese" },
  { name: "Onion rings", unit: "bags", required: 4, current: 3, categoryId: "cheese" },
  { name: "Cheese sticks", unit: "box", required: 3, current: 1, categoryId: "cheese" },
  { name: "Churros", unit: "box", required: 3, current: 2, categoryId: "cheese" },
  { name: "Tzatziki", unit: "containers", required: 4, current: 3, categoryId: "sauces" },
  { name: "Aioli", unit: "containers", required: 4, current: 4, categoryId: "sauces" },
  { name: "Blue cheese", unit: "containers", required: 4, current: 3, categoryId: "sauces" },
  { name: "Burger sauce", unit: "containers", required: 6, current: 6, categoryId: "sauces" },
  { name: "Salted caramel", unit: "containers", required: 3, current: 2, categoryId: "sauces" },
  { name: "Crushed garlic", unit: "containers", required: 3, current: 1, categoryId: "sauces" },
  { name: "Fetta", unit: "containers", required: 3, current: 1, categoryId: "sauces" },
  { name: "Liquid cheese", unit: "box", required: 3, current: 3, categoryId: "sauces" },
  { name: "Butter chicken sauce", unit: "containers", required: 3, current: 1, categoryId: "sauces" },
  { name: "Satay", unit: "containers", required: 3, current: 1, categoryId: "sauces" },
  { name: "Buffalo", unit: "containers", required: 3, current: 1, categoryId: "sauces" },
  { name: "Tomato sauce", unit: "containers", required: 3, current: 1, categoryId: "sauces" },
  { name: "BBQ sauce", unit: "containers", required: 3, current: 2, categoryId: "sauces" },
  { name: "Gravy mix", unit: "tub", required: 2, current: 0.5, categoryId: "sauces" },
  { name: "Baking paper", unit: "rolls", required: 3, current: 1, categoryId: "supplies" },
  { name: "Napkins", unit: "packs", required: 4, current: 1, categoryId: "supplies" },
  { name: "Oreo", unit: "packs", required: 2, current: 0, categoryId: "supplies" },
  {
    name: "Biscoff biscuits",
    unit: "packs",
    required: 2,
    current: 0,
    categoryId: "supplies",
    note: "Backup stock",
  },
  { name: "Whipped cream", unit: "canisters", required: 4, current: 2, categoryId: "supplies" },
  {
    name: "Dishwashing liquid",
    unit: "bottles",
    required: 3,
    current: 0,
    categoryId: "supplies",
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

export function createDefaultState(): KitchenState {
  return {
    items: createSeedItems(),
    categoryLabels: { ...DEFAULT_CATEGORY_LABELS },
  };
}
