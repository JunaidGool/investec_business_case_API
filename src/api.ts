import * as express from 'express';
import * as bodyParser from 'body-parser';
import 'reflect-metadata';
import {createConnection} from 'typeorm';
import * as apiConfig from './common/api_config';

/**
 * Controllers (route handlers)
 */
import * as limitsController from './controllers/limits_controller';
import * as entitiesController from './controllers/entities_controller';
import * as parentRelationshipsController from './controllers/parent_relationships_controller';

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
// api.post("/api/SaveLimits", limitsController.saveLimits);
api.get('/api/importLimits', limitsController.importJsonLimits);
api.get('/api/importEntities', entitiesController.importEntities);
api.get('/api/importParentRelationships', parentRelationshipsController.importParentRelationships);

/**
 * Create Connection to DB using configuration provided in
 * apiConfig file
 */
createConnection(apiConfig.dbOptions).then(async connection => {
    console.log('Connected to DB');
}).catch(error => console.log('TypeORM connection error: ', error));

module.exports = api;