import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service'
import { UserLoginDto } from '../../../../../libs/libs/src/lib/dto'
import { catchError, map, Observable } from 'rxjs'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email'
    })
  }

  validate(email: string, password: string): Observable<any> {
    return this.authService.validateUser(email, password).pipe(
      map(user => {
        if (!user) {
          throw new UnauthorizedException('Email không hợp lệ!')
        }
        console.log(user)
        return user
      }),
      catchError(error => {
        throw new UnauthorizedException('Email không hợp lệ!')
      })
    )
  }
}
