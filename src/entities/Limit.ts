import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Loan } from './Loan'

@Entity('limits')
export class Limits {

    @PrimaryColumn({ unique: true })
    limitID: number;

    @Column()
    limitType: string;

    @OneToMany(type => Loan, limitLoan => limitLoan.limit )
    limitLoans: Loan

}