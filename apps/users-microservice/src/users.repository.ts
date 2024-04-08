import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { ClientKafka } from '@nestjs/microservices'
import { UserEntity } from '@app/libs/lib/entities'
import { catchError, map, Observable, of } from 'rxjs'

@Injectable()
class UsersMicroserviceRepository implements OnModuleInit {
  constructor(@Inject('DBS_SERVICE') private readonly dbsClient: ClientKafka) {}

  getAll(): Observable<UserEntity[]> {
    return this.dbsClient.send('run_query', 'SELECT * FROM USERS').pipe(
      map(response => response.map(data => plainToInstance(UserEntity, data))),
      catchError(error => {
        return of({ error: error.message })
      })
    )
  }

  async onModuleInit(): Promise<void> {
    this.dbsClient.subscribeToResponseOf('run_query')
    await this.dbsClient.connect()
  }
}

export default UsersMicroserviceRepository
