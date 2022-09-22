import * as mongoose from 'mongoose';

export const saleSchema = new mongoose.Schema({
    status: String,
    dates: {
        created_at: String,
        confirmed_at: String
    },
    payment: {
        method: String,
        currency: String,
        total: Number
    },
    product: {
        name: String,
        image_url: String
    },
    contact: {
        email: String,
        name: String,
        phone_local_code: String,
        phone_number: String
    },
    source: {
        checkout_id: String,
        checkout_name: String
    }


}, { timestamps: true, collection: 'Sale' });