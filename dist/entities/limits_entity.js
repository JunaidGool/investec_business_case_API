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
let LimitsEntity = class LimitsEntity {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", Number)
], LimitsEntity.prototype, "Entity_Id", void 0);
__decorate([
    typeorm_1.Column({
        length: 100
    }),
    __metadata("design:type", String)
], LimitsEntity.prototype, "Risk_Taker_Group_Name", void 0);
__decorate([
    typeorm_1.Column({
        length: 100
    }),
    __metadata("design:type", String)
], LimitsEntity.prototype, "Risk_Taker_Name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], LimitsEntity.prototype, "Facility_Id", void 0);
__decorate([
    typeorm_1.Column({
        length: 100
    }),
    __metadata("design:type", String)
], LimitsEntity.prototype, "Facility_Type", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], LimitsEntity.prototype, "Limit_Id", void 0);
__decorate([
    typeorm_1.Column({
        length: 100
    }),
    __metadata("design:type", String)
], LimitsEntity.prototype, "Limit_Type", void 0);
__decorate([
    typeorm_1.Column({
        length: 100
    }),
    __metadata("design:type", String)
], LimitsEntity.prototype, "Product", void 0);
__decorate([
    typeorm_1.Column({
        length: 100
    }),
    __metadata("design:type", String)
], LimitsEntity.prototype, "Risk_Type", void 0);
__decorate([
    typeorm_1.Column({
        length: 100
    }),
    __metadata("design:type", String)
], LimitsEntity.prototype, "Currency", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], LimitsEntity.prototype, "Exposure_Amount", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], LimitsEntity.prototype, "Total_Current_Limit", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], LimitsEntity.prototype, "Total_Approved_Limit", void 0);
LimitsEntity = __decorate([
    typeorm_1.Entity('limits')
], LimitsEntity);
exports.LimitsEntity = LimitsEntity;
//# sourceMappingURL=limits_entity.js.map