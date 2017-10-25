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
const limits_repository_1 = require("../repositories/limits_repository");
const limits_entity_1 = require("../entities/limits_entity");
const typeorm_1 = require("typeorm");
const csvtojson_1 = require("csvtojson");
exports.importJsonLimits = (req, res) => __awaiter(this, void 0, void 0, function* () {
    let limitsRepo = new limits_repository_1.LimitsRepo();
    let jsonLimits = new limits_entity_1.LimitsEntity();
    let manager = typeorm_1.getRepository(limits_entity_1.LimitsEntity);
    manager.query("DELETE FROM limits");
    let converter = new csvtojson_1.Converter({});
    converter.fromFile('../entities.csv', (err, result) => {
        if (err) {
            console.log('An Error has occured:  ' + err);
        }
        let json = result;
        for (var i = 0; i < json.length; i++) {
            jsonLimits = json[i];
            jsonLimits.Entity_Id = json[i]["Entity Id"];
            jsonLimits.Risk_Taker_Group_Name = json[i]["Risk Taker Group Name"];
            jsonLimits.Risk_Taker_Name = json[i]["Risk Taker Name"];
            jsonLimits.Facility_Id = json[i]["Facility Id"];
            jsonLimits.Facility_Type = json[i]["Facility Type"];
            jsonLimits.Limit_Id = json[i]["Limit Id"];
            jsonLimits.Limit_Type = json[i]["Limit Type"];
            jsonLimits.Product = json[i]["Product"];
            jsonLimits.Risk_Type = json[i]["Risk Type"];
            jsonLimits.Currency = json[i]["Currency"];
            jsonLimits.Exposure_Amount = json[i]["Exposure Amount"];
            jsonLimits.Total_Current_Limit = json[i]["Total Current Limit"];
            jsonLimits.Total_Approved_Limit = json[i]["Total Approved Limit"];
            limitsRepo.saveJsonLimits(jsonLimits).then((result) => {
                console.log("Result : " + result);
            });
        }
        ;
        limitsRepo.getAll_limits().then((result) => {
            res.json(result);
        });
    });
});
//# sourceMappingURL=limits_controller.js.map