import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { UsersController } from './users.controller'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USERS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'users',
            brokers: ['localhost:9092']
          },
          consumer: {
            groupId: 'users-consumer'
          }
        }
      }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}