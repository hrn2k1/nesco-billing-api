import { PrismaClient, User } from '@prisma/client';

export class UserRepository {
  public constructor(private readonly prisma: PrismaClient) {}

  public findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  public findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  public create(name: string, email: string): Promise<User> {
    return this.prisma.user.create({ data: { name, email } });
  }
}
