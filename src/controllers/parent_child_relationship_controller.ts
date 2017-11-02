import { Request, Response } from 'express';
import { Child } from '../entities/Child';
import { Parent } from '../entities/Parent';
import { InvestecEntity } from '../entities/Entity';
import { relationshipsData } from '../../entity_relationships_data';
import { RelationshipRetrieval } from '../services/relationshipRetrival_service';
import { getRepository } from 'typeorm';

export let parentChildRelation = async (req: Request, res: Response) => {

    let parent = getRepository(Parent)

    let parentRelationship = await parent
    .createQueryBuilder("parent")
    .innerJoinAndSelect("parent.children", "child")
    .getMany();

    res.send(parentRelationship)

}
