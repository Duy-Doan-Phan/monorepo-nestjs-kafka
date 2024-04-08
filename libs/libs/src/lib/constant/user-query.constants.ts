import { UserEntity } from '../entities'
import { IRunQuery } from '../interfaces/runQueryInterface.i'
import { CreateUserDto, UpdateUserDto } from '@app/libs/lib/dto'

export const UserQueryConstants = {
  GET_USERS: {
    query: 'SELECT * FROM users'
  },
  GET_USER_BY_ID: (userId: number): IRunQuery => {
    return {
      query: 'SELECT * FROM users WHERE id = $1',
      params: [userId]
    }
  },
  GET_USER_BY_EMAIL: (email: string): IRunQuery => {
    return {
      query: 'SELECT * FROM users WHERE email = $1',
      params: [email]
    }
  },
  CREATE_USER: (user: CreateUserDto): IRunQuery => {
    return {
      query:
        'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      params: [user.name, user.email, user.password]
    }
  },
  UPDATE_USER: (user: UpdateUserDto, id: number): IRunQuery => {
    return {
      query:
        'UPDATE users SET name = $1, password = $2 WHERE id = $3 RETURNING *',
      params: [user.name, user.password, id]
    }
  },

  DELETE_USER: (userId: number): IRunQuery => {
    return {
      query: 'DELETE FROM users WHERE id = $1',
      params: [userId]
    }
  }
}
