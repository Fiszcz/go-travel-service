import {ApiProperty} from "@nestjs/swagger";

export class AuthenticationInterface {
    @ApiProperty()
    userId: string;
}