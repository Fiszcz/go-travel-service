import {Body, Controller, Delete, Get, Param, Patch, Query} from '@nestjs/common';
import {PeopleService} from "./people.service";
import {ApiBody, ApiParam, ApiQuery, ApiResponse} from "@nestjs/swagger";
import {BasicDataOfUser, UserWithFullData, UserWithDetails} from "./interfaces/People.interfaces";
import {AuthenticationInterface} from "../classes/Authentication.interfaces";

@Controller('people')
export class PeopleController {
    constructor(private readonly peopleService: PeopleService) {
    }

    @Get('following/:userId')
    @ApiParam({name: 'userId', type: String})
    @ApiQuery({name: 'details', type: Boolean, required: false})
    @ApiResponse({status: 200, type: [UserWithDetails]})
    findFollowingUsers(@Param('userId') userId, @Query('details') details) {
        if (details)
            return this.peopleService.getFollowingUsersWithDetails(userId);
        return this.peopleService.getFollowingUsers(userId);
    }

    @Get('followers/:userId')
    @ApiParam({name: 'userId', type: String})
    @ApiQuery({name: 'details', type: Boolean, required: false})
    @ApiResponse({status: 200, type: [UserWithDetails]})
    findFollowerUsers(@Param('userId') userId, @Query('details') details) {
        if (details)
            return this.peopleService.getFollowersUserWithDetails(userId);
        return this.peopleService.getFollowersUser(userId);
    }

    @Patch('follow/:userToFollow')
    @ApiBody({type: AuthenticationInterface})
    @ApiParam({name: 'userToFollow', type: String})
    followUser(@Body('userId') user, @Param('userToFollow') userToFollow) {
        return this.peopleService.followUser({user, userToFollow});
    }

    @Patch('follow/:userToUnfollow')
    @ApiBody({type: AuthenticationInterface})
    @ApiParam({name: 'userToUnfollow', type: String})
    unfollowUser(@Body('userId') user, @Param('userToUnfollow') userToUnfollow) {
        return this.peopleService.unfollowUser({user, userToUnfollow});
    }

    @Get()
    @ApiQuery({name: 'phrase', type: String})
    @ApiResponse({status: 200, type: [BasicDataOfUser]})
    findUsers(@Query('phrase') phrase) {
        return this.peopleService.searchUsers(phrase);
    }

    @Get('user-details/:userId')
    @ApiParam({name: 'userId', type: String})
    @ApiResponse({status: 200, type: [UserWithFullData]})
    findUserDetails(@Param('userId') userId) {
        return this.peopleService.getUserDetails(userId);
    }

}
