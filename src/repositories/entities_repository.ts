import {EntitiesEntity} from '../entities/entities_entity';
import {getManager, getRepository} from 'typeorm';

export class EntitiesRepo {

    saveJsonEntities(jsonEntities: EntitiesEntity) {
        //save json entities
        return getManager().getRepository(EntitiesEntity).save(jsonEntities);
    }

    getAllChildEntities(){
        // find all child entities 
        return getManager().getRepository(EntitiesEntity).find();
    }
}
