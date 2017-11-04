import { _Entity } from '../entities/Entity';
import { Facility } from '../entities/Facility';
import { Limits } from '../entities/Limit';
import { Loan } from '../entities/Loan';
import { Relationship } from '../entities/Relationship';
import { getRepository } from 'typeorm';

export const GetOrCreate = () => {

    const entity = async (relationship: any) => {

        let entityRepo = getRepository(_Entity);

        let childEntity: _Entity = await entityRepo.findOne({ entityID: relationship["Entity Id"] });
        let parentEntity: _Entity = await entityRepo.findOne({ entityID: relationship["Parent Entity Id"] });

        if (!childEntity) {

            childEntity = new _Entity();
            childEntity.entityID = Number(relationship["Entity Id"]);
            childEntity.entityName = relationship["Entity Name"];

            await entityRepo.save(childEntity).then((childEntity: _Entity) => {

                return childEntity
            })
        }

        if (!parentEntity) {

            parentEntity = new _Entity();
            parentEntity.entityID = Number(relationship["Parent Entity Id"]);
            parentEntity.entityName = relationship["Parent Entity Name"];

            await entityRepo.save(parentEntity).then((parentEntity: _Entity) => {

                return parentEntity
            });

        }
        return {
            childEntity,
            parentEntity
        }
    }

    const relationship = async (relation: any, childEntity: _Entity, parentEntity: _Entity) => {

        let relationshipRepo = getRepository(Relationship);
        let childRepo = getRepository(_Entity);
        let parentRepo = getRepository(_Entity);

        let relationship: Relationship = await relationshipRepo
            .findOne({ relationshipType: relation["Relationship Type"] });

        relationship = new Relationship();
        relationship.relationshipType = relation["Relationship Type"];
        relationship.childEntity = childEntity;
        relationship.parentEntity = parentEntity;

        await relationshipRepo.save(relationship).then((relationship: Relationship) => {

            return relationship
        });
    }

    const loan = async (limit: any) => {

        let loanRepo = getRepository(Loan);
        let entityRepo = getRepository(_Entity);

        let loan: Loan = await loanRepo.findOne({ limitID: limit["Limit Id"] });

        if (!loan) {

            let entity: _Entity = await entityRepo.findOne({ entityID: limit["Entity Id"] });

            if (entity) {

                loan = new Loan();
                loan.limitID = Number(limit["Limit Id"]);
                loan.riskTakerGroupName = limit["Risk Taker Group Name"];
                loan.riskTakerName = limit["Risk Taker Name"];
                loan.product = limit["Product"];
                loan.riskType = limit["Risk Type"];
                loan.currency = limit["Currency"];
                loan.entity = entity;

                await loanRepo.save(loan).then((loan: Loan) => {

                    return loan
                });
            }
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