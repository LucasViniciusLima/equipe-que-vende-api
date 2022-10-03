import * as mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    name: String,
    admin: Boolean,
    email: { type: String, unique: true },
    password: String,
    profilePhoto: String,
    checkout_id: { type: String, unique: true }
    
}, { timestamps: true, collection: 'User'});