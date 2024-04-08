import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { IUser } from '../users/users.interface'
import { map } from 'rxjs'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private usersService: UsersService
  ) {}

  validateUser(email, password) {
    return this.usersService.findByEmail(email).pipe(
      map(user => {
        console.log(user)
        if (user.password === password) return user
        else return null
      })
    )

    // const isValidPass = this.usersService.isValidPassword(
    //   password,
    //   user.password
    // )
    // if (!isValidPass) throw new BadRequestException('Password không hợp lệ')
    //
    // // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { password, ...rest } = user
    // return rest
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
