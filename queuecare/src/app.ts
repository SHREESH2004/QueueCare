import express from "express";
import authRoutes from "./routes"

const app = express();

app.use(express.json());

app.use("/api", authRoutes)

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    message: "QueueCare API is running"
  });
});

export default app;