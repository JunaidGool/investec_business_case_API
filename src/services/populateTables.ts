import { _Entity } from '../entities/Entity';
import { Relationship } from '../entities/relationship';
import { relationshipData } from '../../relationship_data';
import { limitData } from '../../limit_data';
import { GetOrCreate } from './getOrCreate';
import { getRepository } from 'typeorm';

export const PopulateTables = async () => {

    let getOrCreate = GetOrCreate();
    let relationshipRepo = getRepository(Relationship);
    let relationship: any;
    let limit: any;

    relationshipRepo.query("DELETE FROM relationship");

    for (relationship of relationshipData) {

        // 1. get or create entity table
        let entityTable = await getOrCreate.entity(relationship);

        let childEntity = entityTable.childEntity;
        let parentEntity = entityTable.parentEntity;

        // 2. get or create relationship table
        let relationshipTable = await getOrCreate.relationship(relationship, childEntity, parentEntity);

        for (limit of limitData) {

            // 3. get or create limit table
            let limitsTable = await getOrCreate.limit(limit);

            // 4. get or create facility table
            let facilityTable = await getOrCreate.facility(limit);

            // 5. get or create loan table
            let loanTable = await getOrCreate.loan(limit, facilityTable, limitsTable);
        }
    }
}

