"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
exports.dbOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'junaid',
    password: '1234',
    database: 'investec',
    entities: [
        './entities/*.js'
    ],
    synchronize: true,
};
//# sourceMappingURL=api_config.js.map