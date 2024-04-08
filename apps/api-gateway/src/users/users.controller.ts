import { Controller, Get } from '@nestjs/common'
import { UsersService } from './users.service'
import { ApiTags } from '@nestjs/swagger'
import { ResponseMessage } from '../decorator/customize'

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ResponseMessage('Lấy danh sách người dùng thành công')
  getAll() {
    return this.usersService.findAll()
  }
}
