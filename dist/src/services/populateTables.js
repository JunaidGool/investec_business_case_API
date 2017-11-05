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
const Relationship_1 = require("../entities/Relationship");
const relationship_data_1 = require("../../relationship_data");
const limit_data_1 = require("../../limit_data");
const getOrCreate_1 = require("./getOrCreate");
const typeorm_1 = require("typeorm");
exports.PopulateTables = () => __awaiter(this, void 0, void 0, function* () {
    let getOrCreate = getOrCreate_1.GetOrCreate();
    let relationshipRepo = typeorm_1.getRepository(Relationship_1.Relationship);
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
            let limitsTable = yield getOrCreate.limit(limit);
            // 4. get or create facility table
            let facilityTable = yield getOrCreate.facility(limit);
            // 5. get or create loan table
            let loanTable = yield getOrCreate.loan(limit, facilityTable, limitsTable);
        }
    }
});
//# sourceMappingURL=populateTables.js.map