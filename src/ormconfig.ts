import { ConnectionOptions } from 'typeorm';
import Book from "./entities/book.entity";
const config: ConnectionOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'postgres',
    database: process.env.POSTGRES_DB || 'tutorial',
    entities: [Book],
    synchronize: true,
    logging: false
};
export default config;
