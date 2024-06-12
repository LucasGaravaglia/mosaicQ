import Prisma from "../database/prisma-client";
import { ToDo, ToDoCreate, ToDoRepository } from "../interfaces/todo.interface";

export class ToDoRepositoryPrisma implements ToDoRepository {
  async create(data: ToDoCreate): Promise<ToDo> {
    const result = await Prisma.toDo.create({
      data: {
        description: data.description,
        title: data.title,
        status: "pending",
      },
    });
    return result;
  }
}
