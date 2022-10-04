import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriaDepoimentosModule } from 'src/categoria-depoimentos/categoria-depoimentos.module';
import { DepoimentoFotoController } from './depoimento-foto.controller';
import { DepoimentoFotoService } from './depoimento-foto.service';
import { DepoimentoFotosSchema } from './interfaces/depoimento-foto.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'DepoimentoFotos', schema: DepoimentoFotosSchema }]),
    CategoriaDepoimentosModule
  ],
  controllers: [DepoimentoFotoController],
  providers: [DepoimentoFotoService]
})
export class DepoimentoFotoModule { }
