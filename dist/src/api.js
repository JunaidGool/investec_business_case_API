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
const relationship_data_1 = require("../relationship_data");
const limit_data_1 = require("../limit_data");
const getOrCreate_1 = require("./services/getOrCreate");
const Relationship_1 = require("./entities/Relationship");
const typeorm_2 = require("typeorm");
/**
 * Controllers (route handlers)
 */
const entityController = require("./controllers/entity_controller");
const loantController = require("./controllers/loan_controller");
const relationshipController = require("./controllers/Relationship_controller");
const facilityController = require("./controllers/facility_controller");
const limitController = require("./controllers/limit_controller");
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
typeorm_1.createConnection(apiConfig.dbOptions).then((connection) => __awaiter(this, void 0, void 0, function* () {
    console.log('Connected to DB');
    let getOrCreate = getOrCreate_1.GetOrCreate();
    let relationshipRepo = typeorm_2.getRepository(Relationship_1.Relationship);
    let relationship;
    let limit;
    relationshipRepo.query("DELETE FROM relationship");
    for (relationship of relationship_data_1.relationshipData) {
        // 1. get or create entity table
        let entityTable = yield getOrCreate.entity(relationship);
        let childEntity = entityTable.childEntity;
        let parentEntity = entityTable.parentEntity;
        // 2. get or create relationship table
        let relationshipTable = yield getOrCreate.relationship(relationship, childEntity, parentEntity);
        for (limit of limit_data_1.limitData) {
            // 3. get or create limit table
            let loanTable = yield getOrCreate.loan(limit, childEntity);
            // 4. get or create facility table
            let facilityTable = yield getOrCreate.facility(limit);
            // 5. get or create limit table
            let limitsTable = yield getOrCreate.limit(limit);
        }
    }
})).catch(error => console.log('TypeORM connection error: ', error));
module.exports = api;
//# sourceMappingURL=api.js.map