import { Module } from '@nestjs/common'
import { UsersMicroserviceController } from './users-microservice.controller'
import UsersRepository from './users.repository'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   envFilePath: `.env.${process.env.NODE_ENV}`, // Xác định file .env tương ứng với môi trường
    //   isGlobal: true
    // }),
    ConfigModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: 'DBS_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'dbs',
              brokers: [configService.get<string>('KAFKA_BROKER')]
            },
            consumer: {
              groupId: 'dbs-consumer'
            }
          }
        })
      }
    ])
  ],
  controllers: [UsersMicroserviceController],
  providers: [UsersRepository]
})
export class UsersMicroserviceModule {}
