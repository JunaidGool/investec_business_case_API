"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Loan_1 = require("./Loan");
let Limits = class Limits {
};
__decorate([
    typeorm_1.PrimaryColumn({ unique: true }),
    __metadata("design:type", Number)
], Limits.prototype, "limitID", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Limits.prototype, "limitType", void 0);
__decorate([
    typeorm_1.OneToMany(type => Loan_1.Loan, limitLoan => limitLoan.limit),
    __metadata("design:type", Loan_1.Loan)
], Limits.prototype, "limitLoans", void 0);
Limits = __decorate([
    typeorm_1.Entity('limits')
], Limits);
exports.Limits = Limits;
//# sourceMappingURL=Limit.js.map