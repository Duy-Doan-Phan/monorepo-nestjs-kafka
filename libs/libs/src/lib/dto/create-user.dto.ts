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
}
