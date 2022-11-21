import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RankingService } from 'src/ranking/ranking.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { Sale } from './interfaces/sale.entity';

@Injectable()
export class SaleService {

    constructor(
        private readonly rankingService: RankingService,
        @InjectModel('Sale') private readonly saleModel: Model<Sale>) { }

    async creatSale(createSaleDto: CreateSaleDto): Promise<Sale> {

        if (createSaleDto.last_transaction.status == "approved" || createSaleDto.last_transaction.status == "refunded" || createSaleDto.last_transaction.status == "chargeback") {
            const newSale = new this.saleModel({
                ...createSaleDto.last_transaction,
                source: createSaleDto.last_transaction.source.pptc
            });

            await newSale.save();

            if (createSaleDto.last_transaction.status == "approved") this.rankingService.updateRanking(createSaleDto);
            else this.rankingService.removeSelerPoint(createSaleDto.last_transaction.source.pptc.checkout_id);

            return newSale;
        }

        return;
    }

    async getSalesByCheckoutId(checkout_id: string): Promise<Sale[]> {      
        if(checkout_id == '') throw new BadRequestException(`CheckoutId cannot be null`);

        const salesList = await this.saleModel.find().exec();

        const filterSalesList = salesList.filter((item: any) => item.source.checkout_id == checkout_id);

        return filterSalesList;
    }

    async getAllSales(): Promise<Sale[]> {
        const salesList = await this.saleModel.find().exec();
        return salesList;
    }

}
