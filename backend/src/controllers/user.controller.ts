import { Request, Response } from "express";
import { UserRepositoryPrisma } from "../repositories/user.repository";

export const createUser = async (req: Request, res: Response) => {
  const use = new UserRepositoryPrisma();
  try {
    use.create({
      name: req.body.username,
      password: req.body.password,
    });
    return res.status(201).send();
  } catch (error) {
    return res.status(404).send(error);
  }
};
export const deleteUser = (req: Request, res: Response) => {
  try {
    return res.status(201).send();
  } catch (error) {
    console.error(error);
    return res.status(404).send(error);
  }
};

export const authUser = async (req: Request, res: Response) => {
  const use = new UserRepositoryPrisma();
  try {
    const jwt = await use.authantication(req.body.username, req.body.password);
    return res.status(201).send({ token: jwt });
  } catch (error) {
    return res.status(404).send(error);
  }
};
