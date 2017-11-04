import {Request, Response} from 'express';
import {Relationship} from '../entities/Relationship';

export let relationship = async (req: Request, res: Response) => {

    res.send("entityRelationship Route")
}