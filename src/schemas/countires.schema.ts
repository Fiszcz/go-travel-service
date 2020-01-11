import * as mongoose from 'mongoose';
import {ImageInterface, ImageSchema} from "./image.schema";

export const CountriesSchema = new mongoose.Schema({
    flag: ImageSchema,
    name: {type: String, unique: true},
});

export interface Country extends mongoose.Document {
    flag: ImageInterface;
    name: string;
}
