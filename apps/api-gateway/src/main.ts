import { NestFactory, Reflector } from '@nestjs/core'
import { ApiGatewayModule } from './api-gateway.module'
import { ConfigService } from '@nestjs/config'
import cookieParser from 'cookie-parser'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { TransformInterceptor } from './core/tranform.inteceptor'

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule)

  //.env for main.ts
  const configService = app.get(ConfigService)
  const port = configService.get<string>('PORT')

  //auth
  const reflector = app.get(Reflector)
  // app.useGlobalGuards(new JwtAuthGuard(reflector))

  //interceptor
  app.useGlobalInterceptors(new TransformInterceptor(reflector))

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

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
