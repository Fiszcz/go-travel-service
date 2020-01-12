import {ApiProperty} from "@nestjs/swagger";

export class VisitsAndPointsOfUser {
    @ApiProperty()
    user: string;

    @ApiProperty()
    points: number;

    @ApiProperty()
    visits: string;
}

export class PinWithNumberOfVisits {
    @ApiProperty()
    pin: string;

    @ApiProperty()
    visits: number;
}