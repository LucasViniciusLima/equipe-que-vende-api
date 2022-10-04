import * as mongoose from 'mongoose';

export const CategoriaDepoimentoSchema = new mongoose.Schema({
    categoria: { type: String, unique: true },
    depoimentosVideo: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DepoimentoVideo'
    }],
    depoimentosFoto: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DepoimentoFotos'
    }]
}, { timestamps: true, collection: 'Categoria' });