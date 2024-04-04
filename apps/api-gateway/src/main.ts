import { NestFactory } from '@nestjs/core'
import { ApiGatewayModule } from './api-gateway.module'
import { ConfigService } from '@nestjs/config'
import * as cookieParser from 'cookie-parser'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType
} from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule)

  //.env for main.ts
  const configService = app.get(ConfigService)
  const port = configService.get<string>('PORT')

  //config cookies parser
  app.use(cookieParser())

  //config pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true
    })
  )

  //config cors
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: true
  })

  //config swagger
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API docs')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'JWT',
        in: 'header'
      },
      'token'
    )
    .addSecurityRequirements('token')
    // .addTag('cats')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true
    }
  })

  app.use(cookieParser())

  await app.listen(port || 8000)
}

bootstrap()
