export interface ICustomerBill {
  billNo: string;
  year: number;
  month: string;
  totalBill: number;
  lateFee: number;
  dueDate: Date | null;
  paidAmount: number;
  paymentDate: Date | null;
  paymentMethod: string;
  paymentStatus: string;
  detailUrl?: string;
  consumerNo?: string;
}

export interface ICustomerInfo {
  name?: string;
  careOf?: string;
  consumerNo?: string;
  type?: string;
  address?: string;
  mobile?: string;
  concernOffice?: string;
  feederName?: string;
  meterNo?: string;
  meterType?: string;
  meterStatus?: string;
  loadKw?: number;
  tariff?: string;
  balance?: number;
}

export interface ICustomerBillResponse {
  customerInfo: ICustomerInfo;
  bills: ICustomerBill[];
}