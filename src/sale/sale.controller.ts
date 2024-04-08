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
        if (createSaleDto.product.id == "1684176869") {
            // send event to api main romanni indicacao status change https://movt-main-api.azurewebsites.net/api/v1/webhook/self-scheduling-webhook/guru
            this.httpService.post('https://movt-main-api.azurewebsites.net/api/v1/webhook/self-scheduling-webhook/guru', createSaleDto).subscribe(resp => console.log(resp));
            return;
        }

        this.httpService.post('https://functions-api.clint.digital/endpoints/integration/dmg/a8b61090-40db-4cbc-9b69-c657ea339256', createSaleDto).subscribe(resp => console.log(resp));
        if (createSaleDto.status != "approved") this.httpService.post('https://webhook.pluglead.com/webhook/efcab85975b7825028f46ca7b0f2fa42', createSaleDto).subscribe(resp => console.log(resp));

        if (createSaleDto.status == "approved") this.httpService.post('https://h.albato.com/wh/38/1lftefd/OueNLLyiy8i6ORyKEqwCdRL2us2KT9JRxaLNh64VEIQ', this.mapToAlbatoWebhook(createSaleDto)).subscribe(resp => console.log(resp));
        if (createSaleDto.status == "abandoned") this.httpService.post('https://h.albato.com/wh/38/1lftefd/OueNLLyiy8i6ORyKEqwCdRL2us2KT9JRxaLNh64VEIQ', this.mapToAlbatoWebhook(createSaleDto)).subscribe(resp => console.log(resp));

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

    private mapToAlbatoWebhook(createSaleDto: any) {
        const { contact, source, product, status } = createSaleDto;

        return {
            contact_name: contact.name,
            contact_doc: contact.doc,
            contact_email: contact.email,
            contact_phone_local_code: contact.phone_local_code,
            contact_phone_number: contact.phone_number,
            contact_id: contact.id,
            status: status,
            source_utm_campaign: source.utm_campaign,
            source_utm_content: source.utm_content,
            source_utm_medium: source.utm_medium,
            source_utm_source: source.utm_source,
            source_utm_term: source.utm_term,
            product_name: product.name,
            procuct_id: product.id
        };
    }
}
