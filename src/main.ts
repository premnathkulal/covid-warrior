import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { writeFileSync } from 'fs'
import { ValidationPipe } from '@nestjs/common'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser())
  const config = new DocumentBuilder()
    .setTitle('Covid Warrior')
    .setDescription('List of all Covid Warrior APIs')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth',
    )
    .build()
  const document = SwaggerModule.createDocument(app, config)
  writeFileSync('./swagger-spec.json', JSON.stringify(document))
  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT || 3000)
}
bootstrap()
