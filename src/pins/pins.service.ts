import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Pin} from "../schemas/pin.schema";
import {Model} from "mongoose";

@Injectable()
export class PinsService {
    constructor(@InjectModel('pins') private readonly pinModule: Model<Pin>) {
    }

    async getBasicDataAboutPins() {
        return this.pinModule.find().select('_id name category location startTime');
    }

    async getFullInfoAboutPins(pinIds: string[]) {
        return this.pinModule.find().where('_id').in(pinIds);
    }

}
