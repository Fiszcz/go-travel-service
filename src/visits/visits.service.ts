import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Visit} from "../schemas/visit.schema";

@Injectable()
export class VisitsService {
    constructor(@InjectModel('visits') private readonly visitModel: Model<Visit>) {
    }

    async getCountVisitsForPins(pinIds: string[]) {
        const pinsWithNumberOfVisits = await this.visitModel.aggregate()
            .match({pin: {'$in': pinIds}})
            .group({
                _id: '$pin',
                visits: { '$sum': 1},
            });

        return pinIds.map((pinId) => ({pin: pinId, visits: (pinsWithNumberOfVisits.find(pin => pin._id.equals(pinId))?.visits || 0)}));
    }

    getVisitedPinsForUser(userId: string) {
        return this.visitModel.find()
            .where('user').equals(userId);
    }

    getPinsSortByVisitCount() {
        return this.visitModel.aggregate()
            .group({
                _id: '$pin',
                pin: { '$first': '$pin'},
                visits: { '$sum': 1 },
            })
            .sort({visits: -1});
    }

    async getCountVisitedPinsAndPointsForUser(userId: string) {
        const visitsInfoForUser = await this.visitModel.aggregate()
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
            );

        return visitsInfoForUser.length ? visitsInfoForUser[0] : {visits: 0, points: 0};
    }

}
