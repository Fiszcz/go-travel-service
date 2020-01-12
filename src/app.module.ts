import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {HomeModule} from './home/home.module';
import {MapModule} from './map/map.module';
import {PeopleModule} from './people/people.module';
import {PinsModule} from './pins/pins.module';
import {PostsModule} from './posts/posts.module';
import {UsersModule} from './users/users.module';
import {VisitsModule} from './visits/visits.module';
import {CountryModule} from './country/country.module';

@Module({
    imports: [MongooseModule.forRoot('mongodb://localhost:27017/test'), HomeModule, MapModule, PeopleModule, PinsModule, PostsModule, UsersModule, VisitsModule, CountryModule],
})
export class AppModule {
}
