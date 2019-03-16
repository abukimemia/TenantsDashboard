export class Support {
    id: number;
    tckPriority: string;
    tckStatus: string;
    phone: string;
    description: string;
    ApartmentName: string;
    House_No: string;
    fk_uuid: string;

    constructor (
        tckPriority: string,
        tckStatus: string,
        phone: string,
        description: string,
        ApartmentName: string,
        House_No: string,
        fk_uuid: string) {
        this.tckPriority = tckPriority;
        this.tckStatus = tckStatus;
        this.phone = phone;
        this.description = description;
        this.ApartmentName = ApartmentName;
        this.House_No = House_No;
        this.fk_uuid = fk_uuid;

    }
}
