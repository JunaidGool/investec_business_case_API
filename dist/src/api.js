"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const apiConfig = require("./common/api_config");
const entity_relationships_data_1 = require("../entity_relationships_data");
const relationshipRetrival_service_1 = require("./services/relationshipRetrival_service");
/**
 * Controllers (route handlers)
 */
const parentChildController = require("./controllers/parent_child_relationship_controller");
const entitiesController = require("./controllers/entities_controller");
const relationshipTypesController = require("./controllers/relationship_type_controller");
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
api.get('/api/parent_child_relationship', parentChildController.parentChildRelation);
api.get('/api/all_entities', entitiesController.parentEntityRelation);
api.get('/api/all_relationship_types', relationshipTypesController.relationshipType);
/**
 * Create Connection to DB using configuration provided in
 * apiConfig file
 */
typeorm_1.createConnection(apiConfig.dbOptions).then((connection) => __awaiter(this, void 0, void 0, function* () {
    console.log('Connected to DB');
    let relationshipRetrieval = relationshipRetrival_service_1.RelationshipRetrieval();
    let relationship;
    for (relationship of entity_relationships_data_1.relationshipsData) {
        let parentEntity = yield relationshipRetrieval.getOrCreateParent(relationship);
        let parentRelation = yield relationshipRetrieval.getOrCreateParentEntity(relationship, parentEntity);
        let childEntity = yield relationshipRetrieval.getOrCreateChild(relationship, parentEntity);
        let childRelation = yield relationshipRetrieval.getOrCreateChildEntity(relationship, childEntity);
        let relationType = yield relationshipRetrieval.getOrCreateRelationshipType(relationship);
    }
})).catch(error => console.log('TypeORM connection error: ', error));
module.exports = api;
//# sourceMappingURL=api.js.map