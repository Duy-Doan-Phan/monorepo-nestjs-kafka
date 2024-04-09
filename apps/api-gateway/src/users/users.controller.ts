import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'
import { UsersService } from './users.service'
import { ApiTags } from '@nestjs/swagger'
import { ResponseMessage } from '../decorator/customize'
import { CreateUserDto, UpdateUserDto } from '@app/libs/lib/dto'

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ResponseMessage('Lấy danh sách người dùng thành công')
  getAll() {
    return this.usersService.findAll()
  }

  @Post()
  @ResponseMessage('Thêm người dùng thành công')
  create(@Body() data: CreateUserDto) {
    return this.usersService.createUser(data)
  }

  @Get(':id')
  @ResponseMessage('Lấy thông tin người dùng thành công')
  getById(@Param('id') id: string) {
    return this.usersService.findById(+id)
  }

  @Get('email/:id')
  @ResponseMessage('Lấy thông tin người dùng thành công')
  getByEmail(@Param('id') id: string) {
    return this.usersService.findByEmail(id)
  }

  @Put(':id')
  @ResponseMessage('Cập nhật thông tin người dùng thành công')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.usersService.update(+id, data)
  }

  @Delete(':id')
  @ResponseMessage('Xóa người dùng thành công')
  delete(@Param('id') id: string) {
    return this.usersService.delete(+id)
  }
}
