import { BadRequestException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'
import { IUser } from '../users/users.interface'
import { from, lastValueFrom, of, take } from 'rxjs'
import { map } from 'rxjs/operators'
import ms from 'ms'
import { Response } from 'express'

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private usersService: UsersService
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await lastValueFrom(this.usersService.findByEmail(email))
    if (!user) return null
    const isValidPass = this.usersService.isValidPassword(pass, user.password)
    if (!isValidPass) throw new BadRequestException('Password không hợp lệ')

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user
    return rest
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

    const token = this.createToken(payload)

    // set refresh token as cookies
    response.cookie('token', token, {
      httpOnly: true,
      maxAge: ms(this.configService.get<string>('JWT_ACCESS_EXPIRE'))
    })

    const result = {
      id,
      name,
      email
    }

    return {
      token,
      result
    }
  }

  async logout(user: IUser, response: Response): Promise<string> {
    response.clearCookie('token')
    return 'ok'
  }

  createToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: ms(this.configService.get<string>('JWT_ACCESS_EXPIRE'))
    })
  }
}
