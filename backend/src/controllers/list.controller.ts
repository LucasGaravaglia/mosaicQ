import { Router, Request, Response } from "express";
import { ListRepositoryPrisma } from "../repositories/list.repository";

export const createList = async (req: Request, res: Response) => {
  const use = new ListRepositoryPrisma();
  try {
    const data = await use.create({
      description: req.body.description,
      title: req.body.title,
      groupId: req.body.groupId,
    });
    return res.status(201).send(data);
  } catch (error) {
    return res.status(404).send(error);
  }
};

export const findList = async (req: Request, res: Response) => {
  try {
    return res.status(201).send();
  } catch (error) {
    return res.status(404).send(error);
  }
};

export const updateList = async (req: Request, res: Response) => {
  try {
    return res.status(201).send();
  } catch (error) {
    console.log(error);
    return res.status(404).send(error);
  }
};

export const deleteList = (req: Request, res: Response) => {
  try {
    return res.status(201).send();
  } catch (error) {
    console.log(error);
    return res.status(404).send(error);
  }
};
