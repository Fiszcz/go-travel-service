import {Body, Controller, Delete, Get, Param, Patch, Query} from '@nestjs/common';
import {PeopleService} from "./people.service";

@Controller('people')
export class PeopleController {
    constructor(private readonly peopleService: PeopleService) {
    }

    @Get('following/:userId')
    findFollowingUsers(@Param('userId') userId, @Query('details') details) {
        if (details)
            return this.peopleService.getFollowingUsersWithDetails(userId);
        return this.peopleService.getFollowingUsers(userId);
    }

    @Get('followers/:userId')
    findFollowerUsers(@Param('userId') userId, @Query('details') details) {
        if (details)
            return this.peopleService.getFollowersUserWithDetails(userId);
        return this.peopleService.getFollowersUser(userId);
    }

    @Patch('follow/:userToFollow')
    followUser(@Body('userId') user, @Param('userToFollow') userToFollow) {
        return this.peopleService.followUser({user, userToFollow});
    }

    @Delete('follow/:userToUnfollow')
    unfollowUser(@Body('userId') user, @Param('userToUnfollow') userToUnfollow) {
        return this.peopleService.unfollowUser({user, userToUnfollow});
    }

    @Get()
    findUsers(@Query('phrase') phrase) {
        return this.peopleService.searchUsers(phrase);
    }

    @Get('user-details/:userId')
    findUserDetails(@Param('userId') userId) {
        return this.peopleService.getUserDetails(userId);
    }

}
