import { Inject, Injectable } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka
  ) {}

  // createUser(createUserDto: CreateUserDto) {
  //   this.authClient.emit('create_user', JSON.stringify(createUserDto))
  // }

  // login()
}
