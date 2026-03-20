import express from "express";
import cors from "cors";
import { config } from "./config";

import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cors({ origin: config.allowedOrigin }));
app.use(express.json());

app.use("/api", routes);

app.use((_req, res) => {
  res.status(404).json({ ok: false, error: "Not found" });
});

app.use(errorHandler);

export default app;