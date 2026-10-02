import express from "express";
import logger from "morgan";
import expenseRouter from "./routes/expenses.ts";
import cors from "cors";
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin === "http://localhost:5173" || origin?.endsWith(".onrender.com")) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});
app.use("/api/expenses", expenseRouter);
app.get("/ping", (req, res) => {
  res.sendStatus(204);
});

app.listen(3000, () => {
  console.log("Server listening on http://localhost:3000");
});
app.use(
  cors({
    origin: ['http://localhost:5173', /\.onrender\.com$/],
  })
);
export default app;
