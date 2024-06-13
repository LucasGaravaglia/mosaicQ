import { Request, Response } from "express";
import { GroupListRepositoryPrisma } from "../repositories/group.repository";

export const createGroup = async (req: Request, res: Response) => {
  const use = new GroupListRepositoryPrisma();
  try {
    const data = await use.create({
      title: req.body.title,
      userId: req.body.userId,
    });
    return res.status(201).send(data);
  } catch (error) {
    return res.status(404).send(error);
  }
};

export const findGroup = async (req: Request, res: Response) => {
  try {
    return res.status(201).send();
  } catch (error) {
    return res.status(404).send(error);
  }
};

export const updateGroup = async (req: Request, res: Response) => {
  try {
    return res.status(201).send();
  } catch (error) {
    console.log(error);
    return res.status(404).send(error);
  }
};

export const deleteGroup = (req: Request, res: Response) => {
  try {
    return res.status(201).send();
  } catch (error) {
    console.log(error);
    return res.status(404).send(error);
  }
};
