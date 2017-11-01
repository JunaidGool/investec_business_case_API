import {Parent} from '../entities/Parent';
import {Child} from '../entities/Child';
import {InvestecEntity} from '../entities/Entity';
import {getRepository} from 'typeorm';
import {createConnection} from 'typeorm'

export const RelationshipRetrieval = () => {

    const getOrCreateParent = async (relationship: any): Promise<Parent> => {

        let parentRepo = getRepository(Parent);

        let parentEntity: Parent | undefined = await parentRepo.findOne({Parent_ID: relationship["Parent Entity Id"]});

        if (!parentEntity) {
            parentEntity = new Parent();
            parentEntity.Parent_ID = Number(relationship["Parent Entity Id"]);
            parentEntity.Parent_Name = relationship["Parent Entity Name"];

            await parentRepo.save(parentEntity)
        }

        return parentEntity
    }

    const getOrCreateChild = async (relationship: any, parent: Parent): Promise<Child> => {

        let childRepo = getRepository(Child);

        let childEntity: Child | undefined = await childRepo.findOne({Child_ID: relationship["Entity Id"]})

        if (!childEntity) {

            childEntity = new Child();
            childEntity.Child_ID = Number(relationship["Entity Id"]);
            childEntity.Child_Name = relationship["Entity Name"];
            childEntity.parent = parent;

            await childRepo.save(childEntity)
        }

        return childEntity
    }

    const getOrCreateParentEntity = async (relationship: any, parent: Parent): Promise<InvestecEntity> => {

        let entityRepo = getRepository(InvestecEntity);

        let parentEntity: InvestecEntity | undefined = await entityRepo
        .findOne({Entity_ID: relationship["Parent Entity Id"]})

        if (!parentEntity) {

            parentEntity = new InvestecEntity();
            parentEntity.Entity_ID = Number(relationship["Parent Entity Id"]);
            parentEntity.Entity_Name = relationship["Parent Entity Name"];
            // parentEntity.parent = parent;

            await entityRepo.save(parentEntity)
        }

        return parentEntity

    }

    const getOrCreateChildEntity = async (relationship: any, child: Child): Promise<InvestecEntity> => {

        let entityRepo = getRepository(InvestecEntity);

        let childEntity: InvestecEntity | undefined = await entityRepo
        .findOne({Entity_ID: relationship["Entity Id"]});

        if(!childEntity) {

            childEntity = new InvestecEntity();
            childEntity = new InvestecEntity();
            childEntity.Entity_ID = Number(relationship["Entity Id"]);
            childEntity.Entity_Name = relationship["Entity Name"];
            // childEntity.child = child;

            await entityRepo.save(childEntity)
        }

        return childEntity
    }

    return {
        
        getOrCreateParent,
        getOrCreateChild,
        getOrCreateParentEntity,
        getOrCreateChildEntity

    }

}
