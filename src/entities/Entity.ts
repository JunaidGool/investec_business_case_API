import {Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn} from 'typeorm';
import {Parent} from './Parent';
import {Child} from './Child';


@Entity('investecentity')
export class InvestecEntity {

    @PrimaryGeneratedColumn()
    Generated_ID: number;

    @Column({unique: true})
    Entity_ID: number;

    @Column()
    Entity_Name: string;

    // @Column()
    // Entity_Relationship: string;

    // @OneToOne(type => Parent, parent => parent.parentEntity)
    // @JoinColumn()
    // parent: Parent;

    // @OneToOne(type => Child, child => child.childEntity)
    // @JoinColumn()
    // child: Child

}