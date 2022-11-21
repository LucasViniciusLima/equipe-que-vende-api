import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Payload, Sale } from "../interfaces/sale.entity";


export class CreateSaleDto extends Sale{
    @IsNotEmpty()
    last_transaction: Payload;

}