import { User } from "@prisma/client";
import Prisma from "../database/prisma-client";
import { UserCreate, UserRepository } from "../interfaces/user.interface";
import { generateToken, hashPassword } from "../utils";

export class UserRepositoryPrisma implements UserRepository {
  async create(data: UserCreate): Promise<User> {
    const result = await Prisma.user.create({
      data: {
        name: data.name,
        password: hashPassword(data.password),
      },
    });
    return result;
  }

  async authantication(username: string, password: string): Promise<string> {
    const result = await Prisma.user.findMany({
      where: { name: username, password: hashPassword(password) },
    });
    if (result.length > 0) {
      return generateToken(result[0].name, result[0].id);
    } else {
      this.create({ name: username, password: password });
      return generateToken(username, password);
    }
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
