import {Test, TestingModule} from '@nestjs/testing';
import {VisitsService} from './visits.service';
import * as mongoose from "mongoose";
import {getModelToken} from "@nestjs/mongoose";
import {VisitSchema} from "../schemas/visit.schema";
import {PinModel, UserModel} from "../../test/database/databaseModels";

describe('VisitsService', () => {
    let service: VisitsService;

    beforeAll(async () => {
        const mongoDB = 'mongodb://localhost:27017';
        await mongoose.connect(mongoDB, {useNewUrlParser: true});
    });

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [VisitsService,
                {
                    provide: getModelToken('visits'),
                    useValue: mongoose.model('visits', VisitSchema),
                },],
        }).compile();

        service = module.get<VisitsService>(VisitsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    test('getCountVisitsForPins should return number of visits for specific pin', async () => {
        const pins = await PinModel.find().select('name _id');

        const pinIds = [pins.find((pin) => pin.name === 'Notre Dame')._id, pins.find((pin) => pin.name === 'Mount Everest')._id, pins.find((pin) => pin.name === 'The Arc De Trioumphe')._id];

        const pinsWithVisitsNumber = await service.getCountVisitsForPins(pinIds);

        expect(pinsWithVisitsNumber).toHaveLength(3);
        expect(pinsWithVisitsNumber).toEqual(expect.arrayContaining([
            expect.objectContaining({
                pin: pinIds[0],
                visits: 3,
            }),
            expect.objectContaining({
                pin: pinIds[1],
                visits: 2,
            }),
            expect.objectContaining({
                pin: pinIds[2],
                visits: 0,
            })
        ]));
    });

    test('getPinsSortByVisitCount should return sorted pins by number of visits', async () => {
        const sortedPins = await service.getPinsSortByVisitCount();
        const pins = await PinModel.find();

        expect(sortedPins[0]).toMatchObject({
            visits: 3,
            pin: pins.find((pin) => pin.name === 'Notre Dame')._id,
        });
        expect(sortedPins[1]).toMatchObject({
            visits: 2,
            pin: pins.find((pin) => pin.name === 'Mount Everest')._id,
        });
    });

    test('getCountVisitedPinsAndPointsForUser should return information about number visits and points for user', async () => {
        const users = await UserModel.find();

        let visitsInfoForUser = await service.getCountVisitedPinsAndPointsForUser(users[0]._id);

        expect(visitsInfoForUser).toMatchObject({
            points: 1000,
            visits: 2,
        });

        visitsInfoForUser = await service.getCountVisitedPinsAndPointsForUser(users[14]._id);

        expect(visitsInfoForUser).toMatchObject({
            visits: 0,
            points: 0,
        })
    });
});
