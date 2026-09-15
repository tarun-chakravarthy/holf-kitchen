import type { Status } from "./types";

export {
  CATEGORY_ORDER,
  DEFAULT_CATEGORY_LABELS,
  createDefaultState,
  createSeedItems,
  createDrinksSeedItems,
} from "../shared/kitchenDefaults";

// Standard semantic status colors (not brand colors) — red/amber/green traffic-light convention.
export const STATUS_META: Record<
  Status,
  { label: string; color: string; bg: string; track: string }
> = {
  out: { label: "Out", color: "#DC2626", bg: "#FEF2F2", track: "#FCE4E4" },
  low: { label: "Low", color: "#DC2626", bg: "#FEF9F9", track: "#FCE4E4" },
  medium: { label: "Medium", color: "#D97706", bg: "#FFFBEB", track: "#FCEED3" },
  good: { label: "Good", color: "#16A34A", bg: "#F0FDF4", track: "#D9F2E3" },
  unset: { label: "Set par", color: "#667085", bg: "#F9FAFB", track: "#E4E7EC" },
};
