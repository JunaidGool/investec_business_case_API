import {Parent} from '../entities/Parent';
import {Child} from '../entities/Child';
import {InvestecEntity} from '../entities/Entity';
import {Relationship} from '../entities/relationship'
import {getRepository} from 'typeorm';
import {createConnection} from 'typeorm'

export const RelationshipRetrieval = () => {

    const getOrCreateParent = async (relationship: any) => {

        let parentRepo = getRepository(Parent);

        let parentEntity: Parent  = await parentRepo.findOne({Parent_ID: relationship["Parent Entity Id"]});

        if (!parentEntity) {
            parentEntity = new Parent();
            parentEntity.Parent_ID = Number(relationship["Parent Entity Id"]);
            parentEntity.Parent_Name = relationship["Parent Entity Name"];

            await parentRepo.save(parentEntity).then((parentEntity: Parent) => {
                return parentEntity
            })
        }

        return parentEntity
    }

    const getOrCreateChild = async (relationship: any, parent: Parent) => {

        let childRepo = getRepository(Child);

        let childEntity: Child = await childRepo.findOne({Child_ID: relationship["Entity Id"]})

        if (!childEntity) {

            childEntity = new Child();
            childEntity.Child_ID = Number(relationship["Entity Id"]);
            childEntity.Child_Name = relationship["Entity Name"];
            childEntity.parent = parent;

            await childRepo.save(childEntity).then((childEntity: Child) => {
                return childEntity
            })
        }

    }

    const getOrCreateParentEntity = async (relationship: any, parent: Parent) => {

        let entityRepo = getRepository(InvestecEntity);

        let parentEntity: InvestecEntity  = await entityRepo.findOne({Entity_ID: relationship["Parent Entity Id"]})

        if (!parentEntity) {

            parentEntity = new InvestecEntity();
            parentEntity.Entity_ID = Number(relationship["Parent Entity Id"]);
            parentEntity.Entity_Name = relationship["Parent Entity Name"];
            // parentEntity.parent = parent;

            await entityRepo.save(parentEntity).then((parentEntity: InvestecEntity) => {
                return parentEntity
            })
        }
    }

    const getOrCreateChildEntity = async (relationship: any, child: Child) => {

        let entityRepo = getRepository(InvestecEntity);

        let childEntity: InvestecEntity = await entityRepo.findOne({Entity_ID: relationship["Entity Id"]});

        if(!childEntity) {

            childEntity = new InvestecEntity();
            childEntity = new InvestecEntity();
            childEntity.Entity_ID = Number(relationship["Entity Id"]);
            childEntity.Entity_Name = relationship["Entity Name"];
            // childEntity.child = child;

            await entityRepo.save(childEntity).then((childEntity: InvestecEntity) => {
                return childEntity
            })
        }
    }

    const getOrCreateRelationshipEntity = async (relationship: any, child: Child, parent: Parent) => {

        let entityRepo = getRepository(Relationship);

        let relationshipEntity: Relationship = await entityRepo.findOne({})



    }

    return {
        
        getOrCreateParent,
        getOrCreateChild,
        getOrCreateParentEntity,
        getOrCreateChildEntity

    }

}



// entitiesRepo.saveJsonEntities(jsonChildEntities).then((result: any) => {
    
//     console.log("Result:  " + jsonChildEntities)

// }).catch(() => {
//     console.log("duplicate entry")
// });