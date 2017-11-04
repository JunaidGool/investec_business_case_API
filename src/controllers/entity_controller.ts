import {Request, Response} from 'express';
import {_Entity} from '../entities/Entity';
import {getRepository} from 'typeorm';

export let entity = async (req: Request, res: Response) => {

    res.send("entity Route")
}