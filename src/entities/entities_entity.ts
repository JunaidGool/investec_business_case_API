import {Entity, Column, PrimaryColumn} from 'typeorm';

@Entity('entities')
export class EntitiesEntity {

    @PrimaryColumn()
    Entity_Id: number;

    @Column()
    Entity_Name: string;
}