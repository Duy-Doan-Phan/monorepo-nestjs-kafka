import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { IUser } from '../users/users.interface'
import { from, of, take } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private usersService: UsersService
  ) {}

  validateUser(email: string, pass: string) {
    // return of(
    //   this.usersService.findByEmail(email).subscribe(user => {
    //     console.log(user, '///')
    //     if (!user) return null
    //     // const isValidPass = this.usersService.isValidPassword(pass, user.password)
    //     // if (!isValidPass) throw new BadRequestException('Password không hợp lệ')
    //
    //     // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //     const { password, ...rest } = user
    //     return rest
    //   })
    // )
    return of(this.usersService.findByEmail(email))
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
    return of(user).pipe(
      map(value => {
        return value
      })
    )
    //set refresh token as cookies
    // response.cookie('refresh_token', refresh_token, {
    //   httpOnly: true,
    //   maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE'))
    // })
  }
}
