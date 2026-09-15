export type CategoryId = "meats" | "cheese" | "sauces" | "supplies" | "drinks";

export interface StockItem {
  id: string;
  name: string;
  unit: string;
  required: number | "";
  current: number;
  categoryId: CategoryId;
  note: string;
  locked: boolean;
  checkedOverride: boolean | null;
}

export type CategoryLabels = Record<CategoryId, string>;

export interface KitchenState {
  items: StockItem[];
  categoryLabels: CategoryLabels;
}
