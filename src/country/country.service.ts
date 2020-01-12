import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Country} from "../schemas/countires.schema";

@Injectable()
export class CountryService {
    constructor(@InjectModel('countries') private readonly countryModel: Model<Country>){}

    getCountries() {
        return this.countryModel.find();
    }

}
