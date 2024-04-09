import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { map } from 'rxjs'
import { IUser } from '../../users/users.interface'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email'
    })
  }

  validate(email: string, password: string) {
    // return this.authService.validateUser(email, password).pipe(
    //   map(user => {
    //     console.log(user, 'xyz')
    //     if (!user) {
    //       throw new UnauthorizedException('Email không hợp lệ!')
    //     }
    //     return user // Trả về req.user
    //   })
    // )
    let user: any
    const data = this.authService.validateUser(email, password).pipe(
      map(res => {
        user = res
        if (!user) {
          throw new UnauthorizedException('Email không hợp lệ!')
        }
        return user
      })
    )
    return data.subscribe(res => {
      console.log(res)
      return res
    }) //req.user
  }
}
