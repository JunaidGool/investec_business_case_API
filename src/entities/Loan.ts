import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn} from 'typeorm';
import {_Entity } from './Entity';
import { Facility } from './Facility';
import { Limits } from './Limit';

@Entity('loan')
export class Loan {

    @PrimaryColumn({ unique: true })
    limitID: number;

    @Column()
    entityID: number;

    @Column()
    riskTakerGroupName: string;

    @Column()
    riskTakerName: string;

    @Column()
    product: string;

    @Column()
    riskType: string;

    @Column()
    currency: string;

    @Column()
    exposureAmount: number;

    @Column()
    totalCurrentLimit: number;

    @Column()
    totalApprovedLimit: number;

    // @ManyToOne(type => _Entity, entity => entity.entityLoans, {
    //     cascadeInsert: true,
    //     cascadeUpdate: true,
    //     cascadeRemove: true
    // })
    // entity: _Entity;

    @ManyToOne(type => Facility, facility => facility.facilityLoans, {
        cascadeInsert: true,
        cascadeUpdate: true,
        cascadeRemove: true
    })
    facility: Facility;

    @ManyToOne(type => Limits, limit => limit.limitLoans, {
        cascadeInsert: true,
        cascadeUpdate: true,
        cascadeRemove: true
    })
    limit: Limits;

}