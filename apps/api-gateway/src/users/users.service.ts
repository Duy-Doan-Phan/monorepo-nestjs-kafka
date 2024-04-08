import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit
} from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { map, of } from 'rxjs'
import { UserEntity } from '@app/libs/lib/entities'
import { CreateUserDto, UpdateUserDto } from '@app/libs/lib/dto'
import { plainToInstance } from 'class-transformer'

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersClient: ClientKafka
  ) {}

  findAll() {
    return this.usersClient.send('get_users', {}).pipe(
      map(value => {
        if (value?.error) {
          throw new BadRequestException(value.error)
        }
        return plainToInstance(UserEntity, value)
      })
    )
  }

  createUser(data: CreateUserDto) {
    return this.usersClient.send('create_user', data).pipe(
      map(value => {
        if (value?.error) {
          throw new BadRequestException(value.error)
        }
        return plainToInstance(UserEntity, value)
      })
    )
  }

  findById(id: number) {
    if (!id) {
      throw new BadRequestException('Id is required')
    }

    return this.usersClient.send('find_user_by_id', id).pipe(
      map(value => {
        if (value?.error) {
          throw new BadRequestException(value.error)
        }
        if (!value) {
          throw new NotFoundException('User not found')
        }
        return plainToInstance(UserEntity, value)
      })
    )
  }

  findByEmail(email: string) {
    if (!email) {
      throw new BadRequestException('Email is required')
    }

    return this.usersClient.send('find_user_by_email', email).pipe(
      map(value => {
        if (value?.error) {
          throw new BadRequestException(value.error)
        }
        if (!value) {
          return of['ok']
        }
        throw new BadRequestException('User already exists')
      })
    )
  }

  update(id: number, data: UpdateUserDto) {
    if (!id) {
      throw new BadRequestException('Id is required')
    }
    return this.usersClient.send('update_user', { id, data }).pipe(
      map(value => {
        if (value?.error) {
          throw new BadRequestException(value.error)
        }
        if (!value) {
          throw new NotFoundException('User not found')
        }
        return plainToInstance(UserEntity, value)
      })
    )
  }

  delete(id: number) {
    if (!id) {
      throw new BadRequestException('Id is required')
    }
    return this.usersClient.send('delete_user', id).pipe(
      map(value => {
        if (value?.error) {
          throw new BadRequestException(value.error)
        }
        if (value == 'ok') {
          return of[`delete user with id  = ${id}`]
        }
      })
    )
  }

  async onModuleInit() {
    this.usersClient.subscribeToResponseOf('get_users')
    this.usersClient.subscribeToResponseOf('create_user')
    this.usersClient.subscribeToResponseOf('find_user_by_id')
    this.usersClient.subscribeToResponseOf('find_user_by_email')
    this.usersClient.subscribeToResponseOf('update_user')
    this.usersClient.subscribeToResponseOf('delete_user')
    await this.usersClient.connect()
  }
}
