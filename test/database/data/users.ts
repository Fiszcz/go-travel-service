import {User} from "../../../src/schemas/user.schema";
import {getFileFormatForImage} from "../utils/images";
import {UserModel} from "../databaseModels";
import * as mongoose from "mongoose";

export const createExampleUsers = async () => {
    await mongoose.connection.db.dropCollection('users', function () {});

    const users: Partial<User>[] = [
        {
            firstName: 'Adam',
            lastName: 'Smith',
            email: 'adam.smith@gmail.com',
            password: '12345678',
            profilePhoto: getFileFormatForImage('test/database/assets/profilePhotos/AdamSmith.jpeg'),
        },
        {
            firstName: 'Abel',
            lastName: 'Manu',
            email: 'abel.manu@gmail.com',
            password: '12345678',
            profilePhoto: getFileFormatForImage('test/database/assets/profilePhotos/AbelManu.jpg'),
        },
        {
            firstName: 'Adeline',
            lastName: 'Williams',
            email: 'adeline.williams@gmail.com',
            password: '12345678',
            profilePhoto: getFileFormatForImage('test/database/assets/profilePhotos/AdelineWilliams.jpg'),
        },
        {
            firstName: 'Alan',
            lastName: 'Gael',
            email: 'alan.gael@gmail.com',
            password: '12345678',
            profilePhoto: getFileFormatForImage('test/database/assets/profilePhotos/AlanGael.jpg'),
        },
        {
            firstName: 'Ali',
            lastName: 'Florentin',
            email: 'ali.florentin',
            password: '12345678',
            profilePhoto: getFileFormatForImage('test/database/assets/profilePhotos/AliFlorentin.jpeg'),
        },
        {
            firstName: 'Benjamin',
            lastName: 'Hywel',
            email: 'benjamin.hywel@gmail.com',
            password: '12345678',
            profilePhoto: getFileFormatForImage('test/database/assets/profilePhotos/BenjaminHywel.jpg'),
        },
        {
            firstName: 'Bill',
            lastName: 'Norton',
            email: 'bill.norton@gmail.com',
            password: '12345678',
            profilePhoto: getFileFormatForImage('test/database/assets/profilePhotos/BillNorton.jpg'),
        },
        {
            firstName: 'Braxton',
            lastName: 'Kostis',
            email: 'braxton.kostis@gmail.com',
            profilePhoto: getFileFormatForImage('test/database/assets/profilePhotos/BraxtonKostis.jpg'),
        },
        {
            firstName: 'Brett',
            lastName: 'Zimmerman',
            email: 'brett.zimmerman@gmail.com',
            password: '12345678',
            profilePhoto: getFileFormatForImage('test/database/assets/profilePhotos/BrettZimmerman.jpg'),
        },
        {
            firstName: 'Camile',
            lastName: 'Rowles',
            email: 'camile.rowles@gmail.com',
            password: '12345678',
            profilePhoto: getFileFormatForImage('test/database/assets/profilePhotos/CamileRowles.jpg'),
        },
        {
            firstName: 'Cesar',
            lastName: 'Tucker',
            email: 'cesar.tucker@gmail.com',
            password: '12345678',
            profilePhoto: getFileFormatForImage('test/database/assets/profilePhotos/CesarTucker.jpg'),
        },
        {
            firstName: 'Clay',
            lastName: 'Morrison',
            email: 'clay.morrison@gmail.com',
            password: '12345678',
            profilePhoto: getFileFormatForImage('test/database/assets/profilePhotos/ClayMorrison.jpg'),
        },
        {
            firstName: 'Donovan',
            lastName: 'Andrey',
            email: 'donovan.andrey@gmail.com',
            password: '12345678',
            profilePhoto: getFileFormatForImage('test/database/assets/profilePhotos/DonovanAndrey.jpg'),
        },
        {
            firstName: 'Elsa',
            lastName: 'Marshall',
            email: 'elsa.marshall@gmail.com',
            password: '12345678',
            profilePhoto: getFileFormatForImage('test/database/assets/profilePhotos/ElsaMarshall.jpg'),
        },
        {
            firstName: 'Emery',
            lastName: 'Hawkes',
            email: 'emery.hawkes@gmail.com',
            password: '12345678',
            profilePhoto: getFileFormatForImage('test/database/assets/profilePhotos/EmeryHawkes.jpg'),
        },
        {
            firstName: 'Esther',
            lastName: 'Carpenter',
            email: 'esther.carpenter',
            password: '12345678',
            profilePhoto: getFileFormatForImage('test/database/assets/profilePhotos/EstherCarpenter.jpg'),
        },
        {
            firstName: 'Haleigh',
            lastName: 'Marita',
            email: 'haleigh.marita@gmail.com',
            password: '12345678',
            profilePhoto: getFileFormatForImage('test/database/assets/profilePhotos/HaleighMarita.jpg'),
        },
        {
            firstName: 'Ismael',
            lastName: 'Griffith',
            email: 'ismael.griffith@gmail.com',
            password: '12345678',
            profilePhoto: getFileFormatForImage('test/database/assets/profilePhotos/IsmaelGriffith.jpg'),
        },
        {
            firstName: 'Kinley',
            lastName: 'Emma',
            email: 'kinley.emma@gmail.com',
            password: '12345678',
            profilePhoto: getFileFormatForImage('test/database/assets/profilePhotos/KinleyEmma.jpg'),
        },
        {
            firstName: 'Mariam',
            lastName: 'Eilert',
            email: 'mariam.eilert@gmail.com',
            password: '12345678',
            profilePhoto: getFileFormatForImage('test/database/assets/profilePhotos/MariamEilert.jpeg'),
        },
        {
            firstName: 'Peter',
            lastName: 'Zawodzki',
            email: 'peter.zawodzki@gmail.com',
            password: '12345678',
            profilePhoto: getFileFormatForImage('test/database/assets/profilePhotos/PeterZawodzki.jpeg'),
        },
        {
            firstName: 'Randy',
            lastName: 'Pramod',
            email: 'randy.pramod@gmail.com',
            password: '12345678',
            profilePhoto: getFileFormatForImage('test/database/assets/profilePhotos/RandyPramod.jpeg'),
        },
        {
            firstName: 'Robin',
            lastName: 'Byrt',
            email: 'robin.bryrt@gmail.com',
            password: '12345678',
            profilePhoto: getFileFormatForImage('test/database/assets/profilePhotos/RobinByrt.jpeg'),
        },
        {
            firstName: 'Tamara',
            lastName: 'Garcia',
            email: 'tamara.garcia@gmail.com',
            password: '12345678',
            profilePhoto: getFileFormatForImage('test/database/assets/profilePhotos/TamaraGarcia.jpg'),
        },
        {
            firstName: 'Tommy',
            lastName: 'Roy',
            email: 'tommy.roy@gmail.com',
            password: '12345678',
            profilePhoto: getFileFormatForImage('test/database/assets/profilePhotos/TommyRoy.jpg'),
        },
    ];

    const createdUsers: User[] = [];
    for (let user of users)
        createdUsers.push(await UserModel.create(user));

    createdUsers[0].following = [createdUsers[2]._id, createdUsers[4]._id];
    createdUsers[0].followers = [createdUsers[5]._id, createdUsers[6]._id, createdUsers[8]._id];
    await createdUsers[0].save();
};
