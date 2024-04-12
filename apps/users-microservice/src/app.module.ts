import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UsersMicroserviceModule } from './users-microservice.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`, // Xác định file .env tương ứng với môi trường
      isGlobal: true
    }),
    UsersMicroserviceModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
