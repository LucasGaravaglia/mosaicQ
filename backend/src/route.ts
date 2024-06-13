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

routes.get("/findListById", findList);
routes.post("/createList", createList);
routes.delete("/deleteList", deleteList);
routes.post("/updateList", updateList);

routes.get("/findFroupById", findGroup);
routes.post("/createGroup", createGroup);
routes.delete("/deleteGroup", deleteGroup);
routes.post("/updateGroup", updateGroup);

routes.get("/login", authUser);
routes.post("/createUser", createUser);
routes.delete("/deleteUser", deleteUser);

export default routes;
