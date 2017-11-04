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
const Facility_1 = require("../entities/Facility");
const Limit_1 = require("../entities/Limit");
const Loan_1 = require("../entities/Loan");
const Relationship_1 = require("../entities/Relationship");
const typeorm_1 = require("typeorm");
exports.GetOrCreate = () => {
    const entity = (data) => __awaiter(this, void 0, void 0, function* () {
        let entityRepo = typeorm_1.getRepository(Entity_1._Entity);
        let childEntity = yield entityRepo.findOne({ entityID: data["Entity Id"] });
        let parentEntity = yield entityRepo.findOne({ entityID: data["Parent Entity Id"] });
        if (!childEntity) {
            childEntity = new Entity_1._Entity();
            childEntity.entityID = Number(data["Entity Id"]);
            childEntity.entityName = data["Entity Name"];
            yield entityRepo.save(childEntity).then((childEntity) => {
                return childEntity;
            });
        }
        if (!parentEntity) {
            parentEntity = new Entity_1._Entity();
            parentEntity.entityID = Number(data["Parent Entity Id"]);
            parentEntity.entityName = data["Parent Entity Name"];
            yield entityRepo.save(parentEntity).then((parentEntity) => {
                return parentEntity;
            });
        }
        return {
            childEntity,
            parentEntity
        };
    });
    const relationship = (data, childEntity, parentEntity) => __awaiter(this, void 0, void 0, function* () {
        let relationshipRepo = typeorm_1.getRepository(Relationship_1.Relationship);
        let childRepo = typeorm_1.getRepository(Entity_1._Entity);
        let parentRepo = typeorm_1.getRepository(Entity_1._Entity);
        let relationship = yield relationshipRepo
            .findOne({ relationshipType: data["Relationship Type"] });
        if (!relationship) {
            relationship = new Relationship_1.Relationship();
            relationship.relationshipType = data["Relationship Type"];
            yield relationshipRepo.save(relationship).then((relationship) => {
                return relationship;
            });
        }
        let findChild = yield childRepo.findOne({ entityID: data["Entity Id"] });
        if (findChild) {
            relationship.childEntity = childEntity;
            yield relationshipRepo.save(relationship).then((relationship) => {
                return relationship;
            });
        }
        let findParent = yield parentRepo.findOne({ entityID: data["Parent Entity Id"] });
        if (findParent) {
            relationship.parentEntity = parentEntity;
            yield relationshipRepo.save(relationship).then((relationship) => {
                return relationship;
            });
        }
        return {
            relationship
        };
    });
    const loan = (data) => __awaiter(this, void 0, void 0, function* () {
        let loanRepo = typeorm_1.getRepository(Loan_1.Loan);
        let loan = yield loanRepo.findOne({ limitID: data["Limit Id"] });
        if (!loan) {
            loan = new Loan_1.Loan();
            loan.limitID = Number(data["Limit Id"]);
            loan.riskTakerGroupName = data["Risk Taker Group Name"];
            loan.riskTakerName = data["Risk Taker Name"];
            loan.product = data["Product"];
            loan.riskType = data["Risk Type"];
            loan.currency = data["Currency"];
            yield loanRepo.save(loan).then((loan) => {
                return loan;
            });
        }
        return loan;
    });
    const facility = (data) => __awaiter(this, void 0, void 0, function* () {
        let facilityRepo = typeorm_1.getRepository(Facility_1.Facility);
        let facility = yield facilityRepo.findOne({ facilityID: data["Facility Id"] });
        if (!facility) {
            facility = new Facility_1.Facility();
            facility.facilityID = Number(data["Facility Id"]);
            facility.facilityType = data["Facility Type"];
            yield facilityRepo.save(facility).then((facility) => {
                return facility;
            });
        }
        return facility;
    });
    const limit = (data) => __awaiter(this, void 0, void 0, function* () {
        let limitRepo = typeorm_1.getRepository(Limit_1.Limits);
        let limit = yield limitRepo.findOne({ limitID: data["Limit Id"] });
        if (!limit) {
            limit = new Limit_1.Limits;
            limit.limitID = Number(data["Limit Id"]);
            limit.limitType = data["Limit Type"];
            yield limitRepo.save(limit).then((limit) => {
                return limit;
            });
        }
        return limit;
    });
    return {
        entity,
        relationship,
        loan,
        facility,
        limit
    };
};
//# sourceMappingURL=getOrCreate.js.map