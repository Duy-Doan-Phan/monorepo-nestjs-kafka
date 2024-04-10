import { NestFactory } from '@nestjs/core'
import { UsersMicroserviceModule } from './users-microservice.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersMicroserviceModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['kafka:9092']
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
