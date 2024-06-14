import express from "express";
import cors from "cors";

import route from "./route";
import { authMiddleware } from "./moddlewares/auth.middleware";

const app = express();

app.use(express.json());
app.use(cors());
app.use(authMiddleware);
app.use(route);

app.listen(3333, () => "server running on port 3333");
