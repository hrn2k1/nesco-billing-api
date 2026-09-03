export interface CreateMeterInput {
  name: string;
  accountNo: string;
  accountType?: 'Prepaid' | 'Postpaid';
  provider?: 'NESCO' | 'DESCO';
  userId: string;
}

export interface UpdateMeterInput {
  name?: string;
  accountNo?: string;
  accountType?: 'Prepaid' | 'Postpaid';
  provider?: 'NESCO' | 'DESCO';
  userId?: string;
}

export type CreateMyMeterInput = Omit<CreateMeterInput, 'userId'>;
export type UpdateMyMeterInput = Omit<UpdateMeterInput, 'userId'>;
