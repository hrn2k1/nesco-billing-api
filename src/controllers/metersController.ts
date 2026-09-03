import { Body, Controller, Delete, Get, Path, Post, Put, Query, Route, Security, Tags } from 'tsoa';
import { MeterDto } from '../models/meter';
import { prisma } from '../config/prisma';
import { CreateMeterInput, UpdateMeterInput } from '../Dtos/meter';
import { MeterRepository } from '../repositories/meterRepository';
import { MeterService } from '../services/meterService';
import { Mapper } from '../models/mapper';

const defaultMeterService = new MeterService(new MeterRepository(prisma));

@Route('meters')
@Tags('Meters')
@Security('bearerAuth')
export class MetersController extends Controller {
	public constructor(private readonly meterService: MeterService = defaultMeterService) {
		super();
	}

	@Get()
	public async getMeters(@Query() userId?: string): Promise<MeterDto[]> {
        const meters = await this.meterService.getMeters(userId?.trim() || undefined);
		return meters.map(Mapper.toMeterDto);
	}

	@Get('{id}')
	public async getMeter(@Path() id: string): Promise<MeterDto> {
		const meter = await this.meterService.getMeter(id);
		if (!meter) {
			this.setStatus(404);
			throw new Error('Meter not found');
		}
		return Mapper.toMeterDto(meter);
	}

	@Post()
	public async createMeter(@Body() body: CreateMeterInput): Promise<MeterDto> {
        const createdMeter = await this.meterService.createMeter(body);
		return Mapper.toMeterDto(createdMeter);
	}

	@Put('{id}')
	public async updateMeter(@Path() id: string, @Body() body: UpdateMeterInput): Promise<MeterDto> {
		const existingMeter = await this.meterService.getMeter(id);
		if (!existingMeter) {
			this.setStatus(404);
			throw new Error('Meter not found');
		}
        const updatedMeter = await this.meterService.updateMeter(id, body);
		return Mapper.toMeterDto(updatedMeter);
	}

	@Delete('{id}')
	public async deleteMeter(@Path() id: string): Promise<MeterDto> {
		const existingMeter = await this.meterService.getMeter(id);
		if (!existingMeter) {
			this.setStatus(404);
			throw new Error('Meter not found');
		}
        const deletedMeter = await this.meterService.deleteMeter(id);
		return Mapper.toMeterDto(deletedMeter);
	}
}
