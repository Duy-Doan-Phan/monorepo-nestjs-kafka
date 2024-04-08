import { IsNotEmpty, IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'name', description: 'Name' })
  name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123456', description: 'Password' })
  password: string
}
