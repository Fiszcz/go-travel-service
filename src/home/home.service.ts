import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from 'mongoose';
import {Post} from "../schemas/posts.schema";
import {User} from "../schemas/user.schema";
import {GetEarlierPosts} from "./interfaces/GetEarlierPosts.interfaces";

@Injectable()
export class HomeService {
    constructor(
        @InjectModel('posts') private readonly postModel: Model<Post>,
        @InjectModel('users') private readonly userModel: Model<User>,
    ) {}

    async getLatestPostsOfFollowingUsers(userId: string) {
        const followingUsers = await this.userModel.findById(userId).select('following');
        return this.postModel.find()
            .where('user').in(followingUsers.following)
            .sort({date: -1})
            .limit(10);
    };

    async getEarlierPostsOfFollowingUsers(getEarlierPosts: GetEarlierPosts) {
        const followingUsers = await this.userModel.findById(getEarlierPosts.userId).select('following');
        return this.postModel.find()
            .where('user').in(followingUsers.following)
            .where('date').lt(getEarlierPosts.date)
            .sort({date: -1})
            .limit(10);
    }

}
