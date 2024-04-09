import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { IUser } from '../../users/users.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_ACCESS_EXPIRE')
    })
  }

  async validate(payload: IUser): Promise<any> {
    const { id, name, email } = payload
    //lấy permission theo role

    return {
      id,
      name,
      email
    } // req.user
  }
}
