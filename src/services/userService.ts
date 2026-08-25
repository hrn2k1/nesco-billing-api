import { User } from '@prisma/client';
import { UserRepository } from '../repositories/userRepository';

export interface CreateUserInput {
  name: string;
  email: string;
}

export class UserService {
  public constructor(private readonly userRepository: UserRepository) {}

  public async getUser(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  public async createUser(input: CreateUserInput): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new Error('A user with this email already exists');
    }

    return this.userRepository.create(input.name, input.email);
  }
}
