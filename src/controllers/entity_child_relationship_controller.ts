// import {Request, Response} from 'express';
// import {InvestecEntity} from '../entities/Entity';
// import {Child} from '../entities/Child';
// import {relationshipsData} from '../../entity_relationships_data';
// import {RelationshipRetrieval} from '../services/relationshipRetrival_service';
// import {getRepository} from 'typeorm';

// export let childEntityRelation = async (req: Request, res: Response) => {

//     let relationshipRetrieval = RelationshipRetrieval();
    
//     let relationship: any;

//     for(relationship of relationshipsData){

//         let parentEntity = await relationshipRetrieval.getOrCreateParent(relationship);
//         let childEntity = await relationshipRetrieval.getOrCreateChild(relationship, parentEntity);
//         let childRelation = await relationshipRetrieval.getOrCreateChildEntity(relationship, childEntity)

//     }

//     let entity = getRepository(InvestecEntity)

//     let childRelationship = await entity
//         .createQueryBuilder("childEntity")
//         .innerJoinAndSelect("childEntity.child", "child")
//         .getMany();

//         res.send(childRelationship)
// }
