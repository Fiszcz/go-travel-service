import {Controller, Get, Query} from '@nestjs/common';
import {PinsService} from "./pins.service";
import {ApiQuery, ApiResponse} from "@nestjs/swagger";
import {BasicDataOfPin} from "./interfaces/Pins.interfaces";
import {Pin} from "../schemas/pin.schema";

@Controller('pins')
export class PinsController {
    constructor(private readonly pinsService: PinsService) {
    }

    @Get()
    @ApiResponse({status: 200, type: [BasicDataOfPin]})
    findAllPins() {
        return this.pinsService.getBasicDataAboutPins();
    }

    @Get('details')
    @ApiResponse({status: 200, type: [Pin]})
    @ApiQuery({name: 'pins', type: [String]})
    findPinsWithAllData(@Query('pins') pins) {
        return this.pinsService.getFullInfoAboutPins(pins);
    }

}
