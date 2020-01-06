import { Module } from '@nestjs/common';
import { CountryService } from './country.service';
import {MongooseModule} from "@nestjs/mongoose";
import {CountriesSchema} from "../schemas/countires.schema";

@Module({
  imports: [MongooseModule.forFeature([{name: 'countries', schema: CountriesSchema}])],
  providers: [CountryService]
})
export class CountryModule {}
