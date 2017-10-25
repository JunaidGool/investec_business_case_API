import {ParentRelationshipsEntity} from '../entities/parent_relationships_entity';
import {getManager, getRepository} from 'typeorm';

export class ParentRelationshipsRepo {

    saveJsonParentRelationships(jsonParentRelationships: ParentRelationshipsEntity) {
        //save jsonParentRelationships
        return getManager().getRepository(ParentRelationshipsEntity).save(jsonParentRelationships);
    }

    getAllParentRelationships(){
        // find all parent relationships
        return getManager().getRepository(ParentRelationshipsEntity).find();
    }
}