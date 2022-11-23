import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { RankingService } from 'src/ranking/ranking.service';
import { Sale } from './interfaces/sale.entity';

@Injectable()
export class SaleService {

    constructor(
        private readonly rankingService: RankingService,
        @InjectModel('Sale') private readonly saleModel: Model<Sale>) { }

    async creatSale(createSaleDto: any): Promise<Sale | any> {
        console.log(createSaleDto);

        if (createSaleDto.status == "approved" || createSaleDto.status == "refunded" || createSaleDto.status == "chargeback") {
            const transaction_id = createSaleDto.id;
            const saleExist = await this.saleModel.findOne({ transaction_id });
            
            if (saleExist) {                
                return new BadRequestException('Venda já existe');
            }

            const newSale = new this.saleModel({
                ...createSaleDto,
                transaction_id,
                source: createSaleDto.source.pptc
            });

            await newSale.save();

            if (createSaleDto.status == "approved") this.rankingService.updateRanking(createSaleDto);
            else this.rankingService.removeSelerPoint(createSaleDto.source.pptc.checkout_id);

            console.log(newSale);

            return newSale;
        }

        return;
    }

    async getSalesByCheckoutId(checkout_id: string): Promise<Sale[]> {
        if (checkout_id == '') throw new BadRequestException(`CheckoutId cannot be null`);

        const salesList = await this.saleModel.find().exec();

        const filterSalesList = salesList.filter((item: any) => item.source.checkout_id == checkout_id);

        return filterSalesList;
    }

    async getAllSales(): Promise<Sale[]> {
        const salesList = await this.saleModel.find().exec();
        return salesList;
    }

}
