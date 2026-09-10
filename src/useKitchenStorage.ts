import { useCallback, useState } from "react";
import type { StockItem } from "./types";
import { createSeedItems } from "./constants";

const STORAGE_KEY = "kitchen-inventory-items-v1";

function loadItems(): StockItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StockItem[]) : createSeedItems();
  } catch {
    return createSeedItems();
  }
}

export function useKitchenStorage() {
  const [items, setItems] = useState<StockItem[]>(loadItems);
  const [syncError, setSyncError] = useState(false);

  const updateItems = useCallback((next: StockItem[]) => {
    setItems(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setSyncError(false);
    } catch {
      setSyncError(true);
    }
  }, []);

  return { items, updateItems, syncError };
}
