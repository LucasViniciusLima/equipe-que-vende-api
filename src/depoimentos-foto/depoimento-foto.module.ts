import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DepoimentoFotoController } from './depoimento-foto.controller';
import { DepoimentoFotoService } from './depoimento-foto.service';
import { DepoimentoFotosSchema } from './interfaces/depoimento-foto.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'DepoimentoFotos', schema: DepoimentoFotosSchema }]),
  ],
  controllers: [DepoimentoFotoController],
  providers: [DepoimentoFotoService]
})
export class DepoimentosFotoModule { }
