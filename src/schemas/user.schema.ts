import * as mongoose from 'mongoose';
import {ImageSchema} from "./image.schema";
import {PointSchema} from "./point.schema";

export const UsersSchema = new mongoose.Schema({
    email: String,
    password: String,
    facebook: String,
    google: String,
    followers: [mongoose.Schema.Types.ObjectId],
    following: [mongoose.Schema.Types.ObjectId],
    profile_photo: ImageSchema,
    last_check: {
        time: Date,
        location: PointSchema,
    }
});
