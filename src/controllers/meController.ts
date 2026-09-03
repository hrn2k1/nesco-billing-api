import { Body, Controller, Delete, Get, Patch, Path, Post, Request, Route, Security, Tags } from 'tsoa';
import { prisma } from '../config/prisma';
import { UserRepository } from '../repositories/userRepository';
import { UserService } from '../services/userService';
import { MeterRepository } from '../repositories/meterRepository';
import { MeterService } from '../services/meterService';
import { MeterDto } from '../models/meter';
import { Mapper } from '../models/mapper';
import { MeResponse } from '../Dtos/me';
import { CreateMyMeterInput, UpdateMyMeterInput } from '../Dtos/meter';

const defaultUserService = new UserService(new UserRepository(prisma));
const defaultMeterService = new MeterService(new MeterRepository(prisma));

interface AuthenticatedRequest {
  userId?: string;
}

@Route('me')
@Tags('Me')
@Security('bearerAuth')
export class MeController extends Controller {
  public constructor(
    private readonly userService: UserService = defaultUserService,
    private readonly meterService: MeterService = defaultMeterService,
  ) {
    super();
  }

  @Get()
  public async getMe(@Request() request: AuthenticatedRequest): Promise<MeResponse> {
    const userId = this.getAuthenticatedUserId(request);
    const user = await this.userService.getUser(userId);
    if (!user) {
      this.setStatus(404);
      throw new Error('User not found');
    }

    const userDto = Mapper.toUserDto(user);
    return {
      name: userDto.name,
      loginName: userDto.loginName,
      provider: userDto.provider,
      email: userDto.email,
      mobileNo: userDto.mobileNo,
    };
  }

  @Get('meters')
  public async getMyMeters(@Request() request: AuthenticatedRequest): Promise<MeterDto[]> {
    const userId = this.getAuthenticatedUserId(request);
    const meters = await this.meterService.getMeters(userId);
    return meters.map(Mapper.toMeterDto);
  }

  @Post('meters')
  public async createMyMeter(
    @Request() request: AuthenticatedRequest,
    @Body() body: CreateMyMeterInput,
  ): Promise<MeterDto> {
    const meter = await this.meterService.createMyMeter(
      this.getAuthenticatedUserId(request),
      body,
    );
    return Mapper.toMeterDto(meter);
  }

  @Patch('meters/{id}')
  public async updateMyMeter(
    @Request() request: AuthenticatedRequest,
    @Path() id: string,
    @Body() body: UpdateMyMeterInput,
  ): Promise<MeterDto> {
    const meter = await this.meterService.updateMyMeter(
      id,
      this.getAuthenticatedUserId(request),
      body,
    );
    if (!meter) {
      this.setStatus(404);
      throw new Error('Meter not found');
    }
    return Mapper.toMeterDto(meter);
  }

  @Delete('meters/{id}')
  public async deleteMyMeter(
    @Request() request: AuthenticatedRequest,
    @Path() id: string,
  ): Promise<MeterDto> {
    const meter = await this.meterService.deleteMyMeter(
      id,
      this.getAuthenticatedUserId(request),
    );
    if (!meter) {
      this.setStatus(404);
      throw new Error('Meter not found');
    }
    return Mapper.toMeterDto(meter);
  }

  private getAuthenticatedUserId(request: AuthenticatedRequest): string {
    if (!request.userId) {
      this.setStatus(401);
      throw new Error('Authenticated user is required');
    }
    return request.userId;
  }
}
