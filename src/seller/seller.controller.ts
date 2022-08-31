import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { Seller } from './interfaces/seller.entity';
import { SellerService } from './seller.service';

@Controller('api/v1/seller')
export class SellerController {

    constructor(private readonly sellerService:SellerService) {}

    @UsePipes(ValidationPipe)
    @Post()
    async createSeller(@Body() createSellerDto:CreateSellerDto ): Promise<Seller>{
        return await this.sellerService.create(createSellerDto);
    }
    
}
