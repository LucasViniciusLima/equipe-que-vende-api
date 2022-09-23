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

        if(createSaleDto.payload.status == "approved") {
            const newSale = new this.saleModel({
                ...createSaleDto.payload,
                source: createSaleDto.payload.source.pptc
            });
    
            await newSale.save();
            
            this.rankingService.updateRanking(createSaleDto);

            return newSale;
        }
        
        return;
    }

}
