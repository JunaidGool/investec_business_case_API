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
const relationship_1 = require("../entities/relationship");
const typeorm_1 = require("typeorm");
exports.relationshipType = (req, res) => __awaiter(this, void 0, void 0, function* () {
    let entity = typeorm_1.getRepository(relationship_1.Relationship);
    let relationshipType = yield entity.find({});
    res.send(relationshipType);
});
//# sourceMappingURL=relationship_type_controller.js.map