import * as mongoose from 'mongoose';
import {ImageInterface, ImageSchema} from "./image.schema";
import {User} from "./user.schema";
import {Pin} from "./pin.schema";

export const PostsSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    pin: {type: mongoose.Schema.Types.ObjectId, ref: 'pins'},
    date: {type: Date, required: true, default: Date.now},
    multimedia: {type: [ImageSchema], default: []},
    likes: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}], default: []},
    text: {type: String, default: ''},
});

export interface Post extends mongoose.Document {
    user: string | User;
    pin: string | Pin;
    date: Date;
    multimedia: ImageInterface[];
    likes: (string | User)[];
    text: string;
}
