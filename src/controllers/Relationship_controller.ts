import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Relationship } from '../entities/Relationship'

export let relationship = async (req: Request, res: Response) => {

    const repoRelationship = getRepository(Relationship)
    
        const relationship = await repoRelationship.createQueryBuilder("relationship")
                                                          .leftJoinAndSelect("relationship.parentEntity", "entity")
                                                        //   .leftJoinAndSelect("relationship.childEntity", "entity")   
                                                          .getMany();
    
    
        res.send(relationship)

    // let relationship = await getRepository(Relationship);

    // const relationships = await relationship
    //                             .createQueryBuilder("relationship")
    //                             .innerJoinAndSelect("parentEntity.parentRelationships", "entity")
    //                             .innerJoinAndSelect("childEntity.childRelationships", "entity")
    //                             .getMany();

    // res.send(relationships)
}