import { Knex } from 'knex'
import bcrypt from 'bcrypt'

export async function seed(knex: Knex): Promise<void> {
  const hashedPassword = await bcrypt.hash('123456', 10)
  return knex.raw(
    `
    INSERT INTO users (
      email,
      name,
      password
    ) VALUES (
      'duy@gmail.com',
      'Admin',
      ?
    )
  `,
    [hashedPassword]
  )
}
