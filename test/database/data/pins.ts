import {Pin} from "../../../src/schemas/pin.schema";
import {getFileFormatForImage} from "../utils/images";
import {PinModel} from "../databaseModels";
import * as mongoose from "mongoose";

const examplePins: Partial<Pin>[] = [
    {
        name: 'Aurora',
        description: '',
        points: 500,
        country: '',
        category: 'Event',
        location: {
            type: "Point",
            coordinates: [23.259977, 68.299738],
        },
        place: '',
        radius: 50,
        badge: getFileFormatForImage('test/database/assets/pins/Aurora.png')
    },
    {
        name: 'Australia',
        description: '',
        points: 500,
        country: 'Australia',
        category: 'Country',
        location: {
            type: "Point",
            coordinates: [135.069324, -26.370799],
        },
        place: '',
        radius: 1000000,
        badge: getFileFormatForImage('test/database/assets/pins/Australia.png')
    },
    {
        name: 'Colosseum',
        description: '',
        points: 500,
        country: 'Italy',
        category: 'Monument',
        location: {
            type: "Point",
            coordinates: [12.492403, 41.890050],
        },
        place: '',
        radius: 200,
        badge: getFileFormatForImage('test/database/assets/pins/Coloseum.jpg')
    },
    {
        name: 'Eiffel Tower',
        description: '',
        points: 500,
        country: 'France',
        category: 'Monument',
        location: {
            type: "Point",
            coordinates: [2.294277, 48.858003],
        },
        place: '',
        radius: 50,
        badge: getFileFormatForImage('test/database/assets/pins/EiffelTower.jpg')
    },
    {
        name: 'France',
        description: '',
        points: 500,
        country: 'France',
        category: 'Country',
        location: {
            type: "Point",
            coordinates: [2.437298, 47.018631],
        },
        place: '',
        radius: 300000,
        badge: getFileFormatForImage('test/database/assets/pins/France.png')
    },
    {
        name: 'Golden Gate Bridge',
        description: '',
        points: 500,
        country: 'USA',
        category: 'Monument',
        location: {
            type: "Point",
            coordinates: [-122.478647, 37.819047],
        },
        place: '',
        radius: 1000,
        badge: getFileFormatForImage('test/database/assets/pins/GoldenGateBridge.jpg')
    },
    {
        name: 'Kilimanjaro',
        description: '',
        points: 500,
        country: 'Tanzania',
        category: 'Mountains',
        location: {
            type: "Point",
            coordinates: [37.358696, -3.068110],
        },
        place: '',
        radius: 1000,
        badge: getFileFormatForImage('test/database/assets/pins/Kilimanjaro.png')
    },
    {
        name: 'Las Vegas Sign',
        description: '',
        points: 500,
        country: 'USA',
        category: 'Monument',
        location: {
            type: "Point",
            coordinates: [-115.173034, 36.082124],
        },
        place: '',
        radius: 50,
        badge: getFileFormatForImage('test/database/assets/pins/LasVegasSign.png')
    },
    {
        name: 'La Tomatina',
        description: '',
        points: 500,
        country: 'Spain',
        category: 'Event',
        location: {
            type: "Point",
            coordinates: [-0.790792, 39.418985],
        },
        place: '',
        radius: 400,
        badge: getFileFormatForImage('test/database/assets/pins/LaTomitana.png')
    },
    {
        name: 'Louvre',
        description: '',
        points: 500,
        country: 'France',
        category: 'Monument',
        location: {
            type: "Point",
            coordinates: [2.335893, 48.860927],
        },
        place: '',
        radius: 60,
        badge: getFileFormatForImage('test/database/assets/pins/Louvre.jpg')
    },
    {
        name: 'Notre Dame',
        description: '',
        points: 500,
        country: 'France',
        category: 'Monument',
        location: {
            type: "Point",
            coordinates: [2.330156, 48.885399],
        },
        place: '',
        radius: 200,
        badge: getFileFormatForImage('test/database/assets/pins/NorteDame.jpg')
    },
    {
        name: 'Oktoberfest',
        description: '',
        points: 500,
        country: 'Germany',
        category: 'Event',
        location: {
            type: "Point",
            coordinates: [11.557600, 48.166479],
        },
        place: '',
        radius: 10000,
        badge: getFileFormatForImage('test/database/assets/pins/Oktoberfest.png')
    },
    {
        name: 'Rio Carnival',
        description: '',
        points: 500,
        country: 'Brazil',
        category: 'Event',
        location: {
            type: "Point",
            coordinates: [-43.248237, -22.889401],
        },
        place: '',
        radius: 20000,
        badge: getFileFormatForImage('test/database/assets/pins/RioCarnaval.png')
    },
    {
        name: 'Christ the Redeemer',
        description: '',
        points: 500,
        country: 'Brazil',
        category: 'Monument',
        location: {
            type: "Point",
            coordinates: [-43.210509, -22.951975],
        },
        place: '',
        radius: 50,
        badge: getFileFormatForImage('test/database/assets/pins/RioJesus.jpg')
    },
    {
        name: 'Sydney Opera House',
        description: '',
        points: 500,
        country: 'Australia',
        category: 'Monument',
        location: {
            type: "Point",
            coordinates: [151.214546, -33.856914],
        },
        place: '',
        radius: 200,
        badge: getFileFormatForImage('test/database/assets/pins/SidneyOpera.jpg')
    },
    {
        name: 'Taj Mahal',
        description: '',
        points: 500,
        country: 'India',
        category: 'Monument',
        location: {
            type: "Point",
            coordinates: [78.042131, 27.175030],
        },
        place: '',
        radius: 600,
        badge: getFileFormatForImage('test/database/assets/pins/taj-mahal.jpg')
    },
    {
        name: 'The Arc De Trioumphe',
        description: '',
        points: 500,
        country: 'France',
        category: 'Monument',
        location: {
            type: "Point",
            coordinates: [2.294834, 48.873771],
        },
        place: '',
        radius: 75,
        badge: getFileFormatForImage('test/database/assets/pins/TheArcDeTrioumphe.jpg')
    },
    {
        name: 'Time Square',
        description: '',
        points: 500,
        country: 'USA',
        category: 'Monument',
        location: {
            type: "Point",
            coordinates: [-73.985285, 40.758641],
        },
        place: '',
        radius: 100,
        badge: getFileFormatForImage('test/database/assets/pins/TimeSquare.png')
    },
    {
        name: 'Grand Canyon',
        description: '',
        points: 500,
        country: 'USA',
        category: 'Nature',
        location: {
            type: "Point",
            coordinates: [-112.313611, 36.917303],
        },
        place: '',
        radius: 200000,
        badge: getFileFormatForImage('test/database/assets/pins/GrandCanyon.jpg')
    },
    {
        name: 'Mount Everest',
        description: '',
        points: 500,
        country: '',
        category: 'Mountains',
        location: {
            type: "Point",
            coordinates: [86.925833, 27.988575],
        },
        place: '',
        radius: 200,
        badge: getFileFormatForImage('test/database/assets/pins/MountEverest.jpg')
    },
];

export const createExamplePins = async () => {
    await mongoose.connection.db.dropCollection('pins',function () {});

    for (let pin of examplePins)
        await PinModel.create(pin);
};
