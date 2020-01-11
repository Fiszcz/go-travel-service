import * as mongoose from "mongoose";

module.exports = async () => {
    const mongoDB = 'mongodb://localhost:27017';
    await mongoose.connect(mongoDB, {useNewUrlParser: true});
};
