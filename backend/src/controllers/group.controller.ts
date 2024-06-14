import { Request, Response } from "express";
import { GroupListRepositoryPrisma } from "../repositories/group.repository";
import { verifyToken } from "../utils";

export const createGroup = async (req: Request, res: Response) => {
  const use = new GroupListRepositoryPrisma();
  try {
    const { userId } = verifyToken(
      req.headers.authorization?.split("Basic ")[1]
    );
    const data = await use.create({
      title: req.body.title,
      userId: userId,
    });
    return res.status(201).send({ groupId: data.id });
  } catch (error) {
    return res.status(404).send(error);
  }
};

export const findGroup = async (req: Request, res: Response) => {
  const use = new GroupListRepositoryPrisma();
  try {
    const { userId } = verifyToken(
      req.headers.authorization?.split("Basic ")[1]
    );
    const data = await use.findAll(userId);
    return res.status(201).send(data);
  } catch (error) {
    return res.status(404).send(error);
  }
};

export const updateGroup = async (req: Request, res: Response) => {
  const use = new GroupListRepositoryPrisma();
  try {
    const data = await use.update({
      title: req.body.title,
      id: req.body.id,
    });
    return res.status(201).send(data);
  } catch (error) {
    console.log(error);
    return res.status(404).send(error);
  }
};

export const deleteGroup = async (req: Request, res: Response) => {
  const use = new GroupListRepositoryPrisma();
  try {
    const data = await use.delete(req.body.id);
    return res.status(201).send(data);
  } catch (error) {
    console.log(error);
    return res.status(404).send(error);
  }
};
