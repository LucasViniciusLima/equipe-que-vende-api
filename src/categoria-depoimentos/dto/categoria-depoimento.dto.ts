import { IsString } from "class-validator";
import { CategoriaDepoimento } from '../interfaces/categoria-depoimento.entity';

export class CategoriaDepoimentoDto extends CategoriaDepoimento{
    @IsString()
    categoria: string;
    
}