import {PinModel, UserModel, VisitModel} from "../databaseModels";
import {Visit} from "../../../src/schemas/visit.schema";
import * as mongoose from "mongoose";

export const createExampleVisits = async () => {
    await mongoose.connection.db.dropCollection('visits', function () {});

    const userIds = await UserModel.find().select('_id');
    const pins = await PinModel.find().select('name _id');

    const exampleVisits: Partial<Visit>[] = [
        {
            user: userIds[2]._id,
            pin: pins.find((pin) => pin.name === 'Eiffel Tower')._id,
            date: new Date(2019, 1, 15),
        },
        {
            user: userIds[4]._id,
            pin: pins.find((pin) => pin.name === 'Grand Canyon')._id,
            date: new Date(2017, 9, 15),
        },
        {
            user: userIds[1]._id,
            pin: pins.find((pin) => pin.name === 'Mount Everest')._id,
            date: new Date(2017, 1, 15),
        },
        {
            user: userIds[2]._id,
            pin: pins.find((pin) => pin.name === 'Notre Dame')._id,
            date: new Date(2019, 1, 15),
        },
        {
            user: userIds[5]._id,
            pin: pins.find((pin) => pin.name === 'Notre Dame')._id,
            date: new Date(2016, 3, 22),
        },
        {
            user: userIds[0]._id,
            pin: pins.find((pin) => pin.name === 'Mount Everest')._id,
            date: new Date(2015, 11, 1)
        },
        {
            user: userIds[0]._id,
            pin: pins.find((pin) => pin.name === 'Sydney Opera House')._id,
            date: new Date(2019, 10, 10)
        },
        {
            user: userIds[10]._id,
            pin: pins.find((pin) => pin.name === 'Notre Dame')._id,
            date: new Date(2018, 5, 21),
        },
    ];

    for (let visit of exampleVisits) {
        await VisitModel.create(visit);
    }
};