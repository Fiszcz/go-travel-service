import {Test, TestingModule} from '@nestjs/testing';
import {CountryService} from './country.service';
import {getModelToken} from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import {CountriesSchema} from "../schemas/countires.schema";

describe('CountryService', () => {
    let service: CountryService;

    beforeAll(async () => {
        const mongoDB = 'mongodb://localhost:27017';
        await mongoose.connect(mongoDB, {useNewUrlParser: true});
    });

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CountryService,
                {
                    provide: getModelToken('countries'),
                    useValue: mongoose.model('countries', CountriesSchema),
                }],
        }).compile();

        service = module.get<CountryService>(CountryService);
    });

    test('should be defined', () => {
        expect(service).toBeDefined();
    });

    test('getCountries should return all countries from database', async () => {
        const countries = await service.getCountries();

        expect(countries.length).toBeTruthy();
        expect(countries[0]).toHaveProperty('flag');
        expect(countries[0]).toHaveProperty('name');
    }, 10000);

});
