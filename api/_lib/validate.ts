import type { KitchenState } from "../../shared/types.js";

export function isValidKitchenState(value: unknown): value is KitchenState {
  if (!value || typeof value !== "object") return false;
  const v = value as Partial<KitchenState>;
  return Array.isArray(v.items) && typeof v.categoryLabels === "object" && v.categoryLabels !== null;
}
