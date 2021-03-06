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

    @Column({type: "float"})
    exposureAmount: number;

    @Column({type: "decimal"})
    totalCurrentLimit: number;

    @Column({type: "decimal"})
    totalApprovedLimit: number;

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