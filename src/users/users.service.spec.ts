import {Test, TestingModule} from '@nestjs/testing';
import {UsersService} from './users.service';
import * as mongoose from "mongoose";
import {getModelToken} from "@nestjs/mongoose";
import {UsersSchema} from "../schemas/user.schema";
import {CreateUser} from "./dtos/CreateUser.interfaces";
import {UserModel} from "../../test/database/databaseModels";
import objectContaining = jasmine.objectContaining;

describe('UsersService', () => {
    let service: UsersService;

    beforeAll(async () => {
        const mongoDB = 'mongodb://localhost:27017';
        await mongoose.connect(mongoDB, {useNewUrlParser: true});
    });

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UsersService,
                {
                    provide: getModelToken('users'),
                    useValue: mongoose.model('users', UsersSchema),
                },],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    test('signUpUser should create new user', async () => {
        const newUser: CreateUser = {
            name: 'Mahnoor Britton',
            email: 'mahnoor.britton@gmail.com',
            password: '12345678',
        };

        await service.signUpUser(newUser);

        const users = await UserModel.find();
        expect(users).toEqual(expect.arrayContaining([
            objectContaining({
                firstName: 'Mahnoor',
                lastName: 'Britton',
                password: '12345678',
                email: 'mahnoor.britton@gmail.com',
            })
        ]));
    });

    test('signIn should return identifier to user for valid email and password', async () => {
        let userId = await service.signIn({email: 'mahnoor.britton@gmail.com', password: '12345678'});

        expect(userId).toBeTruthy();

        userId = await service.signIn({email: 'mahnoor.britton@gmail.com', password: 'falsyPassword'});

        expect(userId).toBeFalsy();
    })
});
