import {Body, Controller, Patch} from '@nestjs/common';
import {MapService} from "./map.service";
import {ApiBody, ApiResponse} from "@nestjs/swagger";
import {CheckLocation} from "./interfaces/CheckLocation.interfaces";

@Controller('map')
export class MapController {
    constructor(private readonly mapService: MapService) {
    }

    @Patch()
    @ApiBody({type: CheckLocation})
    @ApiResponse({status: 200, type: [String]})
    setLastLocation (@Body() body) {
        return this.mapService.checkLocationForUser(body);
    }

}
