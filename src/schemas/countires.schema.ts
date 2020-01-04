import * as mongoose from 'mongoose';
import {ImageSchema} from "./image.schema";

export const CountriesSchema = new mongoose.Schema({
    flag: ImageSchema,
    name: String,
});
