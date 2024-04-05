import { Module } from '@nestjs/common'
import { DbsMicroserviceController } from './dbs-microservice.controller'
import {
  ConfigurableDatabaseModule,
  CONNECTION_POOL,
  DATABASE_OPTIONS
} from './database.module-definition'
import DatabaseOptions from './databaseOptions'
import { Pool } from 'pg'
import DbsMicroserviceService from './dbs-microservice.service'
import { ConfigModule, ConfigService } from '@nestjs/config'

@Module({
  imports: [
    DbsMicroserviceModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        user: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB')
      })
    })
  ],
  controllers: [DbsMicroserviceController],
  providers: [
    DbsMicroserviceService,
    {
      provide: CONNECTION_POOL,
      inject: [DATABASE_OPTIONS],
      useFactory: (databaseOptions: DatabaseOptions) => {
        return new Pool({
          host: databaseOptions.host,
          port: databaseOptions.port,
          user: databaseOptions.user,
          password: databaseOptions.password,
          database: databaseOptions.database
        })
      }
    }
  ]
})
export class DbsMicroserviceModule extends ConfigurableDatabaseModule {}
