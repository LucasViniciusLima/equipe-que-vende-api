import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RankingService } from 'src/ranking/ranking.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { Sale } from './interfaces/sale.entity';

@Injectable()
export class SaleService {

    constructor(
        private readonly rankingService: RankingService,
        @InjectModel('Sale') private readonly saleModel: Model<Sale>) {}

    async creatSale(createSaleDto: CreateSaleDto): Promise<Sale> {

        if(createSaleDto.payload.status == "approved" || createSaleDto.payload.status == "refunded" || createSaleDto.payload.status == "chargeback") {
            const newSale = new this.saleModel({
                ...createSaleDto.payload,
                source: createSaleDto.payload.source.pptc
            });
    
            await newSale.save();
            
            if(createSaleDto.payload.status == "approved") this.rankingService.updateRanking(createSaleDto);
            else this.rankingService.removeSelerPoint(createSaleDto.payload.source.pptc.checkout_id);

            return newSale;
        }
        
        return;
    }

}
