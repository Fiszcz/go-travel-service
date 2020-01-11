import {Test, TestingModule} from '@nestjs/testing';
import {PeopleService} from './people.service';
import {getModelToken} from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import {UsersSchema} from "../schemas/user.schema";
import {VisitSchema} from "../schemas/visit.schema";
import {UserModel} from "../../test/database/databaseModels";
import {FollowUser, UnfollowUser} from "./interfaces/FollowUser.interfaces";

describe('PeopleService', () => {
    let service: PeopleService;

    beforeAll(async () => {
        const mongoDB = 'mongodb://localhost:27017';
        await mongoose.connect(mongoDB, {useNewUrlParser: true});
    });

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PeopleService,
                {
                    provide: getModelToken('users'),
                    useValue: mongoose.model('users', UsersSchema),
                },
                {
                    provide: getModelToken('visits'),
                    useValue: mongoose.model('visits', VisitSchema),
                }],
        }).compile();

        service = module.get<PeopleService>(PeopleService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    test('getFollowingUsers should return following users for user', async () => {
        const user = await UserModel.findOne();

        const followingUsers = await service.getFollowingUsers(user._id);

        expect(followingUsers).toBeInstanceOf(Array);
        expect(followingUsers).toHaveLength(2);

        expect(followingUsers[0]).toHaveProperty('firstName');
        expect(followingUsers[0]).toHaveProperty('lastName');
        expect(followingUsers[0]).toHaveProperty('profilePhoto');
    });

    test('getFollowersUser should return followers for user', async () => {
        const user = await UserModel.findOne();

        const followers = await service.getFollowersUser(user._id);

        expect(followers).toBeInstanceOf(Array);
        expect(followers).toHaveLength(3);

        expect(followers[0]).toHaveProperty('firstName');
        expect(followers[0]).toHaveProperty('lastName');
        expect(followers[0]).toHaveProperty('profilePhoto');
    });

    test('getFollowingUsersWithDetails should return list of following users with details', async () => {
        const user = await UserModel.findOne();

        const followingUsers = await service.getFollowingUsersWithDetails(user._id);

        expect(followingUsers).toBeInstanceOf(Array);
        expect(followingUsers).toHaveLength(2);

        expect(followingUsers).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    visits: 2,
                    points: 1000,
                    firstName: 'Adeline',
                }),
                expect.objectContaining({
                    visits: 1,
                    points: 500,
                    firstName: 'Ali',
                })
            ])
        );
    });

    test('getFollowersUsersWithDetails should return list of followers users with details', async () => {
        const user = await UserModel.findOne();

        const followers = await service.getFollowersUserWithDetails(user._id);

        expect(followers).toBeInstanceOf(Array);
        expect(followers).toHaveLength(3);

        expect(followers).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    visits: 1,
                    points: 500,
                    firstName: 'Benjamin',
                }),
                expect.objectContaining({
                    visits: 0,
                    points: 0,
                    firstName: 'Bill',
                }),
                expect.objectContaining({
                    visits: 0,
                    points: 0,
                    firstName: 'Brett',
                })
            ])
        );
    });

    describe('follow and unfollow', () => {
        test('followUser should save follower and following users in databases', async () => {
            let users = await UserModel.find().select('_id');

            const followData: FollowUser = {
                user: users[0]._id,
                userToFollow: users[9]._id,
            };

            await service.followUser(followData);

            users = await UserModel.find().select('_id following followers').lean();

            expect(users[0].following).toMatchObject([users[2]._id, users[4]._id, users[9]._id]);
            expect(users[9].followers).toMatchObject([users[0]._id]);
        });

        test('unfollowUser should remove users from following and followers data for specific users', async () => {
            let users = await UserModel.find().select('_id');

            const followData: UnfollowUser = {
                user: users[0]._id,
                userToUnfollow: users[9]._id,
            };

            await service.unfollowUser(followData);

            users = await UserModel.find().select('_id following followers').lean();

            expect(users[0].following).toMatchObject([users[2]._id, users[4]._id]);
            expect(users[9].followers).toMatchObject([]);
        });
    });

    test('searchUsers should return users with specific names for phrase', async () => {
        let foundUsers = await service.searchUsers('Eme');

        expect(foundUsers).toHaveLength(1);
        expect(foundUsers[0].firstName).toBe('Emery');

        foundUsers = await service.searchUsers('Gar');

        expect(foundUsers).toHaveLength(1);
        expect(foundUsers[0].lastName).toBe('Garcia');
    });

    test('getUserDetails should return details about user', async () => {
        const user = await UserModel.findOne();

        let userDetails = await service.getUserDetails(user._id);

        expect(userDetails).toMatchObject({
            firstName: 'Adam',
            lastName: 'Smith',
            visits: 2,
            points: 1000,
        });
    });

});
