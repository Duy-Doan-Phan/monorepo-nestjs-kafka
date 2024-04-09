import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { IUser } from '../users/users.interface'
import { catchError, from, of, switchMap, throwError } from 'rxjs'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private usersService: UsersService
  ) {}

  validateUser(email: string, password: string) {
    return from(this.usersService.findByEmail(email)).pipe(
      switchMap(value => {
        console.log(value, 'xxxx')
        if (value.error || !value) {
          throw new BadRequestException(value.error || 'User not found')
        }

        const isValidPass = this.usersService.isValidPassword(
          password,
          value.password
        )
        if (!isValidPass) {
          throw new BadRequestException('Password không hợp lệ')
        }

        console.log(value, 'abc')
        return value
      }),
      catchError(error => {
        // Xử lý lỗi ở đây
        return throwError(error)
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
