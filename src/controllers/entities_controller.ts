import {Request, Response} from 'express';
import {InvestecEntity} from '../entities/Entity';
import {Parent} from '../entities/Parent';
import {relationshipsData} from '../../entity_relationships_data';
import {RelationshipRetrieval} from '../services/relationshipRetrival_service';
import {getRepository} from 'typeorm';

export let parentEntityRelation = async (req: Request, res: Response) => {

    let entity = getRepository(InvestecEntity)
    
    let parentRelationship = await entity.find({})
    
    res.send(parentRelationship)

}