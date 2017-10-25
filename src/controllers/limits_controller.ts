import {Request, Response} from 'express';
import {LimitsRepo} from '../repositories/limits_repository';
import {LimitsEntity} from '../entities/limits_entity';
import {getRepository} from 'typeorm';
import {Converter} from 'csvtojson';

export let importJsonLimits = async (req: Request, res: Response) => {

    let limitsRepo: LimitsRepo = new LimitsRepo();

    let jsonLimits: LimitsEntity = new LimitsEntity();

    let manager = getRepository(LimitsEntity);
    
    manager.query("DELETE FROM limits");
    
    let converter = new Converter({});
    
    converter.fromFile('../entities.csv', (err: any,result: any) => {

        if(err){
            console.log('An Error has occured:  ' + err);
        }

        let json = result;

        for(var i=0; i<json.length; i++){

            jsonLimits = json[i]
        
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

             limitsRepo.saveJsonLimits(jsonLimits).then((result: any) => {
                console.log("Result : " + result);
            });
        };

        limitsRepo.getAll_limits().then((result: any) => {
            res.json(result)
        });
    });
};