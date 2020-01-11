import * as mongoose from 'mongoose';

export const PointSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

export interface GeoPoint {
    type: 'Point',
    coordinates: [number, number],
}
