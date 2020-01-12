import {Controller, Get, Param, Query} from '@nestjs/common';
import {VisitsService} from "./visits.service";
import {ApiParam, ApiQuery, ApiResponse, getSchemaPath} from "@nestjs/swagger";
import {PinWithNumberOfVisits, VisitsAndPointsOfUser} from "./interfaces/Visits.interfaces";
import {Visit} from "../schemas/visit.schema";

@Controller('visits')
export class VisitsController {
    constructor(private readonly visitsService: VisitsService) {
    }

    @Get('statistics')
    @ApiQuery({name: 'option', schema: {enum: ['numberOfVisits', 'sortedByNumberOfVisits', 'numberOfVisitsAndPoints']}})
    @ApiQuery({name: 'pinIds', type: [String], required: false})
    @ApiQuery({name: 'userId', type: String, required: false})
    @ApiResponse({status: 200, schema: {oneOf: [
                { $ref: getSchemaPath(PinWithNumberOfVisits) },
                { $ref: getSchemaPath(VisitsAndPointsOfUser) },
            ]}})
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
    @ApiParam({name: 'userId', type: String})
    @ApiResponse({status: 200, type: Visit})
    findVisitsOfUser(@Param('userId') userId) {
        return this.visitsService.getVisitedPinsForUser(userId);
    }

}
