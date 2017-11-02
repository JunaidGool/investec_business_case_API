import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import {Parent} from './Parent';
import {Child} from './Child';
import {InvestecEntity} from './Entity';

@Entity('relationship')
export class Relationship {

    @PrimaryGeneratedColumn()
    Generated_ID: number;

    @OneToOne(type => Parent, parent => parent.parentEntity)
    @JoinColumn()
    parent: Parent

    @Column()
    Relationship_Type: string;

    @OneToOne(type => Child, child => child.childEntity)
    @JoinColumn()
    child: Child

}