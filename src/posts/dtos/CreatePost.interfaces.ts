import {ImageInterface} from "../../schemas/image.schema";
import {ApiProperty} from "@nestjs/swagger";

export class CreatePostDto {
    @ApiProperty()
    userId: string;

    @ApiProperty()
    pin: string;

    @ApiProperty({type: [ImageInterface]})
    multimedia?: ImageInterface[];

    @ApiProperty()
    text?: string;
}
