import {Request, Response} from 'express';
import {Limits} from '../entities/Limit';
import {getRepository} from 'typeorm';

export let limit = async(req: Request, res: Response) => {

    const repoLimits = getRepository(Limits)
    
        const limitLoans = await repoLimits
                               .createQueryBuilder("limits")
                               .leftJoinAndSelect("limits.limitLoans", "loan")
                               .getMany();

    res.send(limitLoans)

}