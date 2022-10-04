import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaDepoimentoSchema } from './interfaces/categoria-depoimentos.schema';
import { CategoriaDepoimentosService } from './categoria-depoimentos.service';
import { CategoriaDepoimentosController } from './categoria-depoimentos.controller';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Categoria', schema: CategoriaDepoimentoSchema }]),
    ],
    providers: [CategoriaDepoimentosService],
    controllers: [CategoriaDepoimentosController],
    exports: [CategoriaDepoimentosService]
})
export class CategoriaDepoimentosModule {}
