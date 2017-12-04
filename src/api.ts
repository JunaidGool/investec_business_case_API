import * as express from 'express';
import * as bodyParser from 'body-parser';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as apiConfig from './common/api_config';
import {PopulateTables} from './services/populateTables'

/**
 * Controllers (route handlers)
 */
import * as entityController from './controllers/entity_controller';
import * as loantController from './controllers/loan_controller';
import * as relationshipController from './controllers/Relationship_controller';
import * as facilityController from './controllers/facility_controller';
import * as limitController from './controllers/limit_controller';

/**
 * Create Express Server
 */
const api = express();
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));

api.use(express.static('public'));

api.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

/**
 * Express Configuration
 */
api.set("port", process.env.PORT || 3000);

/**
 * start express server
 */
api.listen(api.get('port'), () => {
    console.log(('  Api is running at http://localhost:%d in %s mode'), api.get('port'), api.get('env'));
    console.log(' Press CTRL-C to stop\n');
});


/**
 * Primary Api Routes
 */
api.get('/api/entity', entityController.entity);
api.get('/api/loan', loantController.loan);
api.get('/api/relationship', relationshipController.relationship);
api.get('/api/facility', facilityController.facility);
api.get('/api/limit', limitController.limit);

/**
 * Create Connection to DB using configuration provided in
 * apiConfig file
 */
createConnection(apiConfig.dbOptions).then(async connection => {
    console.log('Connected to DB');

    let populateTable = PopulateTables();

    console.log("Tables succesfully populated")

}).catch(error => console.log('TypeORM connection error: ', error));

module.exports = api;