import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriaDepoimentosService } from './categoria-depoimentos.service';
import { CategoriaDepoimentoDto } from './dto/categoria-depoimento.dto';
import { CategoriaDepoimento } from './interfaces/categoria-depoimento.entity';

@Controller('api/v1/categoria')
export class CategoriaDepoimentosController {

    constructor(
        private readonly categoriaDepoimentosService: CategoriaDepoimentosService
    ) { }

    @Post()
    @UsePipes(ValidationPipe)
    async criarCategoria(
        @Body() criarCategoriaDto: CategoriaDepoimentoDto        
    ): Promise<CategoriaDepoimento> {
        return await this.categoriaDepoimentosService.criarNovaCategoria(criarCategoriaDto);
    }

    @Get()
    async verItensCategoria(){
        return await this.categoriaDepoimentosService.getItensCategoria();
    }

}
