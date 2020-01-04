import * as mongoose from 'mongoose';
import {ImageSchema} from "./image.schema";
import {PointSchema} from "./point.schema";

export const PinSchema = new mongoose.Schema({
    name: String,
    description: String,
    points: Number,
    country: mongoose.Schema.Types.ObjectId,
    category: {type: String, enum: ['Country', 'Monument', 'Event', 'Mountains', 'Nature', 'City', 'Aquatic']},
    location: PointSchema,
    start_time: Date,
    end_time: Date,
    is_cyclic: Boolean,
    place: String,
    badge: ImageSchema,
});
