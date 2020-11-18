import { relativeTimeThreshold } from 'moment';
import { BranchOffice } from './branchOffice';
import { Subcategory } from './subcategory';

export class User {
    id: string;
    name: string;
    lastname: string;
    email: string;
    password: string;
    branchOffice: BranchOffice;
    picture: string;
    subcategories: Subcategory[];
    active: boolean;

    constructor(
        id?: string,
        name?: string,
        lastname?: string,
        email?: string,
        password?: string,
        branchOffice?: BranchOffice,
        picture?: string,
        subcategories?: Subcategory[],
        active?: boolean
    ) {
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.branchOffice = branchOffice;
        this.picture = picture;
        this.subcategories = subcategories;
        this.active = active;
    }
}
