import { Module, ValidationPipe } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as Joi from 'joi'
import { APP_PIPE } from '@nestjs/core'
import { DbsMicroserviceModule } from './database/dbs-microservice.module'

@Module({
  imports: [
    DbsMicroserviceModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        user: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB')
      })
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required()
      })
    })
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true
      })
    }
  ]
})
export class AppModule {}
