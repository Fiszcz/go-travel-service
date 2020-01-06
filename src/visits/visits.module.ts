import { Module } from '@nestjs/common';
import { VisitsService } from './visits.service';
import {MongooseModule} from "@nestjs/mongoose";
import {VisitSchema} from "../schemas/visit.schema";

@Module({
  imports: [MongooseModule.forFeature([{name: 'visits', schema: VisitSchema}])],
  providers: [VisitsService]
})
export class VisitsModule {}
