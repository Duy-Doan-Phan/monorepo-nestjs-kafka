import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`, // Xác định file .env tương ứng với môi trường
      isGlobal: true
    }),
    AuthModule,
    UsersModule
  ],
  controllers: [],
  providers: []
})
export class ApiGatewayModule {}
