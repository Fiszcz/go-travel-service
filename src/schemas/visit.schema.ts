import * as mongoose from 'mongoose';

export const VisitSchema = new mongoose.Schema({
    date: Date,
    user: mongoose.Schema.Types.ObjectId,
    pin: mongoose.Schema.Types.ObjectId,
});
