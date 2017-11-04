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
const Relationship_1 = require("./Relationship");
let _Entity = class _Entity {
};
__decorate([
    typeorm_1.PrimaryColumn({ unique: true }),
    __metadata("design:type", Number)
], _Entity.prototype, "entityID", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], _Entity.prototype, "entityName", void 0);
__decorate([
    typeorm_1.OneToMany(type => Loan_1.Loan, entityLimit => entityLimit.entity),
    __metadata("design:type", Array)
], _Entity.prototype, "entityLoans", void 0);
__decorate([
    typeorm_1.OneToMany(type => Relationship_1.Relationship, parentRelationship => parentRelationship.parentEntity),
    __metadata("design:type", Array)
], _Entity.prototype, "parentRelationships", void 0);
__decorate([
    typeorm_1.OneToMany(type => Relationship_1.Relationship, childRelationship => childRelationship.childEntity),
    __metadata("design:type", Array)
], _Entity.prototype, "childRelationships", void 0);
_Entity = __decorate([
    typeorm_1.Entity('entity')
], _Entity);
exports._Entity = _Entity;
//# sourceMappingURL=Entity.js.map