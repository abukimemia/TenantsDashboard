export class SignUpInfo {
    firstname: string;
    lastname: string;
    username: string;
    email: string;
    roles: string[];
    password: string;
    SSN: string;
    nationality: string;
    birthDate: any;
    occupation: string;
    contact: string;
    emergencyContact: string;
    postalAddress: string;
    House_No: string;
    ApartmentName: string;
    rentBalance: string;

    constructor(
        firstname: string,
        lastname: string,
        username: string,
        email: string,
        password: string,
        SSN: string,
        nationality: string,
        birthDate: string,
        occupation: string,
        contact: string,
        emergencyContact: string,
        postalAddress: string,
        House_No: string,
        ApartmentName: string,
        rentBalance: string
    ) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.username = username;
        this.email = email;
        this.password = password;
        this.roles = ['user'];
        this.SSN = SSN;
        this.nationality = nationality;
        this.birthDate = birthDate;
        this.occupation = occupation;
        this.contact = contact;
        this.emergencyContact = emergencyContact;
        this.postalAddress = postalAddress;
        this.House_No = House_No;
        this.ApartmentName = ApartmentName;
        this.rentBalance = '10000';
    }
}
