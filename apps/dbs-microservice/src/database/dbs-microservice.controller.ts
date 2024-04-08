import { Controller } from '@nestjs/common'
import DbsMicroserviceService from './dbs-microservice.service'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { IRunQuery } from '@app/libs/lib/interfaces/runQueryInterface.i'

@Controller()
export class DbsMicroserviceController {
  constructor(
    private readonly dbsMicroserviceService: DbsMicroserviceService
  ) {}

  @MessagePattern('run_query')
  handleRunQuery(@Payload() payload: IRunQuery) {
    return this.dbsMicroserviceService.runQuery(payload)
  }
}
