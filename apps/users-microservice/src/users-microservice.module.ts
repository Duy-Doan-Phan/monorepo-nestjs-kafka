import { Module } from '@nestjs/common'
import { UsersMicroserviceController } from './users-microservice.controller'
import { UsersMicroserviceService } from './users-microservice.service'
import { UsersRepository } from './users.repository'

@Module({
  imports: [],
  controllers: [UsersMicroserviceController],
  providers: [UsersMicroserviceService, UsersRepository]
})
export class UsersMicroserviceModule {}
