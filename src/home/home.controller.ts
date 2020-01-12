import {Controller, Get, Param, Query} from '@nestjs/common';
import {HomeService} from "./home.service";
import {ApiParam, ApiQuery, ApiResponse} from "@nestjs/swagger";
import {Post} from "../schemas/posts.schema";

@Controller('home')
export class HomeController {
    constructor(private readonly homeService: HomeService) {
    }

    @Get(':userId')
    @ApiQuery({name: 'earlier', type: String, required: false})
    @ApiParam({name: 'userId', type: String})
    @ApiResponse({status: 200, type: [Post]})
    findLastPosts(@Param('userId') userId, @Query('earlier') earlierThan) {
        if (earlierThan)
            return this.homeService.getEarlierPostsOfFollowingUsers({userId, date: new Date(earlierThan)});
        return this.homeService.getLatestPostsOfFollowingUsers(userId);
    }

}
