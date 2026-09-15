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
  // --- Bottles (600ml) ---
  { name: "Coca-Cola Classic 600ml Bottle", unit: "packs", required: 3, current: 1, categoryId: "drinks" },
  { name: "Coca-Cola Zero Sugar 600ml Bottle", unit: "packs", required: 3, current: 2, categoryId: "drinks" },
  { name: "Coca-Cola Vanilla 600ml Bottle", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
  { name: "Fanta Red 600ml Bottle", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
  { name: "Fanta Orange 600ml Bottle", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
  { name: "Sprite 600ml Bottle", unit: "packs", required: 3, current: 3, categoryId: "drinks" },
  { name: "Kirks Originals Pasito 600ml Bottle", unit: "packs", required: 1, current: 1, categoryId: "drinks" },
  { name: "Mount Franklin Spring Water", unit: "packs", required: 4, current: 3, categoryId: "drinks" },
  { name: "Mount Franklin Lightly Sparkling", unit: "packs", required: 1, current: 1, categoryId: "drinks" },
  { name: "Pump Water Blue", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
  { name: "Pump Water Pink", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
  { name: "Powerade Blue", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
  { name: "Powerade Berry", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
  { name: "Fuze Tea Peach", unit: "packs", required: 1, current: 1, categoryId: "drinks" },
  { name: "Fuze Tea Lemon", unit: "packs", required: 1, current: 1, categoryId: "drinks" },
  // --- Cans (375ml) ---
  { name: "Coca-Cola Classic 375ml Can", unit: "packs", required: 3, current: 2, categoryId: "drinks" },
  { name: "Coca-Cola Zero Sugar 375ml Can", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
  { name: "Coca-Cola Vanilla 375ml Can", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
  { name: "Fanta Red 375ml Can", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
  { name: "Fanta Orange 375ml Can", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
  { name: "Sprite 375ml Can", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
  { name: "Kirks Originals Pasito 375ml Can", unit: "packs", required: 1, current: 1, categoryId: "drinks" },
  { name: "Monster Energy Original", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
  { name: "Monster Ultra", unit: "packs", required: 1, current: 1, categoryId: "drinks" },
  { name: "Monster Ultra Paradise", unit: "packs", required: 1, current: 0, categoryId: "drinks" },
  { name: "Monster Mango Loco", unit: "packs", required: 1, current: 0, categoryId: "drinks" },
  { name: "Mother Energy", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
];

// The order drinks should display in, grouped by brand. Anything not listed
// here (a user's own custom-added drink) sorts after these, in the order it
// was added. See sortDrinksItems in shared/kitchenDefaults.ts.
export const DRINKS_DISPLAY_ORDER: string[] = SEED_ITEMS.filter((it) => it.categoryId === "drinks").map(
  (it) => it.name,
);

export function sortDrinksItems<T extends { name: string }>(items: T[]): T[] {
  const rank = new Map(DRINKS_DISPLAY_ORDER.map((name, i) => [name, i]));
  return [...items].sort((a, b) => (rank.get(a.name) ?? DRINKS_DISPLAY_ORDER.length) - (rank.get(b.name) ?? DRINKS_DISPLAY_ORDER.length));
}

// Payloads for one-time upgrade paths in useKitchenStorage.ts. These are kept
// as standalone item lists (never derived from SEED_ITEMS by name) precisely
// because SEED_ITEMS keeps changing — e.g. "Kirks Originals Pasito" above is
// now "Kirks Originals Pasito 600ml Bottle". A historical migration must keep
// adding exactly what it always added, independent of later renames.
const DRINK_VARIANT_ADDITION_ITEMS: SeedItem[] = [
  { name: "Pump Water Blue", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
  { name: "Pump Water Pink", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
  { name: "Powerade Blue", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
  { name: "Powerade Berry", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
];

const DRINK_FLAVOR_ADDITION_ITEMS: SeedItem[] = [
  { name: "Kirks Originals Pasito", unit: "packs", required: 1, current: 1, categoryId: "drinks" },
  { name: "Monster Energy Original", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
  { name: "Monster Ultra", unit: "packs", required: 1, current: 1, categoryId: "drinks" },
  { name: "Monster Ultra Paradise", unit: "packs", required: 1, current: 0, categoryId: "drinks" },
  { name: "Monster Mango Loco", unit: "packs", required: 1, current: 0, categoryId: "drinks" },
  { name: "Fuze Tea Peach", unit: "packs", required: 1, current: 1, categoryId: "drinks" },
  { name: "Fuze Tea Lemon", unit: "packs", required: 1, current: 1, categoryId: "drinks" },
];

const COKE_FAMILY_BOTTLE_CAN_ITEMS: SeedItem[] = [
  { name: "Coca-Cola Classic 600ml Bottle", unit: "packs", required: 3, current: 1, categoryId: "drinks" },
  { name: "Coca-Cola Zero Sugar 600ml Bottle", unit: "packs", required: 3, current: 2, categoryId: "drinks" },
  { name: "Coca-Cola Vanilla 600ml Bottle", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
  { name: "Fanta Red 600ml Bottle", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
  { name: "Fanta Orange 600ml Bottle", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
  { name: "Sprite 600ml Bottle", unit: "packs", required: 3, current: 3, categoryId: "drinks" },
  { name: "Kirks Originals Pasito 600ml Bottle", unit: "packs", required: 1, current: 1, categoryId: "drinks" },
  { name: "Coca-Cola Classic 375ml Can", unit: "packs", required: 3, current: 2, categoryId: "drinks" },
  { name: "Coca-Cola Zero Sugar 375ml Can", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
  { name: "Coca-Cola Vanilla 375ml Can", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
  { name: "Fanta Red 375ml Can", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
  { name: "Fanta Orange 375ml Can", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
  { name: "Sprite 375ml Can", unit: "packs", required: 2, current: 1, categoryId: "drinks" },
  { name: "Kirks Originals Pasito 375ml Can", unit: "packs", required: 1, current: 1, categoryId: "drinks" },
];

export function createSeedItems(): StockItem[] {
  return SEED_ITEMS.map(hydrateSeedItem);
}

export function createDrinksSeedItems(): StockItem[] {
  return SEED_ITEMS.filter((it) => it.categoryId === "drinks").map(hydrateSeedItem);
}

export function createDrinkVariantAdditions(): StockItem[] {
  return DRINK_VARIANT_ADDITION_ITEMS.map(hydrateSeedItem);
}

export function createDrinkFlavorAdditions(): StockItem[] {
  return DRINK_FLAVOR_ADDITION_ITEMS.map(hydrateSeedItem);
}

export function createCokeFamilyBottleCanAdditions(): StockItem[] {
  return COKE_FAMILY_BOTTLE_CAN_ITEMS.map(hydrateSeedItem);
}

export function createDefaultState(): KitchenState {
  return {
    items: createSeedItems(),
    categoryLabels: { ...DEFAULT_CATEGORY_LABELS },
  };
}
