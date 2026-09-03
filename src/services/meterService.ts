import { Meter } from '@prisma/client';
import { CreateMeterInput, UpdateMeterInput } from '../Dtos/meter';
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

  public updateMeter(id: string, input: UpdateMeterInput): Promise<Meter> {
    return this.meterRepository.update(id, input);
  }

  public deleteMeter(id: string): Promise<Meter> {
    return this.meterRepository.delete(id);
  }
}
