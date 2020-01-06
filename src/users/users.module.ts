import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UsersSchema} from "../schemas/user.schema";

@Module({
  imports: [MongooseModule.forFeature([{name: 'users', schema: UsersSchema}])],
  providers: [UsersService]
})
export class UsersModule {}
