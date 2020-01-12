import {Body, Controller, Delete, Get, Param, Patch, Post as PostMethod, Query} from '@nestjs/common';
import {PostsService} from "./posts.service";
import {ApiBody, ApiParam, ApiQuery, ApiResponse, getSchemaPath} from "@nestjs/swagger";
import {CreatePostDto} from "./dtos/CreatePost.interfaces";
import {Post} from "../schemas/posts.schema";
import {LikePost} from "./interfaces/LikePost.interfaces";
import {ImageInterface} from "../schemas/image.schema";

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {
    }

    @PostMethod()
    @ApiBody({type: CreatePostDto})
    createPost(@Body() newPost) {
        return this.postsService.create(newPost);
    }

    @Get('multimedia/:pin')
    @ApiParam({name: 'pin', type: String})
    @ApiResponse({ status: 200,  schema: {
            type: 'array',
            items: {
                type: 'array',
                items: {
                    $ref: getSchemaPath(ImageInterface),
                },
            },
        },})
    findMultimediaForPin(@Param('pin') pin) {
        return this.postsService.getMultimediaForPin(pin);
    }

    @Get()
    @ApiQuery({name: 'userId', type: String})
    @ApiResponse({status: 200, type: [Post]})
    findPostsOfUser(@Query('userId') userId) {
        return this.postsService.getPostsForUser(userId);
    }

    @Patch('like')
    @ApiBody({type: LikePost})
    likePost(@Body() body) {
        return this.postsService.likePost(body);
    }

    @Patch('like')
    @ApiBody({type: LikePost})
    unlikePost(@Body() body) {
        return this.postsService.unlikePost(body);
    }

}
