import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.raw(`
    CREATE TABLE users (
      id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
      name text NOT NULL,
      email text NOT NULL,
      password text NOT NULL
    )
  `)
}

export async function down(knex: Knex): Promise<void> {
  return knex.raw(`
    DROP TABLE users
  `)
}
