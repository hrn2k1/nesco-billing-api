import { ICustomerInfo } from "./customerBill";

export interface IRechargeHistory {
    slNo: number;
    seqNo: string;
    tokenNumber: string;
    meterRent: number;
    demandCharge: number;
    pfcCharge: number;
    vat: number;
    paidDebt: number;
    rebate: number;
    energyAmount: number;
    rechargeAmount: number;
    estimatedUnit: number;
    rechargeMedia: string;
    rechargeDate: Date | null;
    remoteRechargeStatus: string;
}

export interface IMonthlyConsumption {
    year?: number;
    month?: string;
    totalRecharge?: number;
    rebate?: number;
    energyUsage?: number;
    meterRent?: number;
    demandCharge?: number;
    pfcCharge?: number;
    paidDebt?: number;
    vat?: number;
    totalUsageDeduction?: number;
    monthEndBalance?: number;
    energyUsageUnit?: number;
}

export interface IRechargeHistoryResponse {
    customerInfo: ICustomerInfo;
    rechargeHistories: IRechargeHistory[];
}

export interface IMonthlyConsumptionResponse {
    customerInfo: ICustomerInfo;
    monthlyConsumptions: IMonthlyConsumption[];
}