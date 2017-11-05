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
const Entity_1 = require("./Entity");
let Relationship = class Relationship {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Relationship.prototype, "relationshipID", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Relationship.prototype, "relationshipType", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Relationship.prototype, "childID", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Relationship.prototype, "childName", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Entity_1._Entity, childEntity => childEntity.childRelationships, {
        cascadeInsert: true,
        cascadeUpdate: true,
        cascadeRemove: true
    }),
    __metadata("design:type", Entity_1._Entity)
], Relationship.prototype, "childEntity", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Entity_1._Entity, parentEntity => parentEntity.parentRelationships, {
        cascadeInsert: true,
        cascadeUpdate: true,
        cascadeRemove: true
    }),
    __metadata("design:type", Entity_1._Entity)
], Relationship.prototype, "parentEntity", void 0);
Relationship = __decorate([
    typeorm_1.Entity('relationship')
], Relationship);
exports.Relationship = Relationship;
//# sourceMappingURL=Relationship.js.map