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
const Facility_1 = require("../entities/Facility");
const typeorm_1 = require("typeorm");
exports.facility = (req, res) => __awaiter(this, void 0, void 0, function* () {
    const repoFacility = typeorm_1.getRepository(Facility_1.Facility);
    const facilityLoans = yield repoFacility.createQueryBuilder("facility")
        .leftJoinAndSelect("facility.facilityLoans", "loan")
        .getMany();
    res.send(facilityLoans);
});
//# sourceMappingURL=facility_controller.js.map