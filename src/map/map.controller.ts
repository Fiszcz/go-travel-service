import {Body, Controller, Patch} from '@nestjs/common';
import {MapService} from "./map.service";

@Controller('map')
export class MapController {
    constructor(private readonly mapService: MapService) {
    }

    @Patch()
    setLastLocation (@Body() body) {
        return this.mapService.checkLocationForUser(body);
    }

}
