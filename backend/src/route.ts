import { Router, Request, Response } from "express";
import { Read, Create, Delete, Update } from "./controllers/toDoController";
const routes = Router();

routes.get("/a", Read);

routes.post("/b", Create);

routes.delete("/c", Delete);

routes.post("/d", Update);

export default routes;
