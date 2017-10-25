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
const entities_repository_1 = require("../repositories/entities_repository");
const entities_entity_1 = require("../entities/entities_entity");
const typeorm_1 = require("typeorm");
const csvtojson_1 = require("csvtojson");
exports.importEntities = (req, res) => __awaiter(this, void 0, void 0, function* () {
    let entitiesRepo = new entities_repository_1.EntitiesRepo();
    let jsonChildEntities = new entities_entity_1.EntitiesEntity();
    let converter = new csvtojson_1.Converter({});
    converter.fromFile('../entity_relationships.csv', (err, result) => {
        let manager = typeorm_1.getRepository(entities_entity_1.EntitiesEntity);
        manager.query("DELETE FROM entities");
        if (err) {
            console.log('An Error has occured:   ' + err);
        }
        let json = result;
        for (let i = 0; i < json.length; i++) {
            jsonChildEntities = json[i];
            let uniqueChildEntityId = json[i]["Entity Id"];
            let uniqueChildEntityName = json[i]["Entity Name"];
            jsonChildEntities.Entity_Id = uniqueChildEntityId;
            jsonChildEntities.Entity_Name = uniqueChildEntityName;
            entitiesRepo.saveJsonEntities(jsonChildEntities).then((result) => {
                console.log("Result:  " + jsonChildEntities);
            }).catch(() => {
                console.log("duplicate entry");
            });
        }
        ;
        entitiesRepo.getAllChildEntities().then((result) => {
            res.json(result);
        });
    });
});
//# sourceMappingURL=entities_controller.js.map