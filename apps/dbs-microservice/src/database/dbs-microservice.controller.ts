import { Controller } from '@nestjs/common'
import DbsMicroserviceService from './dbs-microservice.service'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { IRunQuery } from '@app/libs/lib/interfaces/runQueryInterface.i'
import { Observable } from 'rxjs'

@Controller()
export class DbsMicroserviceController {
  constructor(
    private readonly dbsMicroserviceService: DbsMicroserviceService
  ) {}

  // @Get()
  // getHello(): string {
  //   return this.dbsMicroserviceService.getHello()
  // }

  @MessagePattern('run_query')
  handleUserGet(@Payload() payload: IRunQuery): Observable<any> {
    console.log('payload for other service 1', payload)
    return this.dbsMicroserviceService.runQuery(payload)
  }
}
