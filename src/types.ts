export type { CategoryId, CategoryLabels, KitchenState, StockItem } from "../shared/types";

import type { CategoryId, StockItem } from "../shared/types";

export type Status = "out" | "low" | "medium" | "good" | "unset";

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
  categoryId: CategoryId;
}

export interface OrderRecord {
  id: string;
  timestamp: string;
  items: OrderLine[];
}
