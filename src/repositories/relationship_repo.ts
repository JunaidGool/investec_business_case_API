// import {Child} from '../entities/Child';
// import {Parent} from '../entities/Parent';
// import {InvestecEntity} from '../entities/Entity';
// import {getManager, getRepository} from 'typeorm';
// import {relationshipsData} from '../../entity_relationships_data';



// export class RelationshipRepo {

//     getOneParentEntity(relationship: any){

//         // find one "Parent Entity Id
//         return getManager().getRepository(Parent).findOne({ Parent_ID: relationship["Parent Entity Id"] })
//     };

//     getOneChildEntity(relationship: any){
//         // find one "Child Entity"
//         return getManager().getRepository(Child).findOne({Child_ID: relationship["Entity Id"]});
//     };

//     createParentEntity(parentEntity: Parent){
//         //create parent entity
//         return getManager().getRepository(Parent).save(parentEntity);
//     };

//     createChildEntity(childEntity: Child){
//         //create child entity
//         return getManager().getRepository(Child).save(childEntity);
//     };

// };