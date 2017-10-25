import {Entity, Column, PrimaryColumn} from 'typeorm';

@Entity('parentrelationships')
export class ParentRelationshipsEntity {

    @PrimaryColumn()
    Parent_Entity_Id: number;

    @Column()
    Parent_Entity_Name: string;

    // @Column()
    // Relationship_Type: string;
}