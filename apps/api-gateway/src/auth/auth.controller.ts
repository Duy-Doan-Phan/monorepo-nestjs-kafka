import { Controller } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('sign-up')
  // @ResponseMessage('Register Success')
  // createUser(@Body() createUserDto: CreateUserDto) {
  //   return this.authService.createUser(createUserDto)
  // }

  // @Post('sign-in')
  // @ResponseMessage('Login Success')
  // login(@Body() createUserDto: CreateUserDto) {
  //   return this.authService.login(createUserDto)
  // }
}
