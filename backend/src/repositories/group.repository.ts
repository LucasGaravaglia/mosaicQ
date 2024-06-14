import Prisma from "../database/prisma-client";
import {
  GroupList,
  GroupListCreate,
  GroupListRepository,
} from "../interfaces/group.interface";

export class GroupListRepositoryPrisma implements GroupListRepository {
  async create(data: GroupListCreate): Promise<GroupList> {
    const result = await Prisma.groupList.create({
      data: {
        title: data.title,
        userId: data.userId,
      },
    });
    return result;
  }

  async update({ id, title }: GroupList): Promise<GroupList> {
    const result = await Prisma.groupList.update({
      where: {
        id,
      },
      data: {
        title,
      },
    });
    return result;
  }

  async findAll(userId: string): Promise<GroupList[]> {
    const result = await Prisma.groupList.findMany({
      where: { userId: userId },
    });
    return result;
  }

  async delete(id: string): Promise<boolean> {
    const result = await Prisma.groupList.delete({
      where: {
        id,
      },
    });

    return result ? true : false;
  }
}
