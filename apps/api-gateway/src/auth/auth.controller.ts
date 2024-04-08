import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { Public, ResponseMessage, User } from '../decorator/customize'
import { LocalAuthGuard } from './guard/local-auth.guard'
import { ApiBody } from '@nestjs/swagger'
import { UserLoginDto } from '../../../../libs/libs/src/lib/dto'
import { IUser } from '../users/users.interface'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: UserLoginDto })
  @HttpCode(HttpStatus.OK)
  @ResponseMessage('Đăng nhập thành công')
  @Post('/login')
  logIn(@User() user: IUser, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(user, response)
  }
}
