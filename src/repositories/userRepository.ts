import { PrismaClient, User } from '@prisma/client';
import { CreateUserInput, UpdateUserInput } from '../Dtos/auth';

export class UserRepository {
  public constructor(private readonly prisma: PrismaClient) {}

  public findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  public findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  public findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findFirst({ where: { email } });
  }

  public findByLoginName(loginName: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { loginName } });
  }

  public create(input: CreateUserInput): Promise<User> {
    return this.prisma.user.create({
      data: {
        name: input.name,
        loginName: input.loginName,
        password: input.password,
        provider: input.provider ?? 'app',
        email: input.email,
        mobileNo: input.mobileNo,
      },
    });
  }

  public update(id: string, input: UpdateUserInput): Promise<User> {
    return this.prisma.user.update({ where: { id }, data: input });
  }

  public updatePassword(id: string, password: string): Promise<User> {
    return this.prisma.user.update({ where: { id }, data: { password } });
  }

  public delete(id: string): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}
