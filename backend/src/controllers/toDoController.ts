import { Router, Request, Response } from "express";
import { ToDoRepositoryPrisma } from "../repositories/todo.repository";

export const Read = async (req: Request, res: Response) => {
  const use = new ToDoRepositoryPrisma();
  try {
    use.create({ description: "Teste", title: "teste" });
    return res.status(201).send();
  } catch (error) {
    return res.status(404).send(error);
  }
};
export const Create = async (req: Request, res: Response) => {
  try {
    return res.status(201).send();
  } catch (error) {
    return res.status(404).send(error);
  }
};

export const Update = async (req: Request, res: Response) => {
  try {
    return res.status(201).send();
  } catch (error) {
    console.log(error);
    return res.status(404).send(error);
  }
};

export const Delete = (req: Request, res: Response) => {
  try {
    return res.status(201).send();
  } catch (error) {
    console.log(error);
    return res.status(404).send(error);
  }
};
