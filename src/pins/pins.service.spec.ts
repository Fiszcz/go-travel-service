import { Test, TestingModule } from '@nestjs/testing';
import { PinsService } from './pins.service';
import * as mongoose from "mongoose";
import {getModelToken} from "@nestjs/mongoose";
import {UsersSchema} from "../schemas/user.schema";
import {PinSchema} from "../schemas/pin.schema";
import {PinModel} from "../../test/database/databaseModels";

describe('PinsService', () => {
  let service: PinsService;

  beforeAll(async () => {
    const mongoDB = 'mongodb://localhost:27017';
    await mongoose.connect(mongoDB, {useNewUrlParser: true});
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PinsService,
        {
          provide: getModelToken('pins'),
          useValue: mongoose.model('pins', PinSchema),
        },],
    }).compile();

    service = module.get<PinsService>(PinsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('getBasicDataAboutPins should return all pins with basic data', async () => {
    const pins = await service.getBasicDataAboutPins();

    expect(pins).toBeInstanceOf(Array);
    expect(pins.length).toBeGreaterThanOrEqual(20);
  });

  test('getFullInfoAboutPins should return full data of specific pins', async () => {
    const pins = await PinModel.find();

    const foundPinsWithFullData = await service.getFullInfoAboutPins([pins[0]._id, pins[1]._id]);

    expect(foundPinsWithFullData).toHaveLength(2);
    expect(foundPinsWithFullData).toEqual(expect.arrayContaining([
        expect.objectContaining({
          name: 'Aurora',
        }),
        expect.objectContaining({
          name: 'Australia',
        })
    ]))
  })

});
