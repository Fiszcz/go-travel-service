import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {User} from "../schemas/user.schema";
import {CheckLocation} from "./interfaces/CheckLocation.interfaces";
import {computeDistanceBetweenLocations} from "../utils/geolocation";
import {maxPossibleSpeed} from "../consts/checks";
import {Visit} from "../schemas/visit.schema";
import {Pin} from "../schemas/pin.schema";

@Injectable()
export class MapService {
    constructor(
        @InjectModel('users') private readonly userModel: Model<User>,
        @InjectModel('visits') private readonly visitModel: Model<Visit>,
        @InjectModel('pins') private readonly pinModel: Model<Pin>,
    ) {
    }

    async checkLocationForUser(checkLocation: CheckLocation) {
        const userLastLocation = await this.userModel.findById(checkLocation.user)
            .select('lastCheck');
        const currentTime = new Date();

        let isOkLocation = false;
        if (userLastLocation.lastCheck === undefined) {
            isOkLocation = true;
        } else {
            const timeDifferenceBetweenChecks = (currentTime.getTime() - userLastLocation.lastCheck.time.getTime()) / 1000 / 3600;
            const receivedLocation = {lat: checkLocation.coordinates[0], long: checkLocation.coordinates[1]};
            const lastSavedLocation = {
                lat: userLastLocation.lastCheck.location.coordinates[0],
                long: userLastLocation.lastCheck.location.coordinates[1]
            };
            const distanceBetweenLocations = computeDistanceBetweenLocations(receivedLocation.lat, receivedLocation.long, lastSavedLocation.lat, lastSavedLocation.long, "K");
            isOkLocation = (distanceBetweenLocations / timeDifferenceBetweenChecks) < maxPossibleSpeed;
        }

        if (isOkLocation) {
            const foundPinsNearLocation = (await this.pinModel.find({
                location: {
                    $near: {
                        $geometry: {
                            type: 'point',
                            coordinates: checkLocation.coordinates,
                        },
                        $maxDistance: '$range',
                    }
                }
            }).select('_id'))
                .map((pin) => pin._id);

            if (foundPinsNearLocation.length) {
                for (let pin of foundPinsNearLocation)
                    await this.visitModel.create({user: checkLocation.user, pin});
            }

            userLastLocation.lastCheck = {time: currentTime, location: {type: 'point', coordinates: checkLocation.coordinates}};
            await userLastLocation.save();

            return foundPinsNearLocation;
        }
    }

}
