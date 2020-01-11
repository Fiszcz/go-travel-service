import {Test, TestingModule} from '@nestjs/testing';
import {HomeService} from './home.service';
import * as mongoose from "mongoose";
import {getModelToken} from "@nestjs/mongoose";
import {UsersSchema} from "../schemas/user.schema";
import {PostsSchema} from "../schemas/posts.schema";
import {UserModel} from "../../test/database/databaseModels";

describe('HomeService', () => {
    let service: HomeService;

    beforeAll(async () => {
        const mongoDB = 'mongodb://localhost:27017';
        await mongoose.connect(mongoDB, {useNewUrlParser: true});
    });

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [HomeService,
                {
                    provide: getModelToken('users'),
                    useValue: mongoose.model('users', UsersSchema),
                },
                {
                    provide: getModelToken('posts'),
                    useValue: mongoose.model('posts', PostsSchema),
                }],
        }).compile();

        service = module.get<HomeService>(HomeService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    test('getLatestPostsOfFollowingUsers', async () => {
        const users = await UserModel.find();

        const posts = await service.getLatestPostsOfFollowingUsers(users[0]._id);

        expect(posts).toHaveLength(2);
    });

    test('getEarlierPostsOfFollowingUsers', async () => {
        const users = await UserModel.find();

        const posts = await service.getEarlierPostsOfFollowingUsers({userId: users[0]._id, date: new Date(2018, 1, 1)});

        expect(posts).toHaveLength(1);
    });

});
