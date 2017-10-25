"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entities_entity_1 = require("../entities/entities_entity");
const typeorm_1 = require("typeorm");
class EntitiesRepo {
    saveJsonEntities(jsonEntities) {
        //save json entities
        return typeorm_1.getManager().getRepository(entities_entity_1.EntitiesEntity).save(jsonEntities);
    }
    getAllChildEntities() {
        // find all child entities 
        return typeorm_1.getManager().getRepository(entities_entity_1.EntitiesEntity).find();
    }
}
exports.EntitiesRepo = EntitiesRepo;
//# sourceMappingURL=entities_repository.js.map