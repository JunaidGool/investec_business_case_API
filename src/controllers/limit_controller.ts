import {Request, Response} from 'express';
import {Limits} from '../entities/Limit';
import {getRepository} from 'typeorm';

export let limit = async(req: Request, res: Response) => {

    res.send("limit Route")
}