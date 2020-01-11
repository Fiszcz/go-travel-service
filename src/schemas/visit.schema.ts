import * as mongoose from 'mongoose';
import {User} from "./user.schema";
import {Pin} from "./pin.schema";

export const VisitSchema = new mongoose.Schema({
    date: {type: Date, default: Date.now},
    user: mongoose.Schema.Types.ObjectId,
    pin: mongoose.Schema.Types.ObjectId,
});

VisitSchema.index({user: 1, pin: 1}, {unique: true});

export interface Visit extends mongoose.Document {
    date: Date;
    user: string | User;
    pin: string | Pin;
}
