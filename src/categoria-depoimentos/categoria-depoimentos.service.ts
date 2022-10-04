import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriaDepoimentoDto } from './dto/categoria-depoimento.dto';
import { CategoriaDepoimento } from './interfaces/categoria-depoimento.entity';

@Injectable()
export class CategoriaDepoimentosService {
    constructor(
        @InjectModel('Categoria') private readonly categoriaModel: Model<CategoriaDepoimento>
    ) { }

    async criarNovaCategoria(categoriaDto: CategoriaDepoimentoDto) {
        const { categoria } = categoriaDto;
        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria });

        if(categoriaEncontrada) {
            throw new BadRequestException(`Categoria já existente`);
        }

        const categoriaCriada = new this.categoriaModel(categoriaDto);

        return await categoriaCriada.save();
    }

    async vincularItemACategoria(itemId: string, categoria: string) {

    }

}
