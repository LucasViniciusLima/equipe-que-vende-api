import * as mongoose from 'mongoose';

export const RankingSchema = new mongoose.Schema({
    dateMonthAndYear: { type: String, unique: true },
    personalRanks: [{
        userId: String,
        salesCount: Number
    }]
}, { timestamps: true, collection: 'Ranking' });
