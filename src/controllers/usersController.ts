import { Body, Controller, Delete, Get, Patch, Path, Post, Route, Tags } from 'tsoa';
import { UserDto } from '../models/user';
import { prisma } from '../config/prisma';
import { UserRepository } from '../repositories/userRepository';
import { UserService } from '../services/userService';
import { Mapper } from '../models/mapper';
import { ChangePasswordInput, CreateUserInput, UpdateUserInput } from '../Dtos/auth';

const defaultUserService = new UserService(new UserRepository(prisma));

@Route('users')
@Tags('Users')
export class UsersController extends Controller {
  public constructor(private readonly userService: UserService = defaultUserService) {
    super();
  }

  @Get()
  public async getUsers(): Promise<UserDto[]> {
    const users = await this.userService.getUsers();
    return users.map(Mapper.toUserDto);
  }

  @Get('{id}')
  public async getUser(@Path() id: string): Promise<UserDto> {
    const user = await this.userService.getUser(id);
    if (!user) {
      this.setStatus(404);
      throw new Error('User not found');
    }

    return Mapper.toUserDto(user);
  }

  @Post()
  public async createUser(@Body() body: CreateUserInput): Promise<UserDto> {
    try {
      return Mapper.toUserDto(await this.userService.createUser(body));
    } catch (error) {
      if (error instanceof Error && error.message.includes('already exists')) {
        this.setStatus(409);
      }
      throw error;
    }
  }

  @Patch('{id}')
  public async updateUser(
    @Path() id: string,
    @Body() body: UpdateUserInput,
  ): Promise<UserDto> {
    try {
      const user = await this.userService.updateUser(id, body);
      if (!user) {
        this.setStatus(404);
        throw new Error('User not found');
      }
      return Mapper.toUserDto(user);
    } catch (error) {
      if (error instanceof Error && error.message.includes('already exists')) {
        this.setStatus(409);
      }
      throw error;
    }
  }

  @Patch('{id}/change-password')
  public async changePassword(
    @Path() id: string,
    @Body() body: ChangePasswordInput,
  ): Promise<UserDto> {
    if (!body.password?.trim()) {
      this.setStatus(400);
      throw new Error('Password is required');
    }

    const user = await this.userService.changePassword(id, {
      password: body.password.trim(),
    });
    if (!user) {
      this.setStatus(404);
      throw new Error('User not found');
    }

    return Mapper.toUserDto(user);
  }

  @Delete('{id}')
  public async deleteUser(@Path() id: string): Promise<UserDto> {
    const user = await this.userService.deleteUser(id);
    if (!user) {
      this.setStatus(404);
      throw new Error('User not found');
    }

    return Mapper.toUserDto(user);
  }
}
