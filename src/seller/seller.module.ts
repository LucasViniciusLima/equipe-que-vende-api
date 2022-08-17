import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { sellerSchema } from './interfaces/seller.schema';
import { SellerController } from './seller.controller';
import { SellerService } from './seller.service';

@Module({
    imports: [ MongooseModule.forFeature([{name: 'Seller', schema: sellerSchema }]) ],
    controllers: [SellerController],
    providers: [SellerService]
})
export class SellerModule {}
