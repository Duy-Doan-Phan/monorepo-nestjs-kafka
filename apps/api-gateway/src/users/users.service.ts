import { Inject, Injectable } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { CreateUserDto } from '@app/libs/lib/dto'
import { from, Observable, timeout } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersClient: ClientKafka
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

  async onModuleInit() {
    this.usersClient.subscribeToResponseOf('get_user')
    await this.usersClient.connect()
  }
}
