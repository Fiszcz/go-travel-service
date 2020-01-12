import {Controller, Get} from '@nestjs/common';
import {CountryService} from "./country.service";
import {ApiResponse} from "@nestjs/swagger";
import {Country} from "../schemas/countires.schema";

@Controller('country')
export class CountryController {
    constructor(private readonly countriesService: CountryService) {}

    @Get()
    @ApiResponse({status: 200, type: [Country]})
    async findAllCountry() {
        return this.countriesService.getCountries();
    }

}
