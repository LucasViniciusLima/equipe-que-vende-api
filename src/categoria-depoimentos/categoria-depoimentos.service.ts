import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DepoimentoFotos } from 'src/depoimentos-foto/interfaces/depoimento-foto.entity';
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

        if (categoriaEncontrada) {
            throw new BadRequestException(`Categoria já existente`);
        }

        const categoriaCriada = new this.categoriaModel(categoriaDto);

        return await categoriaCriada.save();
    }

    async vincularItemACategoria(itemId: any, categoria: string) {
        const categoriaEncontrada = await this.categoriaModel.findOne({ categoria });

        if (!categoriaEncontrada) {
            throw new BadRequestException(`Categoria inexistente`);
        }

        categoriaEncontrada.depoimentosFoto.push(itemId);

        await this.categoriaModel.findOneAndUpdate({ categoria }, { $set: categoriaEncontrada }).exec();
    }

    async getItensCategoria(): Promise<Array<CategoriaDepoimento>> {        
        return await this.categoriaModel.find().populate({path:'depoimentosFoto',select: 'title data'}).exec();
    }

}
