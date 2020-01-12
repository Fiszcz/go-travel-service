import {ImageInterface} from "../../schemas/image.schema";
import {ApiProperty} from "@nestjs/swagger";

export class SetPhoto {
    @ApiProperty()
    userId: string;

    @ApiProperty()
    profilePhoto: ImageInterface;
}