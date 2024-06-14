import { Router } from "express";
import {
  findList,
  createList,
  deleteList,
  updateList,
} from "./controllers/list.controller";
import {
  createGroup,
  deleteGroup,
  findGroup,
  updateGroup,
} from "./controllers/group.controller";

import {
  authUser,
  createUser,
  deleteUser,
} from "./controllers/user.controller";
const routes = Router();

routes.get("/list/findBy", findList);
routes.post("/list/create", createList);
routes.delete("/list/delete", deleteList);
routes.post("/list/update", updateList);

routes.get("/group/findAll", findGroup);
routes.post("/group/create", createGroup);
routes.delete("/group/delete", deleteGroup);
routes.post("/group/update", updateGroup);

routes.get("/user/login", authUser);
routes.post("/user/register", createUser);
routes.delete("/user/delete", deleteUser);

export default routes;
