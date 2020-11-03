import { Role } from './role';
import { User } from './user';

export class UserRole {
    id: string;
    user: User;
    role: Role;

    constructor(
        id?: string,
        user?: User,
        role?: Role
    ) {
        this.id = id;
        this.user = user;
        this.role = role;
    }
}
