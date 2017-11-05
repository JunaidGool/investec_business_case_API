import { Request, Response } from 'express';
import { _Entity } from '../entities/Entity';
import { Relationship } from '../entities/Relationship'
import { getRepository } from 'typeorm';

export let entity = async (req: Request, res: Response) => {

    const repoRelationship = getRepository(_Entity)

    const relationship = await repoRelationship.createQueryBuilder("entity")
                                                      .innerJoinAndSelect("entity.parentRelationships", "relationship")
                                                    //   .leftJoinAndSelect("relationship.childEntity", "entity")   
                                                      .getMany();


    res.send(relationship)

}