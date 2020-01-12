import {Module} from '@nestjs/common';
import {MapService} from './map.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UsersSchema} from "../schemas/user.schema";
import {PinSchema} from "../schemas/pin.schema";
import {VisitSchema} from "../schemas/visit.schema";
import { MapController } from './map.controller';

@Module({
    imports: [MongooseModule.forFeature([
        {name: 'users', schema: UsersSchema},
        {name: 'pins', schema: PinSchema},
        {name: 'visits', schema: VisitSchema}
    ])],
    providers: [MapService],
    controllers: [MapController]
})
export class MapModule {
}
