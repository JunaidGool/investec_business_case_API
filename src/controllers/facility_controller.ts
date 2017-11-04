import {Request, Response} from 'express';
import {Facility} from '../entities/Facility';
import {getRepository} from 'typeorm';

export let facility = async (req: Request, res: Response) => {

    res.send("facility Route")
}