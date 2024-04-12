import type { Knex } from 'knex'
import { ConfigService } from '@nestjs/config'
import { config } from 'dotenv'

// Xác định đường dẫn đến file .env tùy thuộc vào môi trường
let envFilePath = '.env' // Mặc định, sử dụng .env
const nodeEnv = process.env.NODE_ENV
if (nodeEnv === 'production') {
  envFilePath = '.env.production'
} else if (nodeEnv === 'test') {
  envFilePath = '.env.test'
}

// Load các biến môi trường từ file .env
config({ path: envFilePath })

// Khởi tạo service cấu hình
const configService = new ConfigService()

// Cấu hình Knex
const knexConfig: Knex.Config = {
  client: 'postgresql',
  connection: {
    host: 'db',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres'
  },
  seeds: {
    directory: './seeds'
  },
  migrations: {
    directory: './migrations'
  }
}

// Xuất cấu hình Knex
module.exports = knexConfig
