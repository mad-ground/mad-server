import 'reflect-metadata';
import { DataSource } from 'typeorm';

//typeorm을 사용하여 MySQL 데이터베이스와의 연결 설정
export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'mad',
  password: '1234',
  database: 'madground',
  synchronize: true,
  logging: false,
  entities: ['src/**/**.entity{.ts,.js}'],
  migrations: ['src/migrations/**/*{.ts,.js}'],
  subscribers: ['src/subscriber/**/*{.ts,.js}'],
});
