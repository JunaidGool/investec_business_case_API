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
const Parent_1 = require("../entities/Parent");
const Child_1 = require("../entities/Child");
const Entity_1 = require("../entities/Entity");
const relationship_1 = require("../entities/relationship");
const typeorm_1 = require("typeorm");
exports.RelationshipRetrieval = () => {
    const getOrCreateParent = (relationship) => __awaiter(this, void 0, void 0, function* () {
        let parentRepo = typeorm_1.getRepository(Parent_1.Parent);
        let parentEntity = yield parentRepo.findOne({ Parent_ID: relationship["Parent Entity Id"] });
        if (!parentEntity) {
            parentEntity = new Parent_1.Parent();
            parentEntity.Parent_ID = Number(relationship["Parent Entity Id"]);
            parentEntity.Parent_Name = relationship["Parent Entity Name"];
            yield parentRepo.save(parentEntity).then((parentEntity) => {
                return parentEntity;
            });
        }
        return parentEntity;
    });
    const getOrCreateChild = (relationship, parent) => __awaiter(this, void 0, void 0, function* () {
        let childRepo = typeorm_1.getRepository(Child_1.Child);
        let childEntity = yield childRepo.findOne({ Child_ID: relationship["Entity Id"] });
        if (!childEntity) {
            childEntity = new Child_1.Child();
            childEntity.Relationship_Type = relationship["Relationship Type"];
            childEntity.Child_ID = Number(relationship["Entity Id"]);
            childEntity.parent = parent;
            yield childRepo.save(childEntity).then((childEntity) => {
                return childEntity;
            });
        }
        return childEntity;
    });
    const getOrCreateParentEntity = (relationship, parent) => __awaiter(this, void 0, void 0, function* () {
        let entityRepo = typeorm_1.getRepository(Entity_1.InvestecEntity);
        let parentEntity = yield entityRepo.findOne({ Entity_ID: relationship["Parent Entity Id"] });
        if (!parentEntity) {
            parentEntity = new Entity_1.InvestecEntity();
            parentEntity.Entity_ID = Number(relationship["Parent Entity Id"]);
            parentEntity.Entity_Name = relationship["Parent Entity Name"];
            // parentEntity.Relationship_Type = relationship["Relationship Type"];
            yield entityRepo.save(parentEntity).then((parentEntity) => {
                return parentEntity;
            });
            return parentEntity;
        }
    });
    const getOrCreateChildEntity = (relationship, child) => __awaiter(this, void 0, void 0, function* () {
        let entityRepo = typeorm_1.getRepository(Entity_1.InvestecEntity);
        let childEntity = yield entityRepo.findOne({ Entity_ID: relationship["Entity Id"] });
        if (!childEntity) {
            childEntity = new Entity_1.InvestecEntity();
            childEntity.Entity_ID = Number(relationship["Entity Id"]);
            childEntity.Entity_Name = relationship["Entity Name"];
            yield entityRepo.save(childEntity).then((childEntity) => {
                return childEntity;
            });
            return childEntity;
        }
    });
    const getOrCreateRelationshipType = (relationship) => __awaiter(this, void 0, void 0, function* () {
        let entityRepo = typeorm_1.getRepository(relationship_1.Relationship);
        let relationshipEntity = yield entityRepo.findOne({ Relationship_Type: relationship["Relationship Type"] });
        if (!relationshipEntity) {
            relationshipEntity = new relationship_1.Relationship;
            relationshipEntity.Relationship_Type = relationship["Relationship Type"];
            yield entityRepo.save(relationshipEntity).then((relationshipEntity) => {
                return relationshipEntity;
            });
            return relationshipEntity;
        }
    });
    return {
        getOrCreateParent,
        getOrCreateChild,
        getOrCreateParentEntity,
        getOrCreateChildEntity,
        getOrCreateRelationshipType
    };
};
//# sourceMappingURL=relationshipRetrival_service.js.map