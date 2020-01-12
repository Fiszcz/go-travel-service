import {Controller, Get, Query} from '@nestjs/common';
import {PinsService} from "./pins.service";

@Controller('pins')
export class PinsController {
    constructor(private readonly pinsService: PinsService) {
    }

    @Get()
    findAll() {
        return this.pinsService.getBasicDataAboutPins();
    }

    @Get('details')
    findPinsWithAllData(@Query('pins') pins) {
        return this.pinsService.getFullInfoAboutPins(pins);
    }

}
