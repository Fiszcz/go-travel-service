import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import {PostsService} from "./posts.service";

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {
    }

    @Post()
    createPost(@Body() newPost) {
        return this.postsService.create(newPost);
    }

    @Get('multimedia/:pin')
    findMultimediaForPin(@Param('pin') pin) {
        return this.postsService.getMultimediaForPin(pin);
    }

    @Get()
    findPostsOfUser(@Query('userId') userId) {
        return this.postsService.getPostsForUser(userId);
    }

    @Patch('like')
    likePost(@Body() body) {
        return this.postsService.likePost(body);
    }

    @Delete('like')
    unlikePost(@Body() body) {
        return this.postsService.unlikePost(body);
    }

}
