import { DepoimentoFotos } from "src/depoimentos-foto/interfaces/depoimento-foto.entity";

export class CategoriaDepoimento{
    categoria: string;
    depoimentosVideo: Array<any>;
    depoimentosFoto: Array<DepoimentoFotos>; 
}