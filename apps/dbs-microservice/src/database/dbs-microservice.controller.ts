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

  @MessagePattern('run_query')
  handleUserGet(@Payload() payload: IRunQuery): Observable<any> {
    console.log('payload for other service')
    return this.dbsMicroserviceService.runQuery(payload)
  }
}
