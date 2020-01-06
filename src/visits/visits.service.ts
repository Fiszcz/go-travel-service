import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Visit} from "../schemas/visit.schema";

@Injectable()
export class VisitsService {
    constructor(@InjectModel('visits') private readonly visitModel: Model<Visit>) {
    }

    async getCountVisitsForPins(pinIds: string[]) {
        return this.visitModel.aggregate()
            .match({'$pin': {'$in': pinIds}})
            .group({
                pin: '$pin',
                visits: { '$sum': 1},
            });
    }

    async getVisitedPinsForUser(userId: string) {
        return this.visitModel.find()
            .where('user').equals(userId);
    }

    async getPinsSortByVisitCount() {
        return this.visitModel.aggregate()
            .group({
                pin: '$pin',
                visits: { '$sum': 1 },
            })
            .sort({visits: -1});
    }

    async getCountVisitedPinsAndPointsForUser(userId: string) {
        return this.visitModel.aggregate()
            .match({user: userId})
            .lookup({
                from: 'pins',
                localField: 'pin',
                foreignField: '_id',
                as: 'pin',
            })
            .unwind('pin')
            .group(
                {
                    '_id': '$user',
                    visits: { "$sum" : 1 },
                    points: { "$sum": "$pin.points" },
                }
            )
    }

}
