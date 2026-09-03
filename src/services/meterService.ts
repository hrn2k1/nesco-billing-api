import { Meter } from '@prisma/client';
import { CreateMeterInput, CreateMyMeterInput, UpdateMeterInput, UpdateMyMeterInput } from '../Dtos/meter';
import { MeterRepository } from '../repositories/meterRepository';

export class MeterService {
  public constructor(private readonly meterRepository: MeterRepository) {}

  public getMeters(userId?: string): Promise<Meter[]> {
    return this.meterRepository.findAll(userId);
  }

  public getMeter(id: string): Promise<Meter | null> {
    return this.meterRepository.findById(id);
  }

  public createMeter(input: CreateMeterInput): Promise<Meter> {
    return this.meterRepository.create(input);
  }

  public createMyMeter(userId: string, input: CreateMyMeterInput): Promise<Meter> {
    return this.meterRepository.create({ ...input, userId });
  }

  public updateMeter(id: string, input: UpdateMeterInput): Promise<Meter> {
    return this.meterRepository.update(id, input);
  }

  public async updateMyMeter(
    id: string,
    userId: string,
    input: UpdateMyMeterInput,
  ): Promise<Meter | null> {
    const meter = await this.meterRepository.findById(id);
    if (!meter || meter.userId !== userId) {
      return null;
    }

    return this.meterRepository.update(id, input);
  }

  public deleteMeter(id: string): Promise<Meter> {
    return this.meterRepository.delete(id);
  }

  public async deleteMyMeter(id: string, userId: string): Promise<Meter | null> {
    const meter = await this.meterRepository.findById(id);
    if (!meter || meter.userId !== userId) {
      return null;
    }

    return this.meterRepository.delete(id);
  }
}
