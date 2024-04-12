import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import dotenv from 'dotenv'
import process from 'process'
import { AppModule } from './app.module'

async function bootstrap() {
  // Load environment variables from .env file based on NODE_ENV
  const envFile =
    process.env.NODE_ENV === 'production' ? '.env.production' : '.env.test'
  dotenv.config({ path: envFile })

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [process.env.KAFKA_BROKER]
        },
        consumer: {
          groupId: 'users-consumer'
        }
      }
    }
  )
  await app.listen()
}

bootstrap()
