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
const typeorm_1 = require("typeorm");
exports.parentChildRelation = (req, res) => __awaiter(this, void 0, void 0, function* () {
    let parent = typeorm_1.getRepository(Parent_1.Parent);
    let parentRelationship = yield parent
        .createQueryBuilder("parent")
        .innerJoinAndSelect("parent.children", "child")
        .getMany();
    res.send(parentRelationship);
});
//# sourceMappingURL=parent_child_relationship_controller.js.map