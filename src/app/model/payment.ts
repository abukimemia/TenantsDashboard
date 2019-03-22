export class Payment {
    id: string;
    payment_method: string;
    state: string;
    total: number;
    create_time: any;
    fk_uuid: string;
    fk_tenantId: string;

    constructor(
        id: string,
        payment_method: string,
        state: string,
        total: number,
        create_time: any,
        fk_uuid: string,
        fk_tenantId: string
    ) {
        this.id = id;
        this.payment_method = payment_method;
        this.state = state;
        this.total = total;
        this.create_time = create_time;
        this.fk_uuid = fk_uuid;
        this.fk_tenantId = fk_tenantId;
    }
}
