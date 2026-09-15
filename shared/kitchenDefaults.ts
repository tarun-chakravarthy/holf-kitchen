import type { CategoryId, CategoryLabels, KitchenState, StockItem } from "./types.js";

export const CATEGORY_ORDER: CategoryId[] = ["meats", "cheese", "sauces", "supplies", "drinks"];

export const DEFAULT_CATEGORY_LABELS: CategoryLabels = {
  meats: "Meats & Prep",
  cheese: "Cheese & Cold",
  sauces: "Sauces",
  supplies: "Supplies & Extras",
  drinks: "Drinks",
};

const uid = (): string => Math.random().toString(36).slice(2, 10);

type SeedItem = Omit<StockItem, "id" | "note" | "locked" | "checkedOverride"> & {
  note?: string;
};

function hydrateSeedItem(it: SeedItem): StockItem {
  return {
    id: uid(),
    note: it.note ?? "",
    locked: true,
    checkedOverride: null,
    ...it,
  };
}

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
  { name: "Coca-Cola Classic", unit: "packs", required: 3, current: 1, categoryId: "drinks" },
  { name: "Coca-Cola Zero Sugar", unit: "packs", required: 3, current: 2, categoryId: "drinks" },
  { name: "Coca-Cola Vanilla", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
  { name: "Sprite", unit: "packs", required: 3, current: 3, categoryId: "drinks" },
  { name: "Fanta", unit: "packs", required: 3, current: 1, categoryId: "drinks" },
  { name: "Kirks Originals (assorted)", unit: "packs", required: 1, current: 1, categoryId: "drinks" },
  { name: "Coca-Cola (cans)", unit: "packs", required: 3, current: 2, categoryId: "drinks" },
  { name: "Fanta (cans)", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
  { name: "Mount Franklin Spring Water", unit: "packs", required: 4, current: 3, categoryId: "drinks" },
  { name: "Mount Franklin Lightly Sparkling", unit: "packs", required: 1, current: 1, categoryId: "drinks" },
  { name: "Pump Water Blue", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
  { name: "Pump Water Pink", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
  { name: "Monster Energy (assorted)", unit: "packs", required: 4, current: 2, categoryId: "drinks" },
  { name: "Mother Energy", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
  { name: "Powerade Blue", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
  { name: "Powerade Berry", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
  { name: "Fuze Tea (assorted)", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
];

// Names introduced in this update, used to patch stores that already ran the
// earlier drinks migration (see migrateState in useKitchenStorage.ts).
export const DRINK_VARIANT_ADDITIONS = ["Pump Water Blue", "Pump Water Pink", "Powerade Blue", "Powerade Berry"];

export function createSeedItems(): StockItem[] {
  return SEED_ITEMS.map(hydrateSeedItem);
}

export function createDrinksSeedItems(): StockItem[] {
  return SEED_ITEMS.filter((it) => it.categoryId === "drinks").map(hydrateSeedItem);
}

export function createDrinkVariantAdditions(): StockItem[] {
  return SEED_ITEMS.filter((it) => DRINK_VARIANT_ADDITIONS.includes(it.name)).map(hydrateSeedItem);
}

export function createDefaultState(): KitchenState {
  return {
    items: createSeedItems(),
    categoryLabels: { ...DEFAULT_CATEGORY_LABELS },
  };
}
