import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'
import { TransformQueryPipe } from './tranform/tranformQueryPipe'
import * as dotenv from 'dotenv'
import * as process from 'process'

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
          groupId: 'dbs-consumer',
          allowAutoTopicCreation: true
        }
      }
    }
  )
  // Đăng ký pipe transform global
  app.useGlobalPipes(new TransformQueryPipe())
  await app.listen()
}

bootstrap()
