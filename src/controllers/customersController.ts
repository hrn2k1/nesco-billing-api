import { Controller, Get, Path, Route, Security, Tags } from 'tsoa';
import { ICustomerBillResponse } from '../Dtos/customerBill';
import { CustomerService } from '../services/customerService';
import { IMonthlyConsumptionResponse, IRechargeHistoryResponse } from '../Dtos/rechargeHistory';

const defaultCustomerService = new CustomerService();

@Route('customers')
@Tags('Customers')
@Security('bearerAuth')
export class CustomersController extends Controller {

    public constructor(private readonly customerService: CustomerService = defaultCustomerService) {
        super();
    }

    /**
     * Get monthly bills of postpaid customers
     */
    @Get('{customerCode}/bills')
    public async getCustomerBills(
        @Path() customerCode: string
    ): Promise<ICustomerBillResponse> {
        const bills = await this.customerService.getPostpaidCustomerBills(customerCode.trim());
        if (!bills) {
            this.setStatus(404);
            throw new Error('Customer bills not found');
        }
        return bills;
    }

    /**
     * Get recharge histories of prepaid customers
     */
    @Get('{customerCode}/recharge-histories')
    public async getCustomerRechargeHistories(
        @Path() customerCode: string
    ): Promise<IRechargeHistoryResponse> {
        const rechargeHistories = await this.customerService.getPrepaidCustomerRechargeHistories(customerCode.trim());
        if (!rechargeHistories) {
            this.setStatus(404);
            throw new Error('Customer recharge histories not found');
        }
        return rechargeHistories;
    }

    /**
     * Get monthly consumption data of prepaid customers
     */
    @Get('{customerCode}/monthly-consumption')
    public async getCustomerMonthlyConsumption(
        @Path() customerCode: string
    ): Promise<IMonthlyConsumptionResponse> {
        const monthlyConsumptions = await this.customerService.getPrepaidCustomerMonthlyConsumption(customerCode.trim());
        if (!monthlyConsumptions) {
            this.setStatus(404);
            throw new Error('Customer monthly consumption data not found');
        }
        return monthlyConsumptions;
    }
}
