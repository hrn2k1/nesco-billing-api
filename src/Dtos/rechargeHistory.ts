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