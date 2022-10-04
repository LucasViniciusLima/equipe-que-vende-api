import * as mongoose from "mongoose";

export const DepoimentoFotosSchema = new mongoose.Schema({
    title: String,
    data: String
}, { timestamps: true, collection: 'DepoimentoFotos' });