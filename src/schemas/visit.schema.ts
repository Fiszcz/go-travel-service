import * as mongoose from 'mongoose';
import {User} from "./user.schema";
import {Pin} from "./pin.schema";
import {ApiProperty} from "@nestjs/swagger";

export const VisitSchema = new mongoose.Schema({
    date: {type: Date, default: Date.now},
    user: mongoose.Schema.Types.ObjectId,
    pin: mongoose.Schema.Types.ObjectId,
});

VisitSchema.index({user: 1, pin: 1}, {unique: true});

export class Visit extends mongoose.Document {
    @ApiProperty()
    date: Date;

    @ApiProperty()
    user: string | User;

    @ApiProperty()
    pin: string | Pin;
}
