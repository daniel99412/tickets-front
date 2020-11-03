import { BranchOffice } from './branchOffice';

export class User {
    id: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
    branchOffice: BranchOffice;
    picture: string;
    active: boolean;

    constructor(
        id?: string,
        name?: string,
        lastname?: string,
        email?: string,
        password?: string,
        branchOffice?: BranchOffice,
        picture?: string,
        active?: boolean
    ) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.branchOffice = branchOffice;
        this.picture = picture;
        this.active = active;
    }
}
