import type { CategoryLabels, OrderRecord } from "./types";
import { STATUS_META } from "./constants";

export function exportOrderCsv(record: OrderRecord, categoryLabels: CategoryLabels): void {
  const rows = [["Category", "Item", "Current", "Required", "Order qty", "Unit", "Status"]];
  for (const it of record.items) {
    rows.push([
      categoryLabels[it.categoryId],
      it.name,
      String(it.current),
      String(it.required),
      String(it.needed),
      it.unit,
      STATUS_META[it.status].label,
    ]);
  }
  const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `order-list-${new Date(record.timestamp).toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
