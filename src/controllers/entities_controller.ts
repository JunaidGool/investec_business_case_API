import {Request, Response} from 'express';
import {EntitiesRepo} from '../repositories/entities_repository';
import {EntitiesEntity} from '../entities/entities_entity';
import {getRepository} from 'typeorm';
import {Converter} from 'csvtojson';

export let importEntities = async(req: Request, res: Response) => {

    let entitiesRepo: EntitiesRepo = new EntitiesRepo();
    
    let jsonChildEntities: EntitiesEntity = new EntitiesEntity();

    let converter = new Converter({});

    converter.fromFile('../entity_relationships.csv', (err: any, result: any) => {

        let manager = getRepository(EntitiesEntity);

        manager.query("DELETE FROM entities");

        if(err){
            console.log('An Error has occured:   ' + err);
        }

        let json = result;

        for(let i=0; i<json.length; i++){
            
            jsonChildEntities = json[i]

            let uniqueChildEntityId = json[i]["Entity Id"];
            let uniqueChildEntityName = json[i]["Entity Name"];

            jsonChildEntities.Entity_Id = uniqueChildEntityId;
            jsonChildEntities.Entity_Name = uniqueChildEntityName;

            entitiesRepo.saveJsonEntities(jsonChildEntities).then((result: any) => {
                
                console.log("Result:  " + jsonChildEntities)
            
            }).catch(() => {
                console.log("duplicate entry")
            });
        };

        entitiesRepo.getAllChildEntities().then((result: any) => {

            res.json(result)

        });
    });
};