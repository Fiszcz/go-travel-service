import * as mongoose from 'mongoose';
import {ImageInterface, ImageSchema} from "./image.schema";
import {User} from "./user.schema";
import {ApiProperty} from "@nestjs/swagger";

export const PostsSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    pin: {type: mongoose.Schema.Types.ObjectId, ref: 'pins'},
    date: {type: Date, required: true, default: Date.now},
    multimedia: {type: [ImageSchema], default: []},
    likes: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}], default: []},
    text: {type: String, default: ''},
});

export class Post extends mongoose.Document {
    @ApiProperty()
    user: string;

    @ApiProperty()
    pin: string;

    @ApiProperty()
    date: string;

    @ApiProperty({type: [ImageInterface]})
    multimedia: ImageInterface[];

    @ApiProperty()
    likes: (string | User)[];

    @ApiProperty()
    text: string;
}
