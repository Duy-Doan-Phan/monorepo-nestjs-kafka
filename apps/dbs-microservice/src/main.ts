import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'
import { TransformQueryPipe } from './tranform/tranformQueryPipe'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['kafka:9092']
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
