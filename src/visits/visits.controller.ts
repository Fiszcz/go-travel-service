import {Controller, Get, Param, Query} from '@nestjs/common';
import {VisitsService} from "./visits.service";

@Controller('visits')
export class VisitsController {
    constructor(private readonly visitsService: VisitsService) {
    }

    @Get('statistics')
    findPinsWithStatistics(
        @Query('option') option: 'numberOfVisits' | 'sortedByNumberOfVisits' | 'numberOfVisitsAndPoints',
        @Query('pinIds') pinIds: string[],
        @Query('userId') userId) {
        switch (option) {
            case "numberOfVisits":
                return this.visitsService.getCountVisitsForPins(pinIds);
            case "sortedByNumberOfVisits":
                return this.visitsService.getPinsSortByVisitCount();
            case "numberOfVisitsAndPoints":
                return this.visitsService.getCountVisitedPinsAndPointsForUser(userId);
        }
    }

    @Get()
    findVisitsOfUser(@Param('userId') userId) {
        return this.visitsService.getVisitedPinsForUser(userId);
    }

}
