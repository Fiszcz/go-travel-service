import {ApiProperty} from "@nestjs/swagger";

export class SignIn {
    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;
}
