import { Exclude } from 'class-transformer'

export class UserEntity {
  id?: number

  name: string
  @Exclude({ toPlainOnly: true })
  password: string

  email: string
}
