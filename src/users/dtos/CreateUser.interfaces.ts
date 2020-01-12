import {ApiProperty} from "@nestjs/swagger";

export class CreateUser {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    name: string;
}
