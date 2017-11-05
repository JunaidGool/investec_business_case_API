import * as express from 'express';
import * as bodyParser from 'body-parser';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as apiConfig from './common/api_config';
import { _Entity } from './entities/Entity';
import { Facility } from './entities/Facility';
import { Limits } from './entities/Limit';
import { relationshipData } from '../relationship_data';
import { limitData } from '../limit_data';
import { GetOrCreate } from './services/getOrCreate';
import { Relationship } from './entities/Relationship'
import { getRepository } from 'typeorm';

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

    let getOrCreate = GetOrCreate();
    let relationshipRepo = getRepository(Relationship);
    let relationship: any;
    let limit: any;

    relationshipRepo.query("DELETE FROM relationship");

    for (relationship of relationshipData) {

        // 1. get or create entity table
        let entityTable = await getOrCreate.entity(relationship);

        let childEntity = entityTable.childEntity;
        let parentEntity = entityTable.parentEntity;

        // 2. get or create relationship table
        let relationshipTable = await getOrCreate.relationship(relationship, childEntity, parentEntity);

        for (limit of limitData) {

            // 3. get or create limit table
            let limitsTable = await getOrCreate.limit(limit);

            // 4. get or create facility table
            let facilityTable = await getOrCreate.facility(limit);

            // 5. get or create limit table
            let loanTable = await getOrCreate.loan(limit, facilityTable, limitsTable);

        }
    }



}).catch(error => console.log('TypeORM connection error: ', error));

module.exports = api;