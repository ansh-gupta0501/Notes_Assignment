import { Injectable } from '@nestjs/common';
import { Customer } from './interfaces/customer.interface';
import { CreateCustomerDto } from './dto/create-customer.dto';

@Injectable()
export class CustomerService {
    private customers: Customer[] = []

    getAllCustomers(): Customer[]{
        return this.customers;
    }

    // now we have to pass data to addCustomer and that data will come from client side,now from client side it can be anything , so we need to validate that data . We want securtiy that only name and age will come from client 
    addCustomer(createCustomerDto: CreateCustomerDto ): Customer{  // we pass dto here . createCustomerDto it is parameter having type CreateCustomerDto
        const newCustomer: Customer = {
            id: Date.now(),
            ...createCustomerDto  // createCustomerDto will basically an object 
        }

        this.customers.push(newCustomer)

        return newCustomer;
    }
        
}
