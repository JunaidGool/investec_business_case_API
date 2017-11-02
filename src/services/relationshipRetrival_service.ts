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
            childEntity.Relationship_Type = relationship["Relationship Type"];
            childEntity.Child_ID = Number(relationship["Entity Id"]);
            childEntity.parent = parent;

            await childRepo.save(childEntity).then((childEntity: Child) => {
                return childEntity
            })
        }
        return childEntity
    }

    const getOrCreateParentEntity = async (relationship: any, parent: Parent) => {

        let entityRepo = getRepository(InvestecEntity);

        let parentEntity: InvestecEntity  = await entityRepo.findOne({Entity_ID: relationship["Parent Entity Id"]})

        if (!parentEntity) {

            parentEntity = new InvestecEntity();
            parentEntity.Entity_ID = Number(relationship["Parent Entity Id"]);
            parentEntity.Entity_Name = relationship["Parent Entity Name"];
            // parentEntity.Relationship_Type = relationship["Relationship Type"];
        
            await entityRepo.save(parentEntity).then((parentEntity: InvestecEntity) => {
                return parentEntity
            })
            return parentEntity
        }
    }

    const getOrCreateChildEntity = async (relationship: any, child: Child) => {

        let entityRepo = getRepository(InvestecEntity);

        let childEntity: InvestecEntity = await entityRepo.findOne({Entity_ID: relationship["Entity Id"]});

        if(!childEntity) {

            childEntity = new InvestecEntity();
            childEntity.Entity_ID = Number(relationship["Entity Id"]);
            childEntity.Entity_Name = relationship["Entity Name"];
    
            await entityRepo.save(childEntity).then((childEntity: InvestecEntity) => {
                return childEntity
            })

            return childEntity
        }
    }

    const getOrCreateRelationshipType = async (relationship: any) => {

        let entityRepo = getRepository(Relationship);

        let relationshipEntity: Relationship = await entityRepo.findOne({Relationship_Type: relationship["Relationship Type"]});

        if(!relationshipEntity){

            relationshipEntity = new Relationship
            relationshipEntity.Relationship_Type = relationship["Relationship Type"];

            await entityRepo.save(relationshipEntity).then((relationshipEntity: Relationship) => {
                return relationshipEntity
            });

            return relationshipEntity      
        }

    }

    return {
        
        getOrCreateParent,
        getOrCreateChild,
        getOrCreateParentEntity,
        getOrCreateChildEntity,
        getOrCreateRelationshipType

    }

}
