import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriaDepoimentosService } from 'src/categoria-depoimentos/categoria-depoimentos.service';
import { DepoimentoFotoDto } from './dto/depoimento-foto.dto';
import { DepoimentoFotos } from './interfaces/depoimento-foto.entity';

@Injectable()
export class DepoimentoFotoService {
    constructor(
        @InjectModel('DepoimentoFotos') private readonly depoimentoFotosModel: Model<DepoimentoFotos>,
        private readonly categoriaDepoimentoService: CategoriaDepoimentosService
    ) { }

    async salvarFotoBase64(depoimentoFotoDto: DepoimentoFotoDto, categoriaId: string) {
        const depoimentoFotoCreate = await new this.depoimentoFotosModel(depoimentoFotoDto);
        await depoimentoFotoCreate.save();
        
        await this.categoriaDepoimentoService.vincularItemACategoria(depoimentoFotoCreate.id, categoriaId);

        return depoimentoFotoCreate;
    }
}
