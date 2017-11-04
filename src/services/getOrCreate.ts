import { _Entity } from '../entities/Entity';
import { Facility } from '../entities/Facility';
import { Limits } from '../entities/Limit';
import { Loan } from '../entities/Loan';
import { Relationship } from '../entities/Relationship';
import { getRepository } from 'typeorm';

export const GetOrCreate = () => {

    const entity = async (data: any) => {

        let entityRepo = getRepository(_Entity);

        let childEntity: _Entity = await entityRepo.findOne({ entityID: data["Entity Id"] });
        let parentEntity: _Entity = await entityRepo.findOne({ entityID: data["Parent Entity Id"] });

        if (!childEntity) {

            childEntity = new _Entity();
            childEntity.entityID = Number(data["Entity Id"]);
            childEntity.entityName = data["Entity Name"];

            await entityRepo.save(childEntity).then((childEntity: _Entity) => {

                return childEntity
            })
        }

        if (!parentEntity) {

            parentEntity = new _Entity();
            parentEntity.entityID = Number(data["Parent Entity Id"]);
            parentEntity.entityName = data["Parent Entity Name"];

            await entityRepo.save(parentEntity).then((parentEntity: _Entity) => {

                return parentEntity
            });

        }
        return {
            childEntity,
            parentEntity
        }
    }

    const relationship = async (data: any, childEntity:_Entity, parentEntity:_Entity) => {

        let relationshipRepo = getRepository(Relationship);
        let childRepo = getRepository(_Entity);
        let parentRepo = getRepository(_Entity);

        let relationship: Relationship = await relationshipRepo
            .findOne({ relationshipType: data["Relationship Type"] });

            relationship = new Relationship();
            relationship.relationshipType = data["Relationship Type"];
            relationship.childEntity = childEntity;
            relationship.parentEntity = parentEntity;

            await relationshipRepo.save(relationship).then((relationship: Relationship) => {

                return relationship
            });
    }

    const loan = async (data: any, childEntity:_Entity) => {

        let loanRepo = getRepository(Loan);

        let loan: Loan = await loanRepo.findOne({ limitID: data["Limit Id"] });

        if (!loan) {

            loan = new Loan();
            loan.limitID = Number(data["Limit Id"]);
            loan.riskTakerGroupName = data["Risk Taker Group Name"];
            loan.riskTakerName = data["Risk Taker Name"];
            loan.product = data["Product"];
            loan.riskType = data["Risk Type"];
            loan.currency = data["Currency"];
            loan.entity = childEntity;

            await loanRepo.save(loan).then((loan: Loan) => {
                return loan
            });
        }
        return loan
    }

    const facility = async (data: any) => {

        let facilityRepo = getRepository(Facility);

        let facility: Facility = await facilityRepo.findOne({ facilityID: data["Facility Id"] });

        if (!facility) {

            facility = new Facility();
            facility.facilityID = Number(data["Facility Id"]);
            facility.facilityType = data["Facility Type"];

            await facilityRepo.save(facility).then((facility: Facility) => {

                return facility
            });
        }
        return facility;
    }

    const limit = async (data: any) => {

        let limitRepo = getRepository(Limits);

        let limit: Limits = await limitRepo.findOne({ limitID: data["Limit Id"] });

        if (!limit) {

            limit = new Limits;
            limit.limitID = Number(data["Limit Id"]);
            limit.limitType = data["Limit Type"];

            await limitRepo.save(limit).then((limit: Limits) => {

                return limit
            });
        }

        return limit;
    }

    return {
        entity,
        relationship,
        loan,
        facility,
        limit
    }
}