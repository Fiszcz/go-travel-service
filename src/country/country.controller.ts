import {Controller, Get} from '@nestjs/common';
import {CountryService} from "./country.service";

@Controller('country')
export class CountryController {
    constructor(private readonly countriesService: CountryService) {}

    @Get()
    async findAll() {
        return this.countriesService.getCountries();
    }

}
