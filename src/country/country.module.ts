import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import {MongooseModule} from "@nestjs/mongoose";
import {CountriesSchema} from "../schemas/countires.schema";
import { CountryController } from './country.controller';

@Module({
  imports: [MongooseModule.forFeature([{name: 'countries', schema: CountriesSchema}])],
  providers: [CountryService],
  controllers: [CountryController]
})
export class CountryModule {}
