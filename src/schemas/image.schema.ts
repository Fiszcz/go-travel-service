import * as mongoose from 'mongoose';

export const ImageSchema = new mongoose.Schema({
    image: Buffer,
    type_of_image: {type: String, enum: ['jpeg', 'png']},
    width_of_image: Number,
    height_of_image: Number,
});
