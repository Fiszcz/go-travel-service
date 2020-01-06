import { Module } from '@nestjs/common';
import { PinsService } from './pins.service';
import {MongooseModule} from "@nestjs/mongoose";
import {PinSchema} from "../schemas/pin.schema";

@Module({
  imports: [MongooseModule.forFeature([{ name: 'pins', schema: PinSchema }])],
  providers: [PinsService]
})
export class PinsModule {}
