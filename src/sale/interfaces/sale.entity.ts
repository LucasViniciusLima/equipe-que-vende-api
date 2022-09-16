import { Contact } from "./contact-sale.entity";

export class Sale {
    id?: number;

    codUser: string;
    contact: Contact;

    status: string;
    
    payment: Payment;
    product: Product;

    dates: Dates;
}

class Dates {
    created_at: string;
    confirmed_at: string;
}

class Payment {
    method: string;
	currency: string;
	total: number;
}

class Product {
	name: string;
	image_url: string;

}