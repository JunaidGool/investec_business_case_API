import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { Parent } from './Parent';
import { Child } from './Child';
import { Relationship } from './relationship'

@Entity('investecentity')
export class InvestecEntity {

    @PrimaryGeneratedColumn()
    Generated_ID: number;

    @Column({ unique: true })
    Entity_ID: number;

    @Column()
    Entity_Name: string;

}