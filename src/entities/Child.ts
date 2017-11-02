import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne} from 'typeorm';
import {Parent} from './Parent';
import {InvestecEntity} from './Entity';
import {Relationship} from './relationship';

@Entity('child')
export class Child {

    @PrimaryGeneratedColumn()
    Generated_ID: number;

    @Column({unique: true})
    Child_ID: number;

    @Column()
    Relationship_Type : string;

    @ManyToOne(type => Parent, parent => parent.children, {
        cascadeInsert: true,
        cascadeUpdate: true,
        cascadeRemove: true
    })
    parent: Parent;

}