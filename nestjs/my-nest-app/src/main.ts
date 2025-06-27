import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //need to gloabally apply validations
  // NestJS’s ValidationPipe internally uses both class-validator and class-transformer under the hood.
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // this will remove the properties which are not defined in dto
    forbidNonWhitelisted : true // this will give error if he finds any unknown field
  }))

  await app.listen(process.env.PORT ?? 3000);

  //enable shutdown lifecycle methods
  app.enableShutdownHooks()
  
}
bootstrap();
