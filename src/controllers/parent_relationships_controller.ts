import {Request, Response} from 'express';
import {ParentRelationshipsRepo} from '../repositories/parent_relationships_repository';
import {ParentRelationshipsEntity} from '../entities/parent_relationships_entity';
import {getRepository} from 'typeorm';
import {Converter} from 'csvtojson';

export let  importParentRelationships = async(req: Request, res: Response) => {

    let parentRelationshipsRepo: ParentRelationshipsRepo = new ParentRelationshipsRepo();

    let jsonParentRelationships: ParentRelationshipsEntity = new ParentRelationshipsEntity();

    let converter = new Converter ({});

    converter.fromFile('../entity_relationships.csv', (err: any, result: any) => {

        let manager = getRepository(ParentRelationshipsEntity);

        manager.query("DELETE FROM parentrelationships");

        if(err){
            console.log('An Error has occured:   ' + err);
        }

        let json = result;

        for(let i=0; i<json.length; i++){

            jsonParentRelationships = json[i];

            let uniqueParentEntityId = json[i]["Parent Entity Id"];
            let uniqueParentEntityName = json[i]["Parent Entity Name"];
            // let uniqueRelationshipType = json[i]["Relationship Type"];

            jsonParentRelationships.Parent_Entity_Id = uniqueParentEntityId;
            jsonParentRelationships.Parent_Entity_Name = uniqueParentEntityName;
            // jsonParentRelationships.Relationship_Type = uniqueRelationshipType;

            parentRelationshipsRepo.saveJsonParentRelationships(jsonParentRelationships).then((result:any) => {

                console.log("Results:  " + jsonParentRelationships)

            }).catch(() => {
                console.log("duplicate entry");
            });
        };

        parentRelationshipsRepo.getAllParentRelationships().then((result: any) => {

            res.json(result)
        });
    });
};