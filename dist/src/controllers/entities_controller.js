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
const Entity_1 = require("../entities/Entity");
const entity_relationships_data_1 = require("../../entity_relationships_data");
const relationshipRetrival_service_1 = require("../services/relationshipRetrival_service");
const typeorm_1 = require("typeorm");
exports.parentEntityRelation = (req, res) => __awaiter(this, void 0, void 0, function* () {
    let relationshipRetrieval = relationshipRetrival_service_1.RelationshipRetrieval();
    let relationship;
    for (relationship of entity_relationships_data_1.relationshipsData) {
        let parentEntity = yield relationshipRetrieval.getOrCreateParent(relationship);
        let parentRelation = yield relationshipRetrieval.getOrCreateParentEntity(relationship, parentEntity);
        let childEntity = yield relationshipRetrieval.getOrCreateChild(relationship, parentEntity);
        let childRelation = yield relationshipRetrieval.getOrCreateChildEntity(relationship, childEntity);
    }
    let entity = typeorm_1.getRepository(Entity_1.InvestecEntity);
    let parentRelationship = yield entity.find({});
    res.send(parentRelationship);
});
//# sourceMappingURL=entities_controller.js.map