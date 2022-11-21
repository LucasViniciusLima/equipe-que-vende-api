import { Contact } from "./contact-sale.entity";

export class Sale{
    source: Source;

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

class Source{
    pptc: Pptc;
}

class Pptc{
    checkout_id: string;
    checkout_name: string;
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