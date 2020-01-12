import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {PinWithNumberOfVisits, VisitsAndPointsOfUser} from "./visits/interfaces/Visits.interfaces";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
      .setTitle('Go-travel')
      .setDescription('Go Travel API')
      .setVersion('1.0')
      .addTag('travel')
      .build();
  const document = SwaggerModule.createDocument(app, options, {
    extraModels: [VisitsAndPointsOfUser, PinWithNumberOfVisits],
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
