import {Country} from "../../../src/schemas/countires.schema";
import {getFileFormatForImage} from "../utils/images";
import {CountriesModel} from "../databaseModels";
import * as mongoose from "mongoose";

const exampleFlags: Partial<Country>[] = [
    {
        name: 'Japan',
        flag: getFileFormatForImage('test/database/assets/flags/jp.png'),
    },
    {
        name: 'France',
        flag: getFileFormatForImage('test/database/assets/flags/fr.png'),
    },
    {
        name: 'Nepal',
        flag: getFileFormatForImage('test/database/assets/flags/np.png'),
    },
    {
        name: 'USA',
        flag: getFileFormatForImage('test/database/assets/flags/us.png'),
    },
    {
        name: 'Mauritius',
        flag: getFileFormatForImage('test/database/assets/flags/mu.png'),
    },
    {
        name: 'Canada',
        flag: getFileFormatForImage('test/database/assets/flags/ca.png'),
    },
    {
        name: 'China',
        flag: getFileFormatForImage('test/database/assets/flags/cn.png'),
    },
    {
        name: 'Brazil',
        flag: getFileFormatForImage('test/database/assets/flags/br.png'),
    },
    {
        name: 'Spain',
        flag: getFileFormatForImage('test/database/assets/flags/es.png'),
    },
    {
        name: 'Germany',
        flag: getFileFormatForImage('test/database/assets/flags/de.png'),
    },
    {
        name: 'Italy',
        flag: getFileFormatForImage('test/database/assets/flags/it.png'),
    },
    {
        name: 'India',
        flag: getFileFormatForImage('test/database/assets/flags/in.png'),
    },
    {
        name: 'Tanzania',
        flag: getFileFormatForImage('test/database/assets/flags/tz.png'),
    },
];

export const createExampleCounties = async () => {
    try {
        await mongoose.connection.db.dropCollection('countries');
    } catch {}

    for (let country of exampleFlags)
        await CountriesModel.create(country);
};
