import {Body, Controller, Get, Query} from '@nestjs/common';
import {HomeService} from "./home.service";

@Controller('home')
export class HomeController {
    constructor(private readonly homeService: HomeService) {
    }

    @Get()
    findLastPosts(@Body('userId') userId) {
        return this.homeService.getLatestPostsOfFollowingUsers(userId);
    }

    @Get()
    findEarlierPosts(@Body('userId') userId, @Query('earlier') earlierThan) {
        return this.homeService.getEarlierPostsOfFollowingUsers({userId, date: new Date(earlierThan)});
    }

}
