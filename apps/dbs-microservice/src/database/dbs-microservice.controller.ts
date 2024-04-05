import { Controller } from '@nestjs/common'
import DbsMicroserviceService from './dbs-microservice.service'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { IRunQuery } from '@app/libs/lib/interfaces/runQueryInterface.i'
import { plainToInstance } from 'class-transformer'
import { PostEntity } from '@app/libs/lib/entities'

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
  async handleUserGet(@Payload() payload: IRunQuery) {
    console.log('payload for other service 1', payload)
    // return plainToInstance(
    //   PostEntity,
    //   this.dbsMicroserviceService.runQuery(payload).rows
    // )
    const result = await this.dbsMicroserviceService.runQuery(payload)
    console.log('result', result)
    return 'ok'
  }
}
