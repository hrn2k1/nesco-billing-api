import { ICustomerInfo } from "../Dtos/customerBill";

export interface MeterDto {
  id: string;
  name: string;
  accountNo: string;
  accountType?: string | 'Prepaid' | 'Postpaid' | null;
  provider?: string | 'NESCO' | 'DESCO';
  userId?: string;
  owner?: ICustomerInfo | any;
  createdAt: Date;
  updatedAt?: Date;
}