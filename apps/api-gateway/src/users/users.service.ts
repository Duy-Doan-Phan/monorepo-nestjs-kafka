import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { CreateUserDto } from '@app/libs/lib/dto'
import { from, Observable, tap, timeout } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersClient: ClientKafka,
    @Inject('DBS_SERVICE') private readonly dbsClient: ClientKafka
  ) {}

  createUser(createUserDto: CreateUserDto) {
    this.usersClient.emit('create_user', JSON.stringify(createUserDto))
  }

  findOne(id: number): Observable<any> {
    console.log(id)
    return from(this.usersClient.send('get_user', id)).pipe(
      map(data => {
        console.log('data return', data)
        return data
      })
      // timeout(5000)
    )
  }

  testConnectDB(body: any): Observable<any> {
    return this.dbsClient.send('run_query', body).pipe(
      tap(data => {
        console.log('data return', data)
      })
    )
  }

  async onModuleInit() {
    // this.usersClient.subscribeToResponseOf('get_user')
    this.dbsClient.subscribeToResponseOf('run_query')
    this.usersClient.subscribeToResponseOf('get_user')
    await this.dbsClient.connect()
    await this.usersClient.connect()
  }
}
