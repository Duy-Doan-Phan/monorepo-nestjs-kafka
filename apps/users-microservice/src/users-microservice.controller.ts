import { Controller } from '@nestjs/common'
import { MessagePattern, Payload } from '@nestjs/microservices'
import UsersMicroserviceRepository from './users.repository'
import { CreateUserDto } from '@app/libs/lib/dto'

@Controller()
export class UsersMicroserviceController {
  constructor(private readonly appRepository: UsersMicroserviceRepository) {}

  @MessagePattern('get_users')
  handleGetUsers() {
    return this.appRepository.getAll()
  }

  @MessagePattern('create_user')
  handleCreateUser(@Payload() body: CreateUserDto) {
    return this.appRepository.createUser(body)
  }

  @MessagePattern('find_user_by_id')
  handleFindUserById(@Payload() id: string) {
    return this.appRepository.findUserById(+id)
  }

  @MessagePattern('find_user_by_email')
  handleFindUserByEmail(@Payload() email: string) {
    return this.appRepository.findUserByEmail(email)
  }

  @MessagePattern('update_user')
  handleUpdateUser(@Payload() body: any) {
    const { id, data } = body
    return this.appRepository.updateUser(id, data)
  }

  @MessagePattern('delete_user')
  handleDeleteUser(@Payload() id: string) {
    return this.appRepository.deleteUser(+id)
  }
}
