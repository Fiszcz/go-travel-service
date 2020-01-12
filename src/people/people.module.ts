import {Module} from '@nestjs/common';
import {PeopleService} from './people.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UsersSchema} from "../schemas/user.schema";
import {VisitSchema} from "../schemas/visit.schema";
import { PeopleController } from './people.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'users', schema: UsersSchema }, { name: 'visits', schema: VisitSchema }])],
  providers: [PeopleService],
  controllers: [PeopleController]
})
export class PeopleModule {}
