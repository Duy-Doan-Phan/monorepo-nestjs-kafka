import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { Pool, PoolClient } from 'pg'
import { CONNECTION_POOL } from './database.module-definition'
import { IRunQuery } from '@app/libs/lib/interfaces/runQueryInterface.i'
import { catchError, from, map, of } from 'rxjs'

@Injectable()
class DbsMicroserviceService {
  private readonly logger = new Logger('SQL')

  constructor(@Inject(CONNECTION_POOL) private readonly pool: Pool) {}

  // async onModuleInit() {
  //   await this.checkAndInitData()
  // }
  //
  // async checkAndInitData() {
  //   const queryExistTable = `SELECT EXISTS (SELECT FROM information_schema.tables WHERE  table_name = 'users') AS table_exists;`
  //   const tableExistsResult = await this.queryWithLogging(
  //     this.pool,
  //     queryExistTable
  //   )
  //   const tableExists =
  //     tableExistsResult &&
  //     tableExistsResult[0] &&
  //     tableExistsResult[0].table_exists
  //
  //   if (!tableExists) {
  //     const queryCreateTable = `CREATE TABLE users (id SERIAL PRIMARY KEY,name VARCHAR(255) NOT NULL,email VARCHAR(255) NOT NULL,password VARCHAR(255) NOT NULL );`
  //     try {
  //       await this.queryWithLogging(this.pool, queryCreateTable)
  //       await this.createSampleUser()
  //     } catch (error) {
  //       // Xử lý lỗi nếu có
  //       console.error('Error creating table:', error)
  //     }
  //   }
  // }
  //
  // async createSampleUser() {
  //   const queryCreateUser = `INSERT INTO users (name, email, password) VALUES ('duy', 'duy@gmail.com', '123456');`
  //   try {
  //     await this.queryWithLogging(this.pool, queryCreateUser)
  //     console.log('Sample user created successfully.')
  //   } catch (error) {
  //     console.error('Error creating sample user:', error)
  //   }
  // }

  runQuery(payload: IRunQuery) {
    const { query, params } = payload
    return from(this.queryWithLogging(this.pool, query, params)).pipe(
      map(result => result.rows),
      catchError(error => {
        const message = this.getLogMessage(query, params)
        this.logger.error(message)
        return of({
          error: error.message
        })
      })
    )
  }

  private getLogMessage(query: string, params?: unknown[]): string {
    if (!params) {
      return `Query: ${query}`
    }
    return `Query: ${query} Params: ${JSON.stringify(params)}`
  }

  private async queryWithLogging(
    source: Pool | PoolClient,
    query: string,
    params?: unknown[]
  ): Promise<any> {
    return source.query(query, params)
  }

  async getPoolClient() {
    const poolClient = await this.pool.connect()

    return new Proxy(poolClient, {
      get: (target: PoolClient, propertyName: keyof PoolClient) => {
        if (propertyName === 'query') {
          return (query: string, params?: unknown[]) => {
            return this.queryWithLogging(target, query, params)
          }
        }
        return target[propertyName]
      }
    })
  }
}

export default DbsMicroserviceService
