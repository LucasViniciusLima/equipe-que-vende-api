import * as mongoose from 'mongoose';

export const groupSchema = new mongoose.Schema({
    clicks: Number,
    name: String,
    link: String
}, {timestamps:true, collection: 'group-schema'});