export class Support {
    id: number;
    tckPriority: string;
    tckStatus: string;
    description: string;
    fk_uuid: string;
    fk_tenantId: string;

    constructor(
        tckPriority: string,
        tckStatus: string,
        description: string,
        fk_uuid: string,
        fk_tenantId: string
    ) {
        this.tckPriority = tckPriority;
        this.tckStatus = tckStatus;
        this.description = description;
        this.fk_uuid = fk_uuid;
        this.fk_tenantId = fk_tenantId;
    }
}
