import { Module } from '@nestjs/common'
import { UsersMicroserviceController } from './users-microservice.controller'
import UsersRepository from './users.repository'
import { ClientsModule, Transport } from '@nestjs/microservices'

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'DBS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'dbs',
            brokers: ['localhost:9092']
          },
          consumer: {
            groupId: 'dbs-consumer'
          }
        }
      }
    ])
  ],
  controllers: [UsersMicroserviceController],
  providers: [UsersRepository]
})
export class UsersMicroserviceModule {}
