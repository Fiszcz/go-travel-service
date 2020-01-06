import * as mongoose from 'mongoose';
import {ImageInterface, ImageSchema} from "./image.schema";
import {GeoPoint, PointSchema} from "./point.schema";

export const UsersSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    password: String,
    facebook: String,
    google: String,
    followers: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}], default: []},
    following: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}], default: []},
    profilePhoto: ImageSchema,
    lastCheck: {
        time: Date,
        location: PointSchema,
    },
    firstName: String,
    lastName: {type: String, default: ''},
});

export interface User extends mongoose.Document {
    email: string,
    password: string,
    facebook: string,
    google: string,
    followers: (User | string)[],
    following: (User | string)[],
    profilePhoto: ImageInterface,
    lastCheck: {
        time: Date,
        location: GeoPoint,
    },
    firstName: string,
    lastName: string,
}
