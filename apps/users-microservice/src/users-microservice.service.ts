import { Injectable } from '@nestjs/common'
import { UsersRepository } from './users.repository'
import { CreateUserDto } from '@app/libs/lib/dto'
import { User } from '@app/libs/lib/entities'

@Injectable()
export class UsersMicroserviceService {
  constructor(private readonly usersRepository: UsersRepository) {}

  createUser(data: CreateUserDto): void {
    this.usersRepository.save(data)
  }

  getUser(id: number): User {
    return this.usersRepository.findOne(id)
  }
}
