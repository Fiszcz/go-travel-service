import {Body, Controller, Patch, Post} from '@nestjs/common';
import {UsersService} from "./users.service";
import {ApiBody, ApiResponse} from "@nestjs/swagger";
import {CreateUser} from "./dtos/CreateUser.interfaces";
import {SignIn} from "./interfaces/SignIn.interfaces";
import {SetPhoto} from "./interfaces/SetPhoto.interfaces";

@Controller('users')
export class UsersController {
    constructor(private readonly UsersService: UsersService) {
    }

    @Post()
    @ApiBody({type: CreateUser})
    createNewUser(@Body() newUser) {
        return this.UsersService.signUpUser(newUser);
    }

    @Post('sessions')
    @ApiBody({type: SignIn})
    @ApiResponse({status: 201, type: String})
    signInUser(@Body() authenticationDetails) {
        return this.UsersService.signIn(authenticationDetails);
    }

    @Patch('profile-photo')
    @ApiBody({type: SetPhoto})
    setProfilePhoto(@Body() newProfilePhoto) {
        return this.UsersService.setPhoto(newProfilePhoto);
    }

}
