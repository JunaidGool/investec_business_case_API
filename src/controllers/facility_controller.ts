import { Request, Response } from 'express';
import { Facility } from '../entities/Facility';
import { getRepository } from 'typeorm';

export let facility = async (req: Request, res: Response) => {

    const repoFacility = getRepository(Facility)

    const facilityLoans = await repoFacility.createQueryBuilder("facility")
                                            .leftJoinAndSelect("facility.facilityLoans", "loan")
                                            .getMany();

    res.send(facilityLoans)
}