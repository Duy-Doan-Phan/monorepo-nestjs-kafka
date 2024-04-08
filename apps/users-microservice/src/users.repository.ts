import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import { ClientKafka } from '@nestjs/microservices'
import { UserEntity } from '@app/libs/lib/entities'
import { from, map, Observable, of, switchMap } from 'rxjs'
import { UserQueryConstants } from '@app/libs/lib/constant/user-query.constants'
import { IError } from '@app/libs/lib/interfaces/errorInterface.i'
import { CreateUserDto } from '@app/libs/lib/dto'

@Injectable()
class UsersMicroserviceRepository implements OnModuleInit {
  constructor(@Inject('DBS_SERVICE') private readonly dbsClient: ClientKafka) {}

  getAll(): Observable<UserEntity[] | IError> {
    return from(
      this.dbsClient.send('run_query', UserQueryConstants.GET_USERS).pipe(
        map(value => {
          return value
        })
      )
    )
  }

  createUser(user: CreateUserDto): Observable<UserEntity | IError> {
    const createUserQuery = UserQueryConstants.CREATE_USER(user)

    return this.dbsClient.send('run_query', createUserQuery).pipe(
      map(value => {
        if (value?.error) {
          return { error: value.error }
        }
        return value[0]
      })
    )
  }

  findUserById(userId: number): Observable<UserEntity | IError> {
    const findUserByIdQuery = UserQueryConstants.GET_USER_BY_ID(userId)
    return this.dbsClient.send('run_query', findUserByIdQuery).pipe(
      map(value => {
        if (value?.error) {
          return { error: value.error }
        }
        return value[0]
      })
    )
  }

  findUserByEmail(email: string): Observable<UserEntity | IError> {
    const findUserByEmailQuery = UserQueryConstants.GET_USER_BY_EMAIL(email)
    return this.dbsClient.send('run_query', findUserByEmailQuery).pipe(
      map(value => {
        if (value?.error) {
          return { error: value.error }
        }
        return value[0]
      })
    )
  }

  updateUser(
    userId: number,
    data: CreateUserDto
  ): Observable<UserEntity | IError> {
    const updateUserQuery = UserQueryConstants.UPDATE_USER(data, userId)
    return this.dbsClient.send('run_query', updateUserQuery).pipe(
      map(value => {
        if (value?.error) {
          return { error: value.error }
        }
        return value[0]
      })
    )
  }

  deleteUser(userId: number) {
    const deleteUserQuery = UserQueryConstants.DELETE_USER(userId)

    return this.findUserById(userId).pipe(
      switchMap(value => {
        if (!value) {
          return of({ error: 'Not found user' })
        } else {
          return this.dbsClient.send('run_query', deleteUserQuery).pipe(
            map(response => {
              if (response?.error) {
                return { error: response.error }
              }
              return ['ok']
            })
          )
        }
      })
    )
  }

  async onModuleInit(): Promise<void> {
    this.dbsClient.subscribeToResponseOf('run_query')
    await this.dbsClient.connect()
  }
}

export default UsersMicroserviceRepository
