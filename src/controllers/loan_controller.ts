import {Request, Response} from 'express';
import {Loan} from '../entities/Loan';
import {getRepository} from 'typeorm';

export let loan = async (req: Request,res: Response) => {

    res.send("loan Route")
}