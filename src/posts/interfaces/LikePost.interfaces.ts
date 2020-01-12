import {ApiProperty} from "@nestjs/swagger";

export class LikePost {
    @ApiProperty()
    userId: string;

    @ApiProperty()
    postId: string;
}