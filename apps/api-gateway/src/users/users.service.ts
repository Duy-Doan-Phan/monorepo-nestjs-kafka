import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { Observable } from 'rxjs'
import { UserEntity } from '@app/libs/lib/entities'

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersClient: ClientKafka
  ) {}

  //
  // testConnectDB(body: any): Observable<any> {
  //   return this.dbsClient.send('run_query', body).pipe(
  //     tap(data => {
  //       console.log('data return', data)
  //     })
  //   )
  // }

  findAll(): Observable<UserEntity> {
    // return this.dbsClient.send('run_query', `SELECT * FROM USERS`)
    //todo xu ly error va data tra ve
    return this.usersClient.send('get_users')
  }

  async onModuleInit() {
    this.usersClient.subscribeToResponseOf('get_users')
    await this.usersClient.connect()
  }
}
