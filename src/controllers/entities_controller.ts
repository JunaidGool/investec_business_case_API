import {Request, Response} from 'express';
import {InvestecEntity} from '../entities/Entity';
import {Parent} from '../entities/Parent';
import {relationshipsData} from '../../entity_relationships_data';
import {RelationshipRetrieval} from '../services/relationshipRetrival_service';
import {getRepository} from 'typeorm';

export let parentEntityRelation = async (req: Request, res: Response) => {

    let relationshipRetrieval = RelationshipRetrieval();

    let relationship: any;

    for(relationship of relationshipsData){

        let parentEntity = await relationshipRetrieval.getOrCreateParent(relationship);
        let parentRelation = await relationshipRetrieval.getOrCreateParentEntity(relationship, parentEntity);
        let childEntity = await relationshipRetrieval.getOrCreateChild(relationship, parentEntity);
        let childRelation = await relationshipRetrieval.getOrCreateChildEntity(relationship, childEntity)

    }

    let entity = getRepository(InvestecEntity)
    
        let parentRelationship = await entity.find({})
    
        res.send(parentRelationship)

}