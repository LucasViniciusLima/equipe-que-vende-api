import { IsBase64, IsString } from "class-validator";
import { DepoimentoFotos } from "../interfaces/depoimento-foto.entity";


export class DepoimentoFotoDto extends DepoimentoFotos{
    @IsBase64()
    data: string;

    @IsString()
    title: string;
}