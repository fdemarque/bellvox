import { Knex } from 'knex';

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'demarque',
    password: '123',
    database: 'demarque',
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations',
  },
};

export default config;
