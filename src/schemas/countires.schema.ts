import * as mongoose from 'mongoose';
import {ImageInterface, ImageSchema} from "./image.schema";
import {ApiProperty} from "@nestjs/swagger";

export const CountriesSchema = new mongoose.Schema({
    flag: ImageSchema,
    name: {type: String, unique: true},
});

export class Country extends mongoose.Document {
    @ApiProperty()
    flag: ImageInterface;

    @ApiProperty()
    name: string;
}
