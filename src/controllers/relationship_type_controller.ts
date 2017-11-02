import {Request, Response} from 'express';
import {Relationship} from '../entities/relationship';
import {getRepository} from 'typeorm';

export let relationshipType = async (req: Request, res: Response) => {

    let entity = getRepository(Relationship)
    
    let relationshipType = await entity.find({})
    
    res.send(relationshipType)

}
