import Prisma from "../database/prisma-client";
import { List, ListCreate, ListRepository } from "../interfaces/list.interface";

export class ListRepositoryPrisma implements ListRepository {
  async create(data: ListCreate): Promise<List> {
    const result = await Prisma.list.create({
      data: {
        description: data.description,
        title: data.title,
        groupId: data.groupId,
        status: "pending",
      },
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
