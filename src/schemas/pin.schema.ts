import * as mongoose from 'mongoose';
import {ImageInterface, ImageSchema} from "./image.schema";
import {GeoPoint, PointSchema} from "./point.schema";
import {Country} from "./countires.schema";

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

export interface Pin extends mongoose.Document {
    name: string;
    description: string;
    points: number;
    country: string | Country;
    category: Category;
    location: GeoPoint;
    startTime: Date;
    endTime: Date;
    isCyclic: boolean;
    place: string;
    badge: ImageInterface;
    radius: number;
}
