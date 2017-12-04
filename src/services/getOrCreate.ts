import { _Entity } from '../entities/Entity';
import { Facility } from '../entities/Facility';
import { Limits } from '../entities/Limit';
import { Loan } from '../entities/Loan';
import { Relationship } from '../entities/relationship';
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

    const relationship = async (relation: any, child: _Entity, parent: _Entity) => {

        let relationshipRepo = getRepository(Relationship);
        let childRepo = getRepository(_Entity);
        let parentRepo = getRepository(_Entity);

        let relationship: Relationship = await relationshipRepo
            .findOne({ relationshipType: relation["Relationship Type"] });
          
        let childID: Relationship = await relationshipRepo
            .findOne({ childID: relation["Entity Id"]});
        
        let childName: Relationship = await relationshipRepo
            .findOne({ childName: relation["Entity Name"]})

        relationship = new Relationship();
        relationship.relationshipType = relation["Relationship Type"];
        relationship.childID = Number(relation["Entity Id"]);
        relationship.childName = relation["Entity Name"];
        relationship.childEntity = child;
        relationship.parentEntity = parent;

        await relationshipRepo.save(relationship).then((relationship: Relationship) => {

            return relationship
        });
    }

    const loan = async (limit: any, facility: Facility, limits: Limits) => {

        let loanRepo = getRepository(Loan);
        let entityRepo = getRepository(_Entity);
        let facilityRepo = getRepository(Facility);
        let limitRepo = getRepository(Limits);

        let loan: Loan = await loanRepo.findOne({ limitID: limit["Limit Id"] });
        let entity: _Entity = await entityRepo.findOne({ entityID: limit["Entity Id"] })

        if (!loan) {

            if (entity) {

                loan = new Loan();
                loan.limitID = Number(limit["Limit Id"]);
                loan.riskTakerGroupName = limit["Risk Taker Group Name"];
                loan.riskTakerName = limit["Risk Taker Name"];
                loan.product = limit["Product"];
                loan.riskType = limit["Risk Type"];
                loan.currency = limit["Currency"];
                loan.entityID = limit["Entity Id"];
                loan.exposureAmount = Number(limit["Exposure Amount"]);
                loan.totalCurrentLimit = Number(limit["Total Current Limit"]);
                loan.totalApprovedLimit = Number(limit["Total Approved Limit"]);

                loan.facility = facility;
                loan.limit = limits

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