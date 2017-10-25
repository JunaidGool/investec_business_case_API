"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const limits_entity_1 = require("../entities/limits_entity");
const typeorm_1 = require("typeorm");
class LimitsRepo {
    saveJsonLimits(jsonLimits) {
        //get Limits repository and save JsonLimits data
        return typeorm_1.getManager().getRepository(limits_entity_1.LimitsEntity).save(jsonLimits);
    }
    getAll_limits() {
        // get Limits repository and find all limits
        return typeorm_1.getManager().getRepository(limits_entity_1.LimitsEntity).find();
    }
}
exports.LimitsRepo = LimitsRepo;
//# sourceMappingURL=limits_repository.js.map