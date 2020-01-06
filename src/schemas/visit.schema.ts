import * as mongoose from 'mongoose';
import {User} from "./user.schema";
import {Pin} from "./pin.schema";

export const VisitSchema = new mongoose.Schema({
    date: Date,
    user: mongoose.Schema.Types.ObjectId,
    pin: mongoose.Schema.Types.ObjectId,
});

export interface Visit extends mongoose.Document {
    date: Date;
    user: string | User;
    pin: string | Pin;
}
