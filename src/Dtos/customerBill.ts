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