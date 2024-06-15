import { Router, Request, Response } from "express";
import { ListRepositoryPrisma } from "../repositories/list.repository";
import { verifyToken } from "../utils";

export const createList = async (req: Request, res: Response) => {
  const use = new ListRepositoryPrisma();
  try {
    const { userId } = verifyToken(
      req.headers.authorization?.split("Basic ")[1]
    );
    const data = await use.create({
      description: req.body.description,
      title: req.body.title,
      userId: userId,
    });
    return res.status(201).send({ listId: data.id });
  } catch (error) {
    return res.status(404).send(error);
  }
};

export const findList = async (req: Request, res: Response) => {
  const use = new ListRepositoryPrisma();
  const { userId } = verifyToken(req.headers.authorization?.split("Basic ")[1]);
  try {
    const data = await use.findById(userId);
    return res.status(201).send(data);
  } catch (error) {
    return res.status(404).send(error);
  }
};

export const updateList = async (req: Request, res: Response) => {
  const use = new ListRepositoryPrisma();
  try {
    const data = await use.update({
      description: req.body.description,
      status: req.body.status,
      title: req.body.title,
      id: req.body.id,
    });
    return res.status(201).send(data);
  } catch (error) {
    console.log(error);
    return res.status(404).send(error);
  }
};

export const deleteList = async (req: Request, res: Response) => {
  const use = new ListRepositoryPrisma();
  try {
    const data = await use.delete(req.body.id);
    return res.status(201).send(data);
  } catch (error) {
    console.log(error);
    return res.status(404).send(error);
  }
};
