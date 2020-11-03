export class BranchOffice {
    id: string;
    name: string;
    address: string;
    active: boolean;

    constructor(
        id?: string,
        name?: string,
        address?: string,
        active?: boolean
    ) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.active = active;
    }
}
