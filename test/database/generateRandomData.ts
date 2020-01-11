import {createExampleUsers} from "./data/users";
import * as mongoose from "mongoose";
import {createExampleCounties} from "./data/flags";
import {createExamplePins} from "./data/pins";
import {createExamplePosts} from "./data/posts";
import {createExampleVisits} from "./data/visits";

const clearDatabase = async () => {
    await mongoose.connection.db.dropCollection('pins');
    await mongoose.connection.db.dropCollection('users');
    await mongoose.connection.db.dropCollection('countries');
    await mongoose.connection.db.dropCollection('posts');
    await mongoose.connection.db.dropCollection('visits');
};

const fillDatabase = async () => {
    //Set up default mongoose connection
    const mongoDB = 'mongodb://localhost:27017';
    await mongoose.connect(mongoDB, { useNewUrlParser: true });

    await createExampleCounties();
    await createExampleUsers();
    await createExamplePins();
    await createExamplePosts();
    await createExampleVisits();
    console.log('Database filled!')
};

fillDatabase();
