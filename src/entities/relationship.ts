import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import {_Entity } from './Entity';


@Entity('relationship')
export class Relationship {

    @PrimaryGeneratedColumn()
    relationshipID: number;

    @Column()
    relationshipType: string;

    @Column()
    childID: number;

    @Column()
    childName: string;

    // @Column()
    // childName: string;

    @ManyToOne(type => _Entity, childEntity => childEntity.childRelationships, {
        cascadeInsert: true,
        cascadeUpdate: true,
        cascadeRemove: true
    })
    childEntity: _Entity;

    @ManyToOne(type => _Entity, parentEntity => parentEntity.parentRelationships, {
        cascadeInsert: true,
        cascadeUpdate: true,
        cascadeRemove: true
    })
    parentEntity: _Entity;


    
}