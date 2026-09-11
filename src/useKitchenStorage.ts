import { useCallback, useEffect, useRef, useState } from "react";
import type { CategoryId, KitchenState, StockItem } from "./types";
import { createDefaultState } from "./constants";

export type SyncStatus = "loading" | "saving" | "saved" | "error";

const STOCK_ENDPOINT = "/api/stock";

export function useKitchenStorage() {
  const [state, setState] = useState<KitchenState>(createDefaultState);
  const [status, setStatus] = useState<SyncStatus>("loading");
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(STOCK_ENDPOINT)
      .then((res) => (res.ok ? (res.json() as Promise<KitchenState>) : Promise.reject(new Error("load failed"))))
      .then((data) => {
        if (!cancelled) {
          setState(data);
          setStatus("saved");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, []);

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
