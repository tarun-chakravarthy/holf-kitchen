import type { IncomingMessage, ServerResponse } from "node:http";

// Vercel's Node.js runtime decorates the request/response objects with these
// extras. We declare only the subset this project actually uses, rather than
// depending on the full @vercel/node package just for two interfaces.
export interface VercelRequest extends IncomingMessage {
  method?: string;
  body?: unknown;
}

export interface VercelResponse extends ServerResponse {
  status(statusCode: number): VercelResponse;
  json(body: unknown): VercelResponse;
}
