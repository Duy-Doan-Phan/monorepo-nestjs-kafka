import { Module, ValidationPipe } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import * as Joi from 'joi'
import { APP_PIPE } from '@nestjs/core'
import { DbsMicroserviceModule } from './database/dbs-microservice.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'test'}`, // Sử dụng .env.production khi NODE_ENV không được thiết lập
      isGlobal: true,
      validationSchema: Joi.object({
        // Đảm bảo các biến môi trường cần thiết được thiết lập và đúng định dạng
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required()
      })
    }),
    DbsMicroserviceModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        host: configService.get('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'), // Lấy giá trị dưới dạng số
        user: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB')
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
