import { Meter, PrismaClient } from '@prisma/client';
import { CreateMeterInput, UpdateMeterInput } from '../Dtos/meter';

export class MeterRepository {
  public constructor(private readonly prisma: PrismaClient) {}

  public findAll(userId?: string): Promise<Meter[]> {
    return this.prisma.meter.findMany({
      where: userId ? { userId } : undefined,
    });
  }

  public findById(id: string): Promise<Meter | null> {
    return this.prisma.meter.findUnique({ where: { id } });
  }

  public create(input: CreateMeterInput & { owner?: any }): Promise<Meter> {
    return this.prisma.meter.create({ data: input });
  }

  public update(id: string, input: UpdateMeterInput & { owner?: any }): Promise<Meter> {
    return this.prisma.meter.update({ where: { id }, data: input });
  }

  public delete(id: string): Promise<Meter> {
    return this.prisma.meter.delete({ where: { id } });
  }
}
