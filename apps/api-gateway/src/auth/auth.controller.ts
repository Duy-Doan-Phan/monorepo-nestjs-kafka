import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from '@app/libs/lib/dto'
import { ResponseMessage } from '../decorator/customize'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ResponseMessage('Register Success')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto)
  }

  // @Post('sign-in')
  // @ResponseMessage('Login Success')
  // login(@Body() createUserDto: CreateUserDto) {
  //   return this.authService.login(createUserDto)
  // }
}
