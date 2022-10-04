import { Body, Controller, Param, Post } from '@nestjs/common';
import { DepoimentoFotoService } from './depoimento-foto.service';
import { DepoimentoFotoDto } from './dto/depoimento-foto.dto';

@Controller('api/v1/depoimentosfoto')
export class DepoimentoFotoController {

    constructor(private readonly depoimentoFotoService: DepoimentoFotoService) {}

    @Post('/:categoria')
    async salvarFotoBase64(
        @Body() depoimentoDto: DepoimentoFotoDto,
        @Param('categoria') categoria: string) {
        return await this.depoimentoFotoService.salvarFotoBase64(depoimentoDto, categoria);
    }
    
}
