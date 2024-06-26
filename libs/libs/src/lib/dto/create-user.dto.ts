import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'name', description: 'Name' })
  name: string

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'user@gmail.com', description: 'Email' })
  email: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123456', description: 'Password' })
  password: string
}
