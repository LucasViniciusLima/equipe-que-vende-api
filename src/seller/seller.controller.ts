import { Controller, Post } from '@nestjs/common';
import { Seller } from './interfaces/seller.entity';
import { SellerService } from './seller.service';

@Controller('api/v1/seller')
export class SellerController {
    @Post()
    createSeller(){
        return "hello im work";
    }
    
}
