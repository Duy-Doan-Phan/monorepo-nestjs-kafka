import { Inject, Injectable, Logger } from '@nestjs/common'
import { Pool, PoolClient } from 'pg'
import { CONNECTION_POOL } from './database.module-definition'
import { IRunQuery } from '@app/libs/lib/interfaces/runQueryInterface.i'
import { catchError, from, map, Observable, of, tap } from 'rxjs'

@Injectable()
class DbsMicroserviceService {
  private readonly logger = new Logger('SQL')

  constructor(@Inject(CONNECTION_POOL) private readonly pool: Pool) {}

  runQuery(payload: IRunQuery): Observable<any> {
    const { query, params } = payload
    return from(this.queryWithLogging(this.pool, query, params)).pipe(
      tap(result => {
        const message = this.getLogMessage(query, params)
        this.logger.log(message)
        return result.rows
      }),
      // map(result => result.rows),
      catchError(error => {
        const message = this.getLogMessage(query, params)
        this.logger.error(message)
        return of([{ error: error.message }])
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
