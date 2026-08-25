import { Controller, Get, Path, Route, Tags } from 'tsoa';
import { ICustomerBill } from '../Dtos/customerBill';
import { CustomerService } from '../services/customerService';
import { IRechargeHistory } from '../Dtos/rechargeHistory';

const defaultCustomerService = new CustomerService();

@Route('customers')
@Tags('Customers')
export class CustomersController extends Controller {

    public constructor(private readonly customerService: CustomerService = defaultCustomerService) {
        super();
    }

    @Get('{customerCode}/bills')
    public async getCustomerBills(
        @Path() customerCode: string
    ): Promise<ICustomerBill[]> {
        const bills = await this.customerService.getPostpaidCustomerBills(customerCode);
        if (!bills) {
            this.setStatus(404);
            throw new Error('Customer bills not found');
        }
        return bills;
    }

     @Get('{customerCode}/recharge-histories')
    public async getCustomerRechargeHistories(
        @Path() customerCode: string
    ): Promise<IRechargeHistory[]> {
        const rechargeHistories = await this.customerService.getPrepaidCustomerRechargeHistories(customerCode);
        if (!rechargeHistories) {
            this.setStatus(404);
            throw new Error('Customer recharge histories not found');
        }
        return rechargeHistories;
    }
}
