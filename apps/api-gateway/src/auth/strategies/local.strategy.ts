import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { UserLoginDto } from '../../../../../libs/libs/src/lib/dto'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email'
    })
  }

  async validate(email: string, password: string) {
    const user = this.authService.validateUser(email, password)
    if (!user) {
      throw new UnauthorizedException('Email không hợp lệ!')
    }
    return user //req.user
  }
}
