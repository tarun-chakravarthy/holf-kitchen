export type Category =
  | "Meats & Prep"
  | "Cheese & Cold"
  | "Sauces"
  | "Supplies & Extras";

export type Status = "out" | "low" | "medium" | "good" | "unset";

export interface StockItem {
  id: string;
  name: string;
  unit: string;
  required: number | "";
  current: number;
  category: Category;
  note: string;
  locked: boolean;
  checkedOverride: boolean | null;
}

export interface DerivedStockItem extends StockItem {
  status: Status;
  checked: boolean;
}

export interface OrderLine {
  name: string;
  unit: string;
  required: number | "";
  current: number;
  needed: number;
  status: Status;
  category: Category;
}

export interface OrderRecord {
  id: string;
  timestamp: string;
  items: OrderLine[];
}
