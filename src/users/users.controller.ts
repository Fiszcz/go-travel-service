import {Body, Controller, Get, Patch, Post} from '@nestjs/common';
import {UsersService} from "./users.service";

@Controller('users')
export class UsersController {
    constructor(private readonly UsersService: UsersService) {
    }

    @Post()
    createNewUser(@Body() newUser) {
        return this.UsersService.signUpUser(newUser);
    }

    @Post('sessions')
    signInUser(@Body() authenticationDetails) {
        return this.UsersService.signIn(authenticationDetails);
    }

    @Patch('profile-photo')
    setProfilePhoto(@Body() newProfilePhoto) {
        return this.UsersService.setPhoto(newProfilePhoto);
    }

}
