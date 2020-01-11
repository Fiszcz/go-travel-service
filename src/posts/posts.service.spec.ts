import {Test, TestingModule} from '@nestjs/testing';
import {PostsService} from './posts.service';
import * as mongoose from "mongoose";
import {getModelToken} from "@nestjs/mongoose";
import {UsersSchema} from "../schemas/user.schema";
import {PostsSchema} from "../schemas/posts.schema";
import {PinModel, PostModel, UserModel} from "../../test/database/databaseModels";
import {CreatePostDto} from "./dtos/CreatePost.interfaces";

describe('PostsService', () => {
    let service: PostsService;

    beforeAll(async () => {
        const mongoDB = 'mongodb://localhost:27017';
        await mongoose.connect(mongoDB, {useNewUrlParser: true});
    });

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [PostsService,
                {
                    provide: getModelToken('posts'),
                    useValue: mongoose.model('posts', PostsSchema),
                },],
        }).compile();

        service = module.get<PostsService>(PostsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    test('create function should create new post', async () => {
        const pins = await PinModel.find().select('_id');
        const user = await UserModel.findOne().select('_id');

        const newPost: CreatePostDto = {
            pin: pins[15]._id,
            user: user._id,
            text: 'New post',
        };

        await service.create(newPost);

        const posts = await PostModel.find();
        expect(posts).toEqual(expect.arrayContaining([
            expect.objectContaining({
                pin: pins[15]._id,
                text: 'New post',
            })
        ]));
    });

    test('getMultimediaForPin should return multimedia for pin', async () => {
        const pins = await PinModel.find();

        const multimedia = await service.getMultimediaForPin(pins.find((pin) => pin.name === 'Grand Canyon')._id);

        expect(multimedia).toHaveLength(1);
        expect(multimedia[0].multimedia).toBeInstanceOf(Array);
    });

    test('getPostsForUser should return all posts for user', async () => {
        const user = await UserModel.findOne();

        expect(await service.getPostsForUser(user._id)).toHaveLength(1);
    });

    test('likePost should save user as a person who like some post', async () => {
        const users = await UserModel.find().select('_id');
        let posts = await service.getPostsForUser(users[0]._id);

        await service.likePost({userId: users[3]._id, postId: posts[0]._id});

        posts = await service.getPostsForUser(users[0]._id);

        expect(posts[0].likes).toMatchObject([users[3]._id]);
    });

    test('unlikePost should unlike post by user', async () => {
      const users = await UserModel.find().select('_id');
      let posts = await service.getPostsForUser(users[0]._id);

      await service.unlikePost({userId: users[3]._id, postId: posts[0]._id});

      posts = await service.getPostsForUser(users[0]._id);

      expect(posts[0].likes).toHaveLength(0);
    });

});
