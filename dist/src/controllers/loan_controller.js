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
const Loan_1 = require("../entities/Loan");
const typeorm_1 = require("typeorm");
exports.loan = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const repoLoan = typeorm_1.getRepository(Loan_1.Loan);
    const loanFacility = yield repoLoan
        .createQueryBuilder("loan")
        .getMany();
    res.send(loanFacility);
});
//# sourceMappingURL=loan_controller.js.map