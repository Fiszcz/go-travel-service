import * as mongoose from 'mongoose';
import {ApiProperty} from "@nestjs/swagger";

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

export class GeoPoint {
    @ApiProperty()
    type: 'Point';

    @ApiProperty({type: [Number]})
    coordinates: [number, number];
}
