import {ApiProperty} from "@nestjs/swagger";
import {GeoPoint} from "../../schemas/point.schema";

export class BasicDataOfPin {
    @ApiProperty()
    name: string;

    @ApiProperty()
    category: 'Country' | 'Monument' | 'Event' | 'Mountains' | 'Nature' | 'City' | 'Aquatic' | 'Attraction';

    @ApiProperty()
    location: GeoPoint;

    @ApiProperty()
    startTime: Date;
}