import * as mongoose from 'mongoose';
import {ApiProperty} from "@nestjs/swagger";

export const ImageSchema = new mongoose.Schema({
    image: Buffer,
    type_of_image: {type: String, enum: ['jpeg', 'png', 'jpg']},
    width_of_image: Number,
    height_of_image: Number,
});

export class ImageInterface {
    @ApiProperty()
    image: Buffer | string;

    @ApiProperty()
    type_of_image: 'jpeg' | 'png';

    @ApiProperty()
    width_of_image: number;

    @ApiProperty()
    height_of_image: number;
}
