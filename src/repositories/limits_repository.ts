import {LimitsEntity} from '../entities/limits_entity';
import {getManager} from 'typeorm';


export class LimitsRepo {

    saveJsonLimits(jsonLimits: LimitsEntity){
        //get Limits repository and save JsonLimits data
        return getManager().getRepository(LimitsEntity).save(jsonLimits);
    }

    getAll_limits(){
        // get Limits repository and find all limits
        return getManager().getRepository(LimitsEntity).find();
    }

        // get Limits repository and save new entry of limits
    // saveLimits(limits: LimitsEntity) {
    //     return getManager().getRepository(LimitsEntity).save(limits);
    // }
}