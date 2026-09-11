import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { readState, writeState } from "./api/_lib/store";
import { isValidKitchenState } from "./api/_lib/validate";
import { createDefaultState } from "./shared/kitchenDefaults";

// Mirrors api/stock.ts so `npm run dev` works without the Vercel CLI.
function kitchenApiDevPlugin(): Plugin {
  return {
    name: "kitchen-api-dev",
    configureServer(server) {
      server.middlewares.use("/api/stock", async (req, res) => {
        res.setHeader("Content-Type", "application/json");

        if (req.method === "GET") {
          const state = (await readState()) ?? createDefaultState();
          res.statusCode = 200;
          res.end(JSON.stringify(state));
          return;
        }

        if (req.method === "PUT") {
          let raw = "";
          for await (const chunk of req) raw += chunk;
          let body: unknown;
          try {
            body = JSON.parse(raw);
          } catch {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: "Invalid JSON body" }));
            return;
          }
          if (!isValidKitchenState(body)) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: "Invalid kitchen state payload" }));
            return;
          }
          await writeState(body);
          res.statusCode = 200;
          res.end(JSON.stringify(body));
          return;
        }

        res.statusCode = 405;
        res.end(JSON.stringify({ error: "Method not allowed" }));
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), kitchenApiDevPlugin()],
});
