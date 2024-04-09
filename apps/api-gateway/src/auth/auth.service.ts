import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { IUser } from '../users/users.interface'
import { catchError, from, of, switchMap, tap, throwError } from 'rxjs'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private usersService: UsersService
  ) {}

  validateUser(email: string, password: string) {
    const user = this.usersService.findByEmail(email)
    return user.pipe(
      tap(user => {
        console.log('user: ', user)
        if (user.password === password) {
          return of(user)
        }
        return throwError(() => new UnauthorizedException())
      })
    )
  }

  login(user: IUser, response: Response) {
    const { id, name, email } = user
    const payload = {
      sub: 'token login',
      iss: 'from server',
      id,
      name,
      email
    }
    //set refresh token as cookies
    // response.cookie('refresh_token', refresh_token, {
    //   httpOnly: true,
    //   maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE'))
    // })
  }
}
