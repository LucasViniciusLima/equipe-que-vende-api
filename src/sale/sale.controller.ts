import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { CreateSaleDto } from './dto/create-sale.dto';
import { Sale } from './interfaces/sale.entity';
import { SaleService } from './sale.service';

@Controller('api/v1/sale')
export class SaleController {
    
    constructor(private readonly saleService: SaleService) { }

    @IsPublic()
    @UsePipes(ValidationPipe)
    @Post()
    async creatSale(@Body() createSaleDto: CreateSaleDto): Promise<Sale> {
        return await this.saleService.creatSale(createSaleDto);
    }
}
