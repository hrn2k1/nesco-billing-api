import { Body, Controller, Get, Path, Post, Route, Tags } from 'tsoa';
import { UserResponse } from '../models/user';
import { prisma } from '../config/prisma';
import { UserRepository } from '../repositories/userRepository';
import { CreateUserInput, UserService } from '../services/userService';

const defaultUserService = new UserService(new UserRepository(prisma));

@Route('users')
@Tags('Users')
export class UsersController extends Controller {
  public constructor(private readonly userService: UserService = defaultUserService) {
    super();
  }

  @Get('{id}')
  public async getUser(@Path() id: string): Promise<UserResponse> {
    const user = await this.userService.getUser(id);
    if (!user) {
      this.setStatus(404);
      throw new Error('User not found');
    }

    return user;
  }

  @Post()
  public async createUser(@Body() body: CreateUserInput): Promise<UserResponse> {
    try {
      return await this.userService.createUser(body);
    } catch (error) {
      if (error instanceof Error && error.message.includes('already exists')) {
        this.setStatus(409);
      }
      throw error;
    }
  }
}
