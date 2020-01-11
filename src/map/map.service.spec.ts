import {Test, TestingModule} from '@nestjs/testing';
import {MapService} from './map.service';
import * as mongoose from "mongoose";
import {getModelToken} from "@nestjs/mongoose";
import {UsersSchema} from "../schemas/user.schema";
import {VisitSchema} from "../schemas/visit.schema";
import {PinSchema} from "../schemas/pin.schema";
import {PinModel, UserModel, VisitModel} from "../../test/database/databaseModels";

const MockDate = require('mockdate');

describe('MapService', () => {
    let service: MapService;

    beforeAll(async () => {
        const mongoDB = 'mongodb://localhost:27017';
        await mongoose.connect(mongoDB, {useNewUrlParser: true});
    });

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MapService,
                {
                    provide: getModelToken('users'),
                    useValue: mongoose.model('users', UsersSchema),
                },
                {
                    provide: getModelToken('visits'),
                    useValue: mongoose.model('visits', VisitSchema),
                },
                {
                    provide: getModelToken('pins'),
                    useValue: mongoose.model('pins', PinSchema),
                }],
        }).compile();

        service = module.get<MapService>(MapService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    test('checkLocationForUser', async () => {
        let user = await UserModel.find().lean();
        let colosseumPin = await PinModel.findOne().where('name').equals('Colosseum').lean();
        let goldenGateBridgePin = await PinModel.findOne().where('name').equals('Golden Gate Bridge').lean();

        await service.checkLocationForUser({user: user[0]._id, coordinates: colosseumPin.location.coordinates});

        user = await UserModel.find().lean();
        expect(user[0].lastCheck.location.coordinates).toEqual(colosseumPin.location.coordinates);

        await service.checkLocationForUser({user: user[0]._id, coordinates: goldenGateBridgePin.location.coordinates});

        user = await UserModel.find().lean();
        expect(user[0].lastCheck.location.coordinates).toEqual(colosseumPin.location.coordinates);

        MockDate.set('2025-11-22');
        await service.checkLocationForUser({user: user[0]._id, coordinates: goldenGateBridgePin.location.coordinates});

        user = await UserModel.find().lean();
        expect(user[0].lastCheck.location.coordinates).toEqual(goldenGateBridgePin.location.coordinates);

        expect(await VisitModel.findOne().where('user').equals(user[0]._id).where('pin').equals(colosseumPin._id)).toBeDefined();
        expect(await VisitModel.findOne().where('user').equals(user[0]._id).where('pin').equals(goldenGateBridgePin._id)).toBeDefined();
    });

});
