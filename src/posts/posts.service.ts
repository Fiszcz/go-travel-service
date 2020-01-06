import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Post} from "../schemas/posts.schema";
import {CreatePostDto} from "./dtos/CreatePost.interfaces";
import {LikePost} from "./interfaces/LikePost.interfaces";

@Injectable()
export class PostsService {
    constructor(
        @InjectModel('posts') private readonly postModel: Model<Post>,
    ) {}

    async create(createPostDto: CreatePostDto) {
        const createdPost = new this.postModel(createPostDto);
        return await createdPost.save();
    };

    async getMultimediaForPin(pin: string) {
        return this.postModel.find()
            .where('pin').equals(pin)
            .select('multimedia');
    }

    async getPostsForUser(userId: string) {
        return this.postModel.find()
            .where('user').equals(userId);
    }

    async likePost(likePost: LikePost) {
        const post = await this.postModel.findById(likePost.postId);
        post.likes.push(likePost.userId);
        await post.save();
    }

    async unlikePost(unlikePost: LikePost) {
        const post = await this.postModel.findById(unlikePost.userId);

        for (let i = 0; i < post.likes.length; i++) {
            if (post.likes[i] === unlikePost.userId) {
                post.likes.splice(i, 1);
                break;
            }
        }

        await post.save();
    }

}
