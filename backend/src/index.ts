import express from "express";
import cors from "cors";

import route from "./route";
import { authMiddleware } from "./moddlewares/auth.middleware";

const app = express();
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  next();
});
app.use(authMiddleware);
app.use(route);

app.listen(3333, () => "server running on port 3333");
