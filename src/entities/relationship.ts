import {Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn} from 'typeorm';
import {Parent} from './Parent';
import {Child} from './Child';
import {InvestecEntity} from './Entity';

@Entity('relationship')
export class Relationship {

    @PrimaryGeneratedColumn()
    Generated_ID: number;

    @Column()
    Relationship_Type: string;

}