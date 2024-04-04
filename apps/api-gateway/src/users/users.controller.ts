import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from '@app/libs/lib/dto'
import { ApiBody, ApiTags } from '@nestjs/swagger'
import { ResponseMessage } from '../decorator/customize'

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ResponseMessage('Tạo người dùng thành công')
  createUser(@Body() createUserDto: CreateUserDto) {
    console.log('api', createUserDto)
    return this.usersService.createUser(createUserDto)
  }

  @Get(':id')
  @ResponseMessage('Lấy chi tiết người dùng thành công')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }
}
