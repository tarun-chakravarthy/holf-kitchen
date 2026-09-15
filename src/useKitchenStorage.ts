import { useCallback, useEffect, useRef, useState } from "react";
import type { CategoryId, KitchenState, StockItem } from "./types";
import {
  createDefaultState,
  createDrinksSeedItems,
  createDrinkVariantAdditions,
  DEFAULT_CATEGORY_LABELS,
} from "./constants";

export type SyncStatus = "loading" | "saving" | "saved" | "error";

const STOCK_ENDPOINT = "/api/stock";

// One-time upgrade path: data saved before the Drinks category existed has no
// "drinks" label. Add the category (and its starter items) the first time such
// data loads, then persist the result so this only ever runs once per store.
function migrateState(state: KitchenState): KitchenState {
  if (state.categoryLabels.drinks) return state;
  return {
    items: [...state.items, ...createDrinksSeedItems()],
    categoryLabels: { ...DEFAULT_CATEGORY_LABELS, ...state.categoryLabels },
  };
}

// Second upgrade path: stores that already ran the migration above got the
// old bottle/can-based drinks list. Fix the unit (never user-editable, so
// safe to overwrite) and swap the "(assorted)" Pump/Powerade placeholders
// for named variants, without touching any stock counts already entered.
const OLD_DRINK_UNITS = new Set(["bottles", "cans"]);
const REPLACED_DRINK_NAMES = new Set(["Pump Spring Water (assorted)", "Powerade (assorted)"]);

function needsDrinksUnitFix(state: KitchenState): boolean {
  return state.items.some(
    (it) => it.categoryId === "drinks" && (OLD_DRINK_UNITS.has(it.unit) || REPLACED_DRINK_NAMES.has(it.name)),
  );
}

function migrateDrinksUnitsAndVariants(state: KitchenState): KitchenState {
  const items = state.items
    .filter((it) => !(it.categoryId === "drinks" && REPLACED_DRINK_NAMES.has(it.name)))
    .map((it) => (it.categoryId === "drinks" ? { ...it, unit: "packs" } : it));
  return { ...state, items: [...items, ...createDrinkVariantAdditions()] };
}

export function useKitchenStorage() {
  const [state, setState] = useState<KitchenState>(createDefaultState);
  const [status, setStatus] = useState<SyncStatus>("loading");
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const persist = useCallback((next: KitchenState) => {
    setStatus("saving");
    fetch(STOCK_ENDPOINT, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    })
      .then((res) => setStatus(res.ok ? "saved" : "error"))
      .catch(() => setStatus("error"));
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch(STOCK_ENDPOINT)
      .then((res) => (res.ok ? (res.json() as Promise<KitchenState>) : Promise.reject(new Error("load failed"))))
      .then((data) => {
        if (cancelled) return;
        let migrated = migrateState(data);
        if (needsDrinksUnitFix(migrated)) migrated = migrateDrinksUnitsAndVariants(migrated);
        setState(migrated);
        setStatus("saved");
        if (migrated !== data) persist(migrated);
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [persist]);

  const updateState = useCallback(
    (next: KitchenState) => {
      setState(next);
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => persist(next), 400);
    },
    [persist],
  );

  const updateItems = useCallback(
    (items: StockItem[]) => updateState({ ...state, items }),
    [state, updateState],
  );

  const renameCategory = useCallback(
    (id: CategoryId, label: string) =>
      updateState({ ...state, categoryLabels: { ...state.categoryLabels, [id]: label } }),
    [state, updateState],
  );

  return {
    items: state.items,
    categoryLabels: state.categoryLabels,
    updateItems,
    renameCategory,
    status,
  };
}
