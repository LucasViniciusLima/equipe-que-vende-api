import { IsNotEmpty } from "class-validator";
import { Contact } from "../interfaces/contact-sale.entity";
import { Sale } from "../interfaces/sale.entity";


export class CreateSaleDto extends Sale{
    @IsNotEmpty()
    contact: Contact;
}