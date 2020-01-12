import {ApiProperty} from "@nestjs/swagger";

export class CheckLocation {
    @ApiProperty()
    user: string;

    @ApiProperty({type: [Number]})
    coordinates: [number, number];
}
