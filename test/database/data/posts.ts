import {Post} from "../../../src/schemas/posts.schema";
import {PinModel, PostModel, UserModel} from "../databaseModels";
import {getFileFormatForImage} from "../utils/images";
import * as mongoose from "mongoose";

export const createExamplePosts = async () => {
    await mongoose.connection.db.dropCollection('posts', function () {});

    const userIds = await UserModel.find().select('_id');
    const pins = await PinModel.find().select('name _id');

    const posts: Partial<Post>[] = [
        {
            user: userIds[2]._id,
            pin: pins.find((pin) => pin.name === 'Eiffel Tower')._id,
            date: new Date(2019, 1, 15),
            multimedia: [getFileFormatForImage('test/database/assets/posts/beautiful-blonde-blue-eiffel-tower-fashion-Favim.com-144440.jpg')],
            likes: [userIds[1]._id, userIds[4]._id, userIds[3]._id],
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
            user: userIds[4]._id,
            pin: pins.find((pin) => pin.name === 'Grand Canyon')._id,
            date: new Date(2017, 9, 15),
            multimedia: [getFileFormatForImage('test/database/assets/posts/grandCanyon.jpg')],
            likes: [userIds[1]._id, userIds[2]._id, userIds[3]._id, userIds[5]._id],
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
        {
            user: userIds[1]._id,
            pin: pins.find((pin) => pin.name === 'Mount Everest')._id,
            date: new Date(2017, 1, 15),
            multimedia: [getFileFormatForImage('test/database/assets/posts/mountEverest.jpg')],
            likes: [userIds[7]._id, userIds[2]._id, userIds[3]._id, userIds[5]._id, userIds[8]._id, userIds[9]._id],
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        },
    ];

    for (let post of posts) {
        await PostModel.create(post);
    }
};