import { Entity, Column, PrimaryColumn, OneToMany, JoinColumn } from 'typeorm';
import {Loan} from './Loan';

@Entity('facility')
export class Facility {

    @PrimaryColumn({ unique: true })
    facilityID: number;

    @Column()
    facilityType: string;

    @OneToMany(type => Loan, facilityLoan => facilityLoan.facility)
    facilityLoans: Loan[];

}