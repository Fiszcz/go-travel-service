import { Module } from '@nestjs/common';
import { PinsService } from './pins.service';
import {MongooseModule} from "@nestjs/mongoose";
import {PinSchema} from "../schemas/pin.schema";
import { PinsController } from './pins.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'pins', schema: PinSchema }])],
  providers: [PinsService],
  controllers: [PinsController]
})
export class PinsModule {}
