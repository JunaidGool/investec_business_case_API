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
const Limit_1 = require("../entities/Limit");
const typeorm_1 = require("typeorm");
exports.limit = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const repoLimits = typeorm_1.getRepository(Limit_1.Limits);
    const limitLoans = yield repoLimits
        .createQueryBuilder("limits")
        .leftJoinAndSelect("limits.limitLoans", "loan")
        .getMany();
    res.send(limitLoans);
});
//# sourceMappingURL=limit_controller.js.map