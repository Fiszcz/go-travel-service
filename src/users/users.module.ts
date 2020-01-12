import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UsersSchema} from "../schemas/user.schema";
import { UsersController } from './users.controller';

@Module({
  imports: [MongooseModule.forFeature([{name: 'users', schema: UsersSchema}])],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
