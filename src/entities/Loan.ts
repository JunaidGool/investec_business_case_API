import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import {_Entity } from './Entity';
import { Facility } from './Facility';
import { Limits } from './Limit';

@Entity('loan')
export class Loan {

    @PrimaryColumn({ unique: true })
    limitID: number;

    @Column()
    riskTakerGroupName: string;

    @Column()
    riskTakerName: string;

    @Column()
    product: string;

    @Column()
    riskType: string;

    @Column()
    currency: number;

    @ManyToOne(type => _Entity, entity => entity.entityLoans, {
        cascadeInsert: true,
        cascadeUpdate: true,
        cascadeRemove: true
    })
    entity: _Entity;

    @ManyToOne(type => Facility, facility => facility.facilityLoans, {
        cascadeInsert: true,
        cascadeUpdate: true,
        cascadeRemove: true
    })
    facility: Facility;

    @ManyToOne(type => Limits, blimit => blimit.limitLoans, {
        cascadeInsert: true,
        cascadeUpdate: true,
        cascadeRemove: true
    })
    limit: Limits;

}