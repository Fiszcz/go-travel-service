import * as mongoose from 'mongoose';
import {ImageInterface, ImageSchema} from "./image.schema";
import {GeoPoint, PointSchema} from "./point.schema";
import {Country} from "./countires.schema";
import {ApiProperty} from "@nestjs/swagger";

export const PinSchema = new mongoose.Schema({
    name: {type: String, unique: true},
    description: String,
    points: Number,
    country: String,
    category: {
        type: String,
        enum: ['Country', 'Monument', 'Event', 'Mountains', 'Nature', 'City', 'Aquatic', 'Attraction']
    },
    location: PointSchema,
    startTime: Date,
    endTime: Date,
    isCyclic: Boolean,
    place: String,
    badge: ImageSchema,
    radius: {type: Number, default: 50},
});

PinSchema.index({location: "2dsphere"});

type Category = 'Country' | 'Monument' | 'Event' | 'Mountains' | 'Nature' | 'City' | 'Aquatic' | 'Attraction';

export class Pin extends mongoose.Document {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    points: number;

    @ApiProperty()
    country: string | Country;

    @ApiProperty()
    category: Category;

    @ApiProperty()
    location: GeoPoint;

    @ApiProperty()
    startTime: Date;

    @ApiProperty()
    endTime: Date;

    @ApiProperty()
    isCyclic: boolean;

    @ApiProperty()
    place: string;

    @ApiProperty()
    badge: ImageInterface;

    @ApiProperty()
    radius: number;
}
