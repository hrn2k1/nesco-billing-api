import { Meter } from '@prisma/client';
import { CreateMeterInput, UpdateMeterInput } from '../Dtos/meter';
import { MeterRepository } from '../repositories/meterRepository';
import { ICustomerInfo } from '../Dtos/customerBill';
import { CustomerService } from './customerService';
const defaultCustomerService = new CustomerService();

export class MeterService {
  public constructor(private readonly meterRepository: MeterRepository,
    private readonly customerService: CustomerService = defaultCustomerService
  ) { }

  public getMeters(userId?: string): Promise<Meter[]> {
    return this.meterRepository.findAll(userId);
  }

  public getMeter(id: string): Promise<Meter | null> {
    return this.meterRepository.findById(id);
  }

  public async createMeter(input: CreateMeterInput): Promise<Meter> {
    const { accountNo, accountType, provider } = input;
    let owner: ICustomerInfo | null = null;
    if (accountNo && accountType?.toLowerCase() === 'prepaid' && provider?.toUpperCase() === 'NESCO') {
      owner = await this.customerService.getPrepaidCustomerInfo(accountNo);
    } else if (accountNo && accountType?.toLowerCase() === 'postpaid' && provider?.toUpperCase() === 'NESCO') {
      owner = await this.customerService.getPostpaidCustomerInfo(accountNo);
    }
    return this.meterRepository.create({ ...input, owner });
  }

  public async updateMeter(id: string, input: UpdateMeterInput): Promise<Meter> {
    const { accountNo, accountType, provider } = input;
    let owner: ICustomerInfo | null = null;
    if (accountNo && accountType?.toLowerCase() === 'prepaid' && provider?.toUpperCase() === 'NESCO') {
      owner = await this.customerService.getPrepaidCustomerInfo(accountNo);
    } else if (accountNo && accountType?.toLowerCase() === 'postpaid' && provider?.toUpperCase() === 'NESCO') {
      owner = await this.customerService.getPostpaidCustomerInfo(accountNo);
    }
    return this.meterRepository.update(id, { ...input, owner });
  }

  public deleteMeter(id: string): Promise<Meter> {
    return this.meterRepository.delete(id);
  }
}
