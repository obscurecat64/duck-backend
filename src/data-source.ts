import { DataSource } from 'typeorm';
import { User } from './user/user.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: null,
  database: 'duck',
  entities: [User],
  migrations: ['dist/migrations/**/*.js'],
});
