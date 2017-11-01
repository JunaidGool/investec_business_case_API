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
const typeorm_1 = require("typeorm");
exports.RelationshipRetrieval = () => {
    const getOrCreateParent = (relationship) => __awaiter(this, void 0, void 0, function* () {
        let parentRepo = typeorm_1.getRepository(Parent_1.Parent);
        let parentEntity = yield parentRepo.findOne({ Parent_ID: relationship["Parent Entity Id"] });
        if (!parentEntity) {
            parentEntity = new Parent_1.Parent();
            parentEntity.Parent_ID = Number(relationship["Parent Entity Id"]);
            parentEntity.Parent_Name = relationship["Parent Entity Name"];
            yield parentRepo.save(parentEntity);
        }
        return parentEntity;
    });
    const getOrCreateChild = (relationship, parent) => __awaiter(this, void 0, void 0, function* () {
        let childRepo = typeorm_1.getRepository(Child_1.Child);
        let childEntity = yield childRepo.findOne({ Child_ID: relationship["Entity Id"] });
        if (!childEntity) {
            childEntity = new Child_1.Child();
            childEntity.Child_ID = Number(relationship["Entity Id"]);
            childEntity.Child_Name = relationship["Entity Name"];
            childEntity.parent = parent;
            yield childRepo.save(childEntity);
        }
        return childEntity;
    });
    const getOrCreateParentEntity = (relationship, parent) => __awaiter(this, void 0, void 0, function* () {
        let entityRepo = typeorm_1.getRepository(Entity_1.InvestecEntity);
        let parentEntity = yield entityRepo
            .findOne({ Entity_ID: relationship["Parent Entity Id"] });
        if (!parentEntity) {
            parentEntity = new Entity_1.InvestecEntity();
            parentEntity.Entity_ID = Number(relationship["Parent Entity Id"]);
            parentEntity.Entity_Name = relationship["Parent Entity Name"];
            // parentEntity.parent = parent;
            yield entityRepo.save(parentEntity);
        }
        return parentEntity;
    });
    const getOrCreateChildEntity = (relationship, child) => __awaiter(this, void 0, void 0, function* () {
        let entityRepo = typeorm_1.getRepository(Entity_1.InvestecEntity);
        let childEntity = yield entityRepo
            .findOne({ Entity_ID: relationship["Entity Id"] });
        if (!childEntity) {
            childEntity = new Entity_1.InvestecEntity();
            childEntity = new Entity_1.InvestecEntity();
            childEntity.Entity_ID = Number(relationship["Entity Id"]);
            childEntity.Entity_Name = relationship["Entity Name"];
            // childEntity.child = child;
            yield entityRepo.save(childEntity);
        }
        return childEntity;
    });
    return {
        getOrCreateParent,
        getOrCreateChild,
        getOrCreateParentEntity,
        getOrCreateChildEntity
    };
};
//# sourceMappingURL=relationshipRetrival_service.js.map