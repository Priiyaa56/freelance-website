import "dotenv/config";
import express from "express";
import cors from "cors";
import { inquiryRouter } from "./routes/inquiryRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = (
  process.env.CLIENT_URL || "https://priya-freelance.vercel.app"
)
  .split(",")
  .map((x) => x.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an origin
      // (useful for tools like Postman)
      if (!origin) {
        return callback(null, true);
      }

      // Allow localhost on any port during development
      if (origin.startsWith("http://localhost:")) {
        return callback(null, true);
      }

      // Allow configured production origins
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
);

app.use(express.json({ limit: "100kb" }));

app.get("/health", (_req, res) =>
  res.json({
    status: "ok",
    service: "portfolio-api",
  })
);

app.use("/api/inquiries", inquiryRouter);

app.use((err, _req, res, _next) => {
  console.error(err);

  res.status(500).json({
    message: "Internal server error.",
  });
});

app.listen(PORT, () =>
  console.log(
    `Portfolio API running on http://localhost:${PORT}`
  )
);