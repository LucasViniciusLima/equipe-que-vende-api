import { Document } from "mongoose";

export class DepoimentoFotos extends Document{
    id?: string;
    title: string;
    data: string;
}