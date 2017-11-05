import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import {_Entity } from './Entity';


@Entity('relationship')
export class Relationship {

    @PrimaryGeneratedColumn()
    relationshipID: number;

    @Column()
    relationshipType: string;

    @ManyToOne(type => _Entity, entity => entity.parentRelationships, {
        cascadeInsert: true,
        cascadeUpdate: true,
        cascadeRemove: true
    })
    parentEntity: _Entity;

    @ManyToOne(type => _Entity, entity => entity.childRelationships, {
        cascadeInsert: true,
        cascadeUpdate: true,
        cascadeRemove: true
    })
    childEntity: _Entity;
    
}