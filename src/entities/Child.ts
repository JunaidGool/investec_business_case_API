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
    Child_Name: string;

    @ManyToOne(type => Parent, parent => parent.children, {
        cascadeInsert: true,
        cascadeUpdate: true,
        cascadeRemove: true
    })
    parent: Parent;

    @OneToOne(type => Relationship, entity => entity.child, {
        cascadeInsert: true,
        cascadeUpdate: true,
        cascadeRemove: true
    })
    childEntity: Relationship

}