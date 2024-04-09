import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UserLoginDto {
  @IsString({ message: 'Email phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Email không được bỏ trống' })
  @ApiProperty({ example: 'test@gmail.com', description: 'Email' })
  readonly email: string

  @IsString({ message: 'Mật khẩu phải là chuỗi ký tự' })
  @IsNotEmpty({ message: 'Mật khẩu không được bỏ trống' })
  @ApiProperty({ example: '123456', description: 'Mật khẩu' })
  readonly password: string
}
