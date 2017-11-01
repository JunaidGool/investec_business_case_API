import * as express from 'express';
import * as bodyParser from 'body-parser';
import 'reflect-metadata';
import {createConnection} from 'typeorm';
import * as apiConfig from './common/api_config';
import {relationshipsData} from '../entity_relationships_data';

/**
 * Controllers (route handlers)
 */
import * as parentChildController from './controllers/parent_child_relationship_controller';
import * as entitiesController from './controllers/entities_controller';
// import * as childEntityController from './controllers/entity_child_relationship_controller';


/**
 * Create Express Server
 */
const api = express();
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extended: true}));

api.use(function(req, res, next){
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
api.get('/api/parent_child_relationship', parentChildController.parentChildRelation);
api.get('/api/all_entities', entitiesController.parentEntityRelation);
// api.get('/api/entity_child_relationship', childEntityController.childEntityRelation);

/**
 * Create Connection to DB using configuration provided in
 * apiConfig file
 */
createConnection(apiConfig.dbOptions).then(async connection => {
    console.log('Connected to DB');

    
}).catch(error => console.log('TypeORM connection error: ', error));

module.exports = api;