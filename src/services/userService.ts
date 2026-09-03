import { User } from '@prisma/client';
import { UserRepository } from '../repositories/userRepository';
import { ChangePasswordInput, CreateUserInput, LoginInput, UpdateUserInput } from '../Dtos/auth';

export class UserService {
  public constructor(private readonly userRepository: UserRepository) {}

  public async getUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  public async getUser(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  public async createUser(input: CreateUserInput): Promise<User> {
    const isOAuthUser = Boolean(input.provider && input.provider !== 'app');
    const hasPassword = Boolean(input.password);

    if (isOAuthUser === hasPassword) {
      throw new Error('Provide a password for an app user or a provider for an OAuth user');
    }

    const existingUser = await this.userRepository.findByLoginName(input.loginName);
    if (existingUser) {
      throw new Error('A user with this login name already exists');
    }

    return this.userRepository.create(input);
  }

  public async updateUser(id: string, input: UpdateUserInput): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      return null;
    }

    return this.userRepository.update(id, input);
  }

  public async changePassword(id: string, input: ChangePasswordInput): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      return null;
    }

    return this.userRepository.updatePassword(id, input.password);
  }

  public async deleteUser(id: string): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      return null;
    }

    return this.userRepository.delete(id);
  }

  public async authenticate(input: LoginInput): Promise<User> {
    const user = await this.userRepository.findByLoginName(input.loginName);

    if (!user && !('password' in input)) {
      const appUser = await this.userRepository.findByEmail(input.loginName);
      if (appUser && (appUser.provider ?? 'app') === 'app') {
        throw new Error('This email belongs to an app user; login with loginName and password');
      }
    }

    if (!user) {
      throw new Error('Invalid login credentials');
    }

    if ('password' in input) {
      if ((user.provider ?? 'app') !== 'app') {
        throw new Error(`This user is registered with ${user.provider}; login with ${user.provider}`);
      }
      if (user.password !== input.password) {
        throw new Error('Invalid login credentials');
      }
    } else if ((user.provider ?? 'app') === 'app') {
      throw new Error('This user is an app user; login with loginName and password');
    } else if (user.provider !== input.provider || !input.token.trim()) {
      throw new Error('Invalid OAuth credentials');
    }

    return user;
  }
}
