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

  async delete(id: string): Promise<boolean> {
    const result = await Prisma.groupList.delete({
      where: {
        id,
      },
    });

    return result ? true : false;
  }
}
