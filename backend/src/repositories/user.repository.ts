import { User } from "@prisma/client";
import Prisma from "../database/prisma-client";
import { List, ListCreate, ListRepository } from "../interfaces/list.interface";
import { UserCreate, UserRepository } from "../interfaces/user.interface";

export class UserRepositoryPrisma implements UserRepository {
  async create(data: UserCreate): Promise<User> {
    const result = await Prisma.user.create({
      data: {
        name: data.name,
        password: data.password,
      },
    });
    return result;
  }

  async authantication(username: string, password: string): Promise<string> {
    return "JWT";
  }

  async delete(id: string): Promise<boolean> {
    const result = await Prisma.user.delete({
      where: {
        id,
      },
    });

    return result ? true : false;
  }
}
