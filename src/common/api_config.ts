import 'reflect-metadata';
import {ConnectionOptions} from 'typeorm';

export let dbOptions: ConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'investec',
    entities: [
        './entities/*.js'
    ],
    synchronize: true,
}