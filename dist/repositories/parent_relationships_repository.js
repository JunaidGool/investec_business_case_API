"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parent_relationships_entity_1 = require("../entities/parent_relationships_entity");
const typeorm_1 = require("typeorm");
class ParentRelationshipsRepo {
    saveJsonParentRelationships(jsonParentRelationships) {
        //save jsonParentRelationships
        return typeorm_1.getManager().getRepository(parent_relationships_entity_1.ParentRelationshipsEntity).save(jsonParentRelationships);
    }
    getAllParentRelationships() {
        // find all parent relationships
        return typeorm_1.getManager().getRepository(parent_relationships_entity_1.ParentRelationshipsEntity).find();
    }
}
exports.ParentRelationshipsRepo = ParentRelationshipsRepo;
//# sourceMappingURL=parent_relationships_repository.js.map