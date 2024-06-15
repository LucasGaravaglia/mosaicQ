import { Router } from "express";
import {
  findList,
  createList,
  deleteList,
  updateList,
} from "./controllers/list.controller";

import {
  authUser,
  createUser,
  deleteUser,
} from "./controllers/user.controller";
const routes = Router();

routes.get("/list/find", findList);
routes.post("/list/create", createList);
routes.delete("/list/delete", deleteList);
routes.post("/list/update", updateList);

routes.get("/user/login", authUser);
routes.post("/user/register", createUser);
routes.delete("/user/delete", deleteUser);

export default routes;
