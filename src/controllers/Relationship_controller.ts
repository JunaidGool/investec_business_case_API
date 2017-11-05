import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Relationship } from '../entities/Relationship';
import {_Entity} from '../entities/Entity'

export let relationship = async (req: Request, res: Response) => {

    const repoRelationship = getRepository(_Entity)
    
      const relationship = await repoRelationship
        .createQueryBuilder("entity")
        .innerJoinAndSelect("entity.parentRelationships", "relationship")
        .getMany();
    
    
      res.send(relationship)

}