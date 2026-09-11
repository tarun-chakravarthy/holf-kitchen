import type { VercelRequest, VercelResponse } from "./_lib/vercelTypes";
import { readState, writeState } from "./_lib/store";
import { isValidKitchenState } from "./_lib/validate";
import { createDefaultState } from "../shared/kitchenDefaults";

export default async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
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
}
