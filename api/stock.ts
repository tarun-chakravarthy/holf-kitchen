import type { VercelRequest, VercelResponse } from "./_lib/vercelTypes.js";
import { readState, writeState, StorageNotConfiguredError } from "./_lib/store.js";
import { isValidKitchenState } from "./_lib/validate.js";
import { createDefaultState } from "../shared/kitchenDefaults.js";

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  try {
    if (req.method === "GET") {
      const state = (await readState()) ?? createDefaultState();
      res.status(200).json(state);
      return;
    }

    if (req.method === "PUT") {
      const body: unknown = req.body;
      if (!isValidKitchenState(body)) {
        res.status(400).json({ error: "Invalid kitchen state payload" });
        return;
      }
      await writeState(body);
      res.status(200).json(body);
      return;
    }

    res.setHeader("Allow", "GET, PUT");
    res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    if (err instanceof StorageNotConfiguredError) {
      res.status(503).json({ error: err.message });
      return;
    }
    console.error("Unexpected /api/stock error:", err);
    res.status(500).json({ error: "Unexpected server error" });
  }
}
