import {Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne} from 'typeorm';
import {getRepository} from 'typeorm';
import {Child} from './Child';
import {InvestecEntity} from './Entity';

@Entity('parent')
export class Parent {

    @PrimaryGeneratedColumn()
    Generated_ID: number;

    @Column({unique: true})
    Parent_ID: number;

    @Column({unique:true})
    Parent_Name: string;

    @OneToMany(type => Child, children => children.parent)
    children: Child[];

    // @OneToOne(type => InvestecEntity, parentEntity => parentEntity.parent, {
    //     cascadeInsert: true,
    //     cascadeUpdate: true,
    //     cascadeRemove: true
    // })
    // parentEntity: InvestecEntity

}