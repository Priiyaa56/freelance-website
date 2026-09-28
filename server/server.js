import "dotenv/config";
import express from "express";
import cors from "cors";
import { inquiryRouter } from "./routes/inquiryRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;
const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173").split(",").map((x) => x.trim()).filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: "100kb" }));
app.get("/health", (_req, res) => res.json({ status: "ok", service: "portfolio-api" }));
app.use("/api/inquiries", inquiryRouter);
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error." });
});

app.listen(PORT, () => console.log(`Portfolio API running on http://localhost:${PORT}`));
