import { Body, Controller, Post, Route, Tags } from 'tsoa';
import { sign } from 'jsonwebtoken';
import { UserDto } from '../models/user';
import { prisma } from '../config/prisma';
import { UserRepository } from '../repositories/userRepository';
import { UserService } from '../services/userService';
import { Mapper } from '../models/mapper';
import { CreateUserInput, LoginInput, LoginResponse } from '../Dtos/auth';

const defaultUserService = new UserService(new UserRepository(prisma));

@Route('auth')
@Tags('Authentication')
export class AuthController extends Controller {
    public constructor(private readonly userService: UserService = defaultUserService) {
        super();
    }

    @Post('register')
    public async register(@Body() body: CreateUserInput): Promise<UserDto> {
        try {
            return Mapper.toUserDto(await this.userService.createUser(body));
        } catch (error) {
            if (error instanceof Error && error.message.includes('already exists')) {
                this.setStatus(409);
            } else if (error instanceof Error && error.message.includes('Provide a password')) {
                this.setStatus(400);
            }
            throw error;
        }
    }

    @Post('login')
    public async login(@Body() body: LoginInput): Promise<LoginResponse> {
        try {
            const user = Mapper.toUserDto(await this.userService.authenticate(body));
            const { id, name, loginName, provider, email, mobileNo } = user;

            return {
                id,
                name,
                loginName,
                provider,
                email,
                mobileNo,
                token: sign(
                    { id, name, loginName, provider, email, mobileNo },
                    process.env.JWT_SECRET ?? 'development-secret-change-me',
                    { expiresIn: '1d' },
                ),
            };
        } catch (error) {
            if (error instanceof Error && error.message.includes('credentials')) {
                this.setStatus(401);
            }
            throw error;
        }
    }
}
