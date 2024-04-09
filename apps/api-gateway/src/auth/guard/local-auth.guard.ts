import {
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Reflector } from '@nestjs/core'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context)
  }

  handleRequest(err, info) {
    // You can throw an exception based on either "info" or "err" arguments
    console.log(info, 'info')
    console.log(err, 'err')
    if (err || !info) {
      throw (
        err ||
        new UnauthorizedException(
          'Thiếu trường email hoặc mật khẩu! Vui lòng thử lại!'
        )
      )
    }
    // return user;
    return info
  }
}
