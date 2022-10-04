import { DepoimentoFotos } from "src/depoimentos-foto/interfaces/depoimento-foto.entity";

export class CategoriaDepoimento{
    categoria: string;
    depoimentosVideo;
    depoimentosFoto: Array<DepoimentoFotos>; 
}