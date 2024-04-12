import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { UsersController } from './users.controller'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    ClientsModule.registerAsync([
      {
        name: 'USERS_SERVICE',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'users',
              brokers: [configService.get<string>('KAFKA_BROKER')]
            },
            consumer: {
              groupId: 'users-consumer'
            }
          }
        })
      }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
