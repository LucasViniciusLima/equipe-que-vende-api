import * as mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    profilePhoto: String,
    codUser: String
    
}, { timestamps: true, collection: 'User'});