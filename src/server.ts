import express from "express";
import cors from "cors";
import puppeteer from "puppeteer";
import { Router } from "./routes";

const app = express();
const port = process.env.PORT || 6666;

app.use(cors());
app.use(express.json());
app.use("/api", Router);

app.listen(port, () => {
  console.log(`Puppeteer daemon listening at http://localhost:${port}`);
});
