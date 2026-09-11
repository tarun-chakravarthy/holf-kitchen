import { put, get as getBlob } from "@vercel/blob";
import { promises as fs } from "node:fs";
import path from "node:path";
import type { KitchenState } from "../../shared/types.js";

const BLOB_PATHNAME = "kitchen-stock-state.json";
const DEV_STATE_FILE = path.join(process.cwd(), ".data", "kitchen-stock-state.json");

export class StorageNotConfiguredError extends Error {
  constructor() {
    super(
      "Vercel Blob storage is not configured. In the Vercel dashboard, go to Storage → Create Database → Blob, then redeploy.",
    );
    this.name = "StorageNotConfiguredError";
  }
}

function hasBlobToken(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

// Vercel's runtime always sets VERCEL=1, including in Preview and Production.
// Its filesystem is read-only outside /tmp, so the local JSON-file fallback
// below must only ever run on a developer's own machine, never on Vercel.
function isRunningOnVercel(): boolean {
  return Boolean(process.env.VERCEL);
}

export async function readState(): Promise<KitchenState | null> {
  if (hasBlobToken()) {
    const result = await getBlob(BLOB_PATHNAME, { access: "private" });
    if (!result) return null;
    const text = await new Response(result.stream).text();
    return JSON.parse(text) as KitchenState;
  }

  if (isRunningOnVercel()) {
    throw new StorageNotConfiguredError();
  }

  try {
    const raw = await fs.readFile(DEV_STATE_FILE, "utf-8");
    return JSON.parse(raw) as KitchenState;
  } catch {
    return null;
  }
}

export async function writeState(state: KitchenState): Promise<void> {
  const body = JSON.stringify(state);

  if (hasBlobToken()) {
    await put(BLOB_PATHNAME, body, {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return;
  }

  if (isRunningOnVercel()) {
    throw new StorageNotConfiguredError();
  }

  await fs.mkdir(path.dirname(DEV_STATE_FILE), { recursive: true });
  await fs.writeFile(DEV_STATE_FILE, body, "utf-8");
}
