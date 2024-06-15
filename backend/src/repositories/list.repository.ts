import Prisma from "../database/prisma-client";
import { List, ListCreate, ListRepository } from "../interfaces/list.interface";

export class ListRepositoryPrisma implements ListRepository {
  async create(data: ListCreate): Promise<List> {
    const result = await Prisma.list.create({
      data: {
        description: data.description,
        title: data.title,
        userId: data.userId,
        status: data.status,
      },
    });
    return result;
  }
  async update({ id, title, description, status }: List): Promise<List> {
    const result = await Prisma.list.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        status,
      },
    });
    return result;
  }

  async findById(userId: string): Promise<List[]> {
    const result = await Prisma.list.findMany({
      where: { userId: userId },
    });
    return result;
  }

  async delete(id: string): Promise<boolean> {
    const result = await Prisma.list.delete({
      where: {
        id,
      },
    });

    return result ? true : false;
  }
}
