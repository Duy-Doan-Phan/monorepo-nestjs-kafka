import { Test, TestingModule } from '@nestjs/testing'
import { HttpStatus } from '@nestjs/common'
import request from 'supertest'
import { ApiGatewayModule } from '../api-gateway.module'
import { App } from 'supertest/types'
import { spawn } from 'child_process'

describe('UsersController (e2e)', () => {
  let app: { init: () => any; getHttpServer: () => App; close: () => any }
  // let userMicroservice: any
  // let dbsMicroservice: any

  // beforeAll(async () => {
  //   // Start microservices
  //   // userMicroservice = spawn('npm', ['run', 'dev users-microservice'], {
  //   //   shell: true
  //   // })
  //   // dbsMicroservice = spawn('npm', ['run', 'dev dbs-microservice'], {
  //   //   shell: true
  //   // })
  // }, 60000)

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiGatewayModule]
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  }, 60000)

  // it('should start the application without errors', async () => {
  //   expect(app).toBeDefined()
  // }, 60000)

  it('/users (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/users')
    expect(response.status).toBe(HttpStatus.OK)
    expect(response.ok).toBe(true)
  })

  it('/users (POST)', async () => {
    const userData = {
      name: 'Test User',
      email: 'duytest@gmail.com',
      password: '123456'
    }

    const response = await request(app.getHttpServer())
      .post('/users')
      .send(userData)

    expect(response.status).toBe(HttpStatus.CREATED)
  }, 60000)

  it('/users/:id (GET)', async () => {
    const response = await request(app.getHttpServer()).get('/users/1')
    expect(response.status).toBe(HttpStatus.OK)
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('email')
    // Add more expectations based on your application's response
  })

  it('/users/email/:email (GET)', async () => {
    const response = await request(app.getHttpServer()).get(
      '/users/email/duytest@gmail.com'
    )
    expect(response.status).toBe(HttpStatus.OK)
    expect(response.body).toHaveProperty('name')
    expect(response.body).toHaveProperty('email')
    // Add more expectations based on your application's response
  })

  it('/users/:id (PUT)', async () => {
    const response = await request(app.getHttpServer())
      .put('/users/2')
      .send({ name: 'Updated Name', password: '123456' })

    expect(response.status).toBe(HttpStatus.OK)
    expect(response.body).toHaveProperty('name', 'Updated Name')
    // Add more expectations based on your application's response
  })

  it('/users/:id (DELETE)', async () => {
    const response = await request(app.getHttpServer()).delete('/users/2')
    expect(response.status).toBe(HttpStatus.OK)
    // Add more expectations based on your application's response
  })

  it('/auth/login (POST)', async () => {
    const credentials = {
      email: 'duy@gmail.com',
      password: '123456'
    }

    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send(credentials)
      .expect(HttpStatus.OK)

    // Ensure response contains token or any other expected data
    expect(response.body).toHaveProperty('token')
  })

  afterEach(async () => {
    await app.close()
  })

  afterAll(async () => {
    // Stop microservices
    // userMicroservice.kill()
    // dbsMicroservice.kill()
  })
})
