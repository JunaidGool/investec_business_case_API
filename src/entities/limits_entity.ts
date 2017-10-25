import {Entity, Column, PrimaryColumn} from 'typeorm';

@Entity('limits')
export class LimitsEntity {


    @PrimaryColumn()
    Entity_Id: number;
    
    @Column({
        length: 100
    })
    Risk_Taker_Group_Name: string;

    @Column({
        length: 100
    })
    Risk_Taker_Name: string;

    @Column()
    Facility_Id: number;

    @Column({
        length: 100
    })
    Facility_Type: string;

    @Column()
    Limit_Id: number;

    @Column({
        length: 100
    })
    Limit_Type: string;

    @Column({
        length: 100
    })
    Product: string;

    @Column({
        length: 100
    })
    Risk_Type: string;

    @Column({
        length: 100
    })
    Currency: string;

    @Column()
    Exposure_Amount: number;

    @Column()Total_Current_Limit
    : number;

    @Column()
    Total_Approved_Limit: number;

}