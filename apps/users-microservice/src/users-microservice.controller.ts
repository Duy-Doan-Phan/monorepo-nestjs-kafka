import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import UsersMicroserviceRepository from './users.repository'
import { IRunQuery } from '@app/libs/lib/interfaces/runQueryInterface.i'

@Controller()
export class UsersMicroserviceController {
  constructor(private readonly appRepository: UsersMicroserviceRepository) {}

  @MessagePattern('get_users')
  handleGetUsers(@Payload() data: IRunQuery) {
    console.log('data from api gateway:', data)
    return this.appRepository.getAll()
  }
}
