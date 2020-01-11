import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Visit} from "../schemas/visit.schema";
import {User} from "../schemas/user.schema";
import {FollowUser, UnfollowUser} from "./interfaces/FollowUser.interfaces";

@Injectable()
export class PeopleService {
    constructor(
        @InjectModel('visits') private readonly visitModel: Model<Visit>,
        @InjectModel('users') private readonly userModel: Model<User>,
    ) {
    }

    async getFollowingUsers(userId: string) {
        const following = await this.userModel.findById(userId)
            .select('following')
            .populate({path: 'following', select: '_id firstName lastName profilePhoto'});
        return following.following;
    }

    async getFollowersUser(userId: string) {
        const userWithFollowers = await this.userModel.findById(userId)
            .select('followers')
            .populate({path: 'followers', select: '_id firstName lastName profilePhoto'});
        return userWithFollowers.followers;
    }

    async getFollowingUsersWithDetails(userId: string) {
        const followingUsers = await this.getFollowingUsers(userId) as User[];
        const usersWithAggregatedPins = await this.visitModel.aggregate()
            .match({user: {$in: followingUsers.map(following => following._id)}})
            .lookup({
                from: 'pins',
                localField: 'pin',
                foreignField: '_id',
                as: 'pin',
            })
            .unwind('pin')
            .group(
                {
                    _id: '$user',
                    visits: {"$sum": 1},
                    points: {"$sum": "$pin.points"},
                }
            );

        return followingUsers.map((followingUser) => ({
            ...followingUser.toObject(),
            visits: 0,
            points: 0, ...usersWithAggregatedPins.find((user) => user._id.equals(followingUser._id))
        }));
    }

    async getFollowersUserWithDetails(userId: string) {
        const followersUser = await this.getFollowersUser(userId) as User[];
        const usersWithAggregatedPins = await this.visitModel.aggregate()
            .match({user: {$in: followersUser.map(follower => follower._id)}})
            .lookup({
                from: 'pins',
                localField: 'pin',
                foreignField: '_id',
                as: 'pin',
            })
            .unwind('pin')
            .group(
                {
                    _id: '$user',
                    visits: {"$sum": 1},
                    points: {"$sum": "$pin.points"},
                }
            );

        return followersUser.map((follower) => ({
            ...follower.toObject(),
            visits: 0,
            points: 0, ...usersWithAggregatedPins.find((user) => user._id.equals(follower._id))
        }));
    }

    async followUser(followUser: FollowUser) {
        const ourUser = await this.userModel.findById(followUser.user);
        const userToFollow = await this.userModel.findById(followUser.userToFollow);

        ourUser.following.push(followUser.userToFollow);
        userToFollow.followers.push(followUser.user);

        await ourUser.save();
        await userToFollow.save();
    }

    async unfollowUser(unfollowUser: UnfollowUser) {
        const ourUser = await this.userModel.findById(unfollowUser.user);
        const userToUnfollow = await this.userModel.findById(unfollowUser.userToUnfollow);

        for (let i = 0; i < ourUser.following.length; i++)
            if (ourUser.following[i] === unfollowUser.userToUnfollow) {
                ourUser.following.splice(i, 1);
                break;
            }
        for (let i = 0; i < userToUnfollow.followers.length; i++)
            if (userToUnfollow.followers[i] === unfollowUser.user) {
                userToUnfollow.followers.splice(i, 1);
                break;
            }

        await ourUser.save();
        await userToUnfollow.save();
    }

    // TODO: make improvement
    // first: search on following firstly
    // second: search on the rest
    async searchUsers(phrase: string) {
        const searchPhraseREGEX = new RegExp('^' + phrase, 'i');
        return this.userModel.find({
            $or: [{firstName: searchPhraseREGEX}, {lastName: searchPhraseREGEX}]
        }).select('_id firstName lastName photoProfile');
    }

    async getUserDetails(userId: string) {
        const userDetails = await this.userModel.findById(userId)
            .select('followers following profilePhoto firstName lastName').lean();
        const detailsAboutVisits = await this.visitModel.aggregate()
            .match({user: userId})
            .lookup({
                from: 'pins',
                localField: 'pin',
                foreignField: '_id',
                as: 'pin',
            })
            .unwind('pin')
            .group(
                {
                    '_id': '$user',
                    visits: {"$sum": 1},
                    points: {"$sum": "$pin.points"},
                }
            );

        return {...userDetails, visits: 0, points: 0, ...detailsAboutVisits[0]};
    }

}
