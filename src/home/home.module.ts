import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import {MongooseModule} from "@nestjs/mongoose";
import {PostsSchema} from "../schemas/posts.schema";
import {UsersSchema} from "../schemas/user.schema";
import { HomeController } from './home.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'posts', schema: PostsSchema }, { name: 'users', schema: UsersSchema }])],
  providers: [HomeService],
  controllers: [HomeController]
})
export class HomeModule {}
