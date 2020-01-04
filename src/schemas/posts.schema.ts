import * as mongoose from 'mongoose';
import {ImageSchema} from "./image.schema";

export const PostsSchema = new mongoose.Schema({
    user: mongoose.Schema.Types.OjectId,
    pin: mongoose.Schema.Types.OjectId,
    date: Date,
    multimedia: [ImageSchema],
    likes: [mongoose.Schema.Types.OjectId],
    text: String,
});
