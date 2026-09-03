export interface MeterDto {
  id: string;
  name: string;
  accountNo: string;
  accountType?: string | 'Prepaid' | 'Postpaid' | null;
  provider?: string | 'NESCO' | 'DESCO';
  userId?: string;
  createdAt: Date;
  updatedAt?: Date;
}