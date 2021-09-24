import { ConnectionOptions } from 'typeorm';
import Post from "./post/post.entity";
const config: ConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5435,
    username: 'admin',
    password: 'admin',
    database: 'tutorial',
    entities: [Post],
    synchronize: true,
    logging: false
};
export default config;