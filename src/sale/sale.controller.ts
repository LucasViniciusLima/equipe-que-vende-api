import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { Sale } from './interfaces/sale.entity';
import { SaleService } from './sale.service';
import { HttpService } from '@nestjs/axios';

@Controller('api/v1/sale')
export class SaleController {

    constructor(
        private readonly saleService: SaleService,
        private httpService: HttpService) { }

    @IsPublic()
    @UsePipes(ValidationPipe)
    @Post()
    async creatSale(@Body() createSaleDto: any): Promise<Sale> {
        if(createSaleDto.product.id == "1684176869"){
            // send event to api main romanni indicacao status change
            return;
        }

        this.httpService.post('https://functions-api.clint.digital/endpoints/integration/dmg/a8b61090-40db-4cbc-9b69-c657ea339256', createSaleDto).subscribe(resp=>console.log(resp));
        
        if (createSaleDto.status != "approved") this.httpService.post('https://webhook.zapcloud.com.br/webhook/efcab85975b7825028f46ca7b0f2fa42', createSaleDto).subscribe(resp=>console.log(resp));

        return await this.saleService.creatSale(createSaleDto);
    }

    @Get('/:id')
    async getSalesByCheckoutId(@Param() params: any): Promise<Sale[]> {        
        return await this.saleService.getSalesByCheckoutId(params.id);
    }
    
    @Get()
    async getAllSales(): Promise<Sale[]> {
        return await this.saleService.getAllSales();
    }
}
