import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { saleSchema } from './interfaces/sale.schema';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Sale', schema: saleSchema }])],
  controllers: [SaleController],
  providers: [SaleService]
})
export class SaleModule { }
