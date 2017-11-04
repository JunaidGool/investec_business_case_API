import { Entity, Column, PrimaryColumn, OneToMany} from 'typeorm';
import { Loan } from './Loan';
import { Relationship } from './Relationship';

@Entity('entity')
export class _Entity {

    @PrimaryColumn({ unique: true })
    entityID: number;

    @Column()
    entityName: string;

    @OneToMany(type => Loan, entityLimit => entityLimit.entity)
    entityLoans: Loan[];

    @OneToMany(type => Relationship, parentRelationship => parentRelationship.parentEntity)
    parentRelationships: Relationship[];

    @OneToMany(type => Relationship, childRelationship => childRelationship.childEntity)
    childRelationships: Relationship[];



}