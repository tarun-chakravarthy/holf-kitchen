import type { CategoryLabels, OrderRecord, Status } from "./types";
import { CATEGORY_ORDER } from "./constants";

export const uid = (): string => Math.random().toString(36).slice(2, 10);

export const clamp0 = (n: number): number => Math.max(0, n);

export function computeStatus(current: number, required: number | ""): Status {
  if (required === "" || Number(required) <= 0) return "unset";
  const c = Number(current) || 0;
  const r = Number(required);
  if (c <= 0) return "out";
  const ratio = c / r;
  if (ratio <= 0.33) return "low";
  if (ratio <= 0.66) return "medium";
  return "good";
}

export function ratioOf(current: number, required: number | ""): number {
  const r = Number(required);
  if (!r || r <= 0) return 0;
  return Math.min(1, clamp0(Number(current) || 0) / r);
}

export function neededQty(item: { required: number | ""; current: number }): number {
  return Math.max(0, (Number(item.required) || 0) - (Number(item.current) || 0));
}

export function formatOrderText(record: OrderRecord, categoryLabels: CategoryLabels): string {
  const lines = [`ORDER LIST — ${new Date(record.timestamp).toLocaleString()}`, ""];
  for (const cat of CATEGORY_ORDER) {
    const rows = record.items.filter((it) => it.categoryId === cat);
    if (rows.length === 0) continue;
    lines.push(categoryLabels[cat].toUpperCase());
    for (const it of rows) {
      lines.push(`  - ${it.name}: ${it.current}/${it.required} ${it.unit} (need ${it.needed})`);
    }
    lines.push("");
  }
  return lines.join("\n");
}
