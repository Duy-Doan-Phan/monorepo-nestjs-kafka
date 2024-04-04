import { NestFactory } from '@nestjs/core'
import { AuthMicroserviceModule } from './auth-microservice.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthMicroserviceModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092']
        },
        consumer: {
          groupId: 'auth-consumer'
        }
      }
    }
  )
  await app.listen()
}

bootstrap()
