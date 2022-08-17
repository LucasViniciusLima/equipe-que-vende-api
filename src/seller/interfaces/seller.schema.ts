import * as mongoose from "mongoose";

export const sellerSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    profilePhoto: String,
    codSeller: String
    
}, { timestamps: true, collection: 'Seller'});