import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSaleDto } from './dto/create-sale.dto';
import { Sale } from './interfaces/sale.entity';

@Injectable()
export class SaleService {

    constructor(@InjectModel('Sale') private readonly saleModel: Model<Sale>) {}

    async creatSale(createSaleDto: CreateSaleDto): Promise<Sale> {
        const newSale = new this.saleModel(createSaleDto);

        await newSale.save();
        return newSale;
    }

}
