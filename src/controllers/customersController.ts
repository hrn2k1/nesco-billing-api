import { Controller, Get, Path, Route, Tags } from 'tsoa';
import { CustomerBill } from '../Dtos/customerBill';
import { CustomerService } from '../services/customerService';

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
    ): Promise<CustomerBill[]> {
        const bills = await this.customerService.getPostpaidCustomerBills(customerCode);
        if (!bills) {
            this.setStatus(404);
            throw new Error('Customer bills not found');
        }
        return bills;
    }
}
