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
const parent_relationships_repository_1 = require("../repositories/parent_relationships_repository");
const parent_relationships_entity_1 = require("../entities/parent_relationships_entity");
const typeorm_1 = require("typeorm");
const csvtojson_1 = require("csvtojson");
exports.importParentRelationships = (req, res) => __awaiter(this, void 0, void 0, function* () {
    let parentRelationshipsRepo = new parent_relationships_repository_1.ParentRelationshipsRepo();
    let jsonParentRelationships = new parent_relationships_entity_1.ParentRelationshipsEntity();
    let converter = new csvtojson_1.Converter({});
    converter.fromFile('../entity_relationships.csv', (err, result) => {
        let manager = typeorm_1.getRepository(parent_relationships_entity_1.ParentRelationshipsEntity);
        manager.query("DELETE FROM parentrelationships");
        if (err) {
            console.log('An Error has occured:   ' + err);
        }
        let json = result;
        for (let i = 0; i < json.length; i++) {
            jsonParentRelationships = json[i];
            let uniqueParentEntityId = json[i]["Parent Entity Id"];
            let uniqueParentEntityName = json[i]["Parent Entity Name"];
            // let uniqueRelationshipType = json[i]["Relationship Type"];
            jsonParentRelationships.Parent_Entity_Id = uniqueParentEntityId;
            jsonParentRelationships.Parent_Entity_Name = uniqueParentEntityName;
            // jsonParentRelationships.Relationship_Type = uniqueRelationshipType;
            parentRelationshipsRepo.saveJsonParentRelationships(jsonParentRelationships).then((result) => {
                console.log("Results:  " + jsonParentRelationships);
            }).catch(() => {
                console.log("duplicate entry");
            });
        }
        ;
        parentRelationshipsRepo.getAllParentRelationships().then((result) => {
            res.json(result);
        });
    });
});
//# sourceMappingURL=parent_relationships_controller.js.map