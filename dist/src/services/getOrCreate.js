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
const relationship_1 = require("../entities/relationship");
const typeorm_1 = require("typeorm");
exports.GetOrCreate = () => {
    const entity = (relationship) => __awaiter(this, void 0, void 0, function* () {
        let entityRepo = typeorm_1.getRepository(Entity_1._Entity);
        let childEntity = yield entityRepo.findOne({ entityID: relationship["Entity Id"] });
        let parentEntity = yield entityRepo.findOne({ entityID: relationship["Parent Entity Id"] });
        if (!childEntity) {
            childEntity = new Entity_1._Entity();
            childEntity.entityID = Number(relationship["Entity Id"]);
            childEntity.entityName = relationship["Entity Name"];
            yield entityRepo.save(childEntity).then((childEntity) => {
                return childEntity;
            });
        }
        if (!parentEntity) {
            parentEntity = new Entity_1._Entity();
            parentEntity.entityID = Number(relationship["Parent Entity Id"]);
            parentEntity.entityName = relationship["Parent Entity Name"];
            yield entityRepo.save(parentEntity).then((parentEntity) => {
                return parentEntity;
            });
        }
        return {
            childEntity,
            parentEntity
        };
    });
    const relationship = (relation, child, parent) => __awaiter(this, void 0, void 0, function* () {
        let relationshipRepo = typeorm_1.getRepository(relationship_1.Relationship);
        let childRepo = typeorm_1.getRepository(Entity_1._Entity);
        let parentRepo = typeorm_1.getRepository(Entity_1._Entity);
        let relationship = yield relationshipRepo
            .findOne({ relationshipType: relation["Relationship Type"] });
        let childID = yield relationshipRepo
            .findOne({ childID: relation["Entity Id"] });
        let childName = yield relationshipRepo
            .findOne({ childName: relation["Entity Name"] });
        relationship = new relationship_1.Relationship();
        relationship.relationshipType = relation["Relationship Type"];
        relationship.childID = Number(relation["Entity Id"]);
        relationship.childName = relation["Entity Name"];
        relationship.childEntity = child;
        relationship.parentEntity = parent;
        yield relationshipRepo.save(relationship).then((relationship) => {
            return relationship;
        });
    });
    const loan = (limit, facility, limits) => __awaiter(this, void 0, void 0, function* () {
        let loanRepo = typeorm_1.getRepository(Loan_1.Loan);
        let entityRepo = typeorm_1.getRepository(Entity_1._Entity);
        let facilityRepo = typeorm_1.getRepository(Facility_1.Facility);
        let limitRepo = typeorm_1.getRepository(Limit_1.Limits);
        let loan = yield loanRepo.findOne({ limitID: limit["Limit Id"] });
        let entity = yield entityRepo.findOne({ entityID: limit["Entity Id"] });
        if (!loan) {
            if (entity) {
                loan = new Loan_1.Loan();
                loan.limitID = Number(limit["Limit Id"]);
                loan.riskTakerGroupName = limit["Risk Taker Group Name"];
                loan.riskTakerName = limit["Risk Taker Name"];
                loan.product = limit["Product"];
                loan.riskType = limit["Risk Type"];
                loan.currency = limit["Currency"];
                loan.entityID = limit["Entity Id"];
                loan.exposureAmount = Number(limit["Exposure Amount"]);
                loan.totalCurrentLimit = Number(limit["Total Current Limit"]);
                loan.totalApprovedLimit = Number(limit["Total Approved Limit"]);
                loan.facility = facility;
                loan.limit = limits;
                yield loanRepo.save(loan).then((loan) => {
                    return loan;
                });
            }
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