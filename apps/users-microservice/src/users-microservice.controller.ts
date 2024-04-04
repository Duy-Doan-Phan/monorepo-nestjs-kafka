import { Controller, ParseIntPipe, ValidationPipe } from '@nestjs/common'
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices'

import { CreateUserDto } from '@app/libs/lib/dto'
import { UsersMicroserviceService } from './users-microservice.service'
import { Observable, of } from 'rxjs'

@Controller()
export class UsersMicroserviceController {
  constructor(private readonly appService: UsersMicroserviceService) {}

  @EventPattern('create_user')
  handleUserCreate(data: CreateUserDto) {
    // this.appService.createUser(data)
    console.log('microservice post', data)
    return data
  }

  @MessagePattern('get_user')
  handleUserGet(@Payload() data: any): Observable<any> {
    console.log('microservice get', data)
    return data
  }
}
