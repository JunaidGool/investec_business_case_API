import { Request, Response } from 'express';
import { Loan } from '../entities/Loan';
import { Facility } from '../entities/Facility'

import { getRepository } from 'typeorm';

export let loan = async (req: Request, res: Response) => {

    const repoLoan = getRepository(Loan)

    const loanFacility = await repoLoan
        .createQueryBuilder("loan")
        // .leftJoinAndSelect("loan.facility", "facility")
        .getMany();


    res.send(loanFacility)

}